<?php
/**
 * @package    TwitterCollage
 * @subpackage server
 * @version    v.0.1
 * @author     Andre Torgal <andre@quodis.com>
 * @license    http://www.opensource.org/licenses/bsd-license.php BSD License
 */

/**
 * File manipulation class
 */
class Image
{

	const FILE_ORIGINAL = 'o';
	const FILE_PUBLISH  = 'p';

	/**
	 * @var array
	 */
	private static $_config = null;

	/**
	 * static class, nothing to see here, move along
	 */
	private function __constructor() {}


	/**
	 * @param array $config
	 */
	public static function configure($config)
	{
		self::$_config = $config;
	}


	/**
	 * Create Cache File from url or default as fallback
	 *
	 * @param string $url
	 * @param string $id
	 * @return
	 * 		true if the file is saved, regardless if downloaded or default
	 */
	public static function download($url, $id)
	{
		// fetch the pathinfo for the given url
		$pathinfo = pathinfo($url);
		// define a sufix based on the extension key from the path info
		$sufix = isset($pathinfo['extension']) ? $pathinfo['extension'] : '';
		// define the cache file filename
		$cacheFile = self::fileName('original', md5($url), $sufix);
		// get the file from the url and save it to disk as cache file with the required permissions
		$options = array(
			'timeout' => self::$_config['Twitter']['timeout']['imgFile'],
			'cache' => array(
				'file' => $cacheFile,
				'dirPermissions' => self::$_config['App']['cacheDirPermissions'],
				'filePermissions' => self::$_config['App']['cacheFilePermissions'],
				'group' => self::$_config['App']['cacheGroup']
			)
		);
		$fileData = Curl::get($url, $options);
		// TODO: configure the CURL timeout for a shorter period

		// use a default image if we're unable to fetch/save the url
		if (!$fileData)
		{
			$fileData = file_get_contents(self::$_config['App']['path'] . '/' . self::$_config['Collage']['defaultPic']);
		}

		// return true if we have fileData
		return !!$fileData;
	}


	/**
	 * generate the overlay image
	 *
	 * @param integer $position
	 *
	 * @return string filename for dbg purposes
	 */
	public static function makeTileOverlay($position)
	{
		$rgbColor = self::getTileRgbColor($position);

		$fileName = self::getTileOverlayFilename($position);

		$tileSize = self::$_config['Collage']['tileSize'];

		// generate the overlay with the current rgb color and same size as original image
		$overlay = new Imagick();
		$overlay->newImage($tileSize, $tileSize, new ImagickPixel('#' . $rgbColor));
		$overlay->setImageFormat('gif');

		// create the destination directory if it doesn't exist already
		if (!is_dir(dirname($fileName))) rmkdir(dirname($fileName), self::$_config['App']['cacheDirPermissions'], self::$_config['App']['cacheGroup']);

		// save a "blank" file with the filename we generated above
		if ($overlay->writeImage($fileName))
		{
			chmod($fileName, octdec(self::$_config['App']['cacheFilePermissions']));
			chgrp($fileName, self::$_config['App']['cacheGroup']);
			return $fileName;
		}
	}


	/**
	 * Create the Tile file
	 *
	 * @param string $url
	 * @param string $id
	 *
	 * @return
	 * 		base64 encoded Tile data
	 */
	public static function makeTile($url, $id, $position)
	{
		$start = microtime(TRUE);
		$time = array();

		// fetch the pathinfo from the $url
		$pathinfo = pathinfo($url);
		// fetch the suffix(file extension) from the pathinfo array
		$sufix = isset($pathinfo['extension']) ? $pathinfo['extension'] : '';
		// generate the file path for the destination/cache file
		$cacheFile = self::fileName('original', md5($url), $sufix);

		try
		{
			// new Imagick object from cacheFile
			$image = new Imagick($cacheFile);
		}
		catch (Exception $e)
		{
			// use default twitter avatar when we can't open the cached Tile
			$default = self::$_config['App']['path'] .'/'. self::$_config['Collage']['defaultPic'];
			// new Imagick object from default twitter avatar, usually in the assets folder inside app root
			$image = new Imagick($default);
		}

		// resize the image to the tile size
		$tileSize = self::$_config['Collage']['tileSize'];
		$image->cropThumbnailImage($tileSize, $tileSize);
		/* PROCESS THE ORIGINAL IMAGE */
		$image->setImageFormat('gif');
		// desaturate the image
		$image->modulateImage(100, 0, 100);

		$time['process'] = microtime(TRUE);

		// generate the destination
		$destination = self::fileName('processed', md5($id), 'gif');

		// create the destination directory if it doesn't exist already
		if (!is_dir(dirname($destination))) rmkdir(dirname($destination), self::$_config['App']['cacheDirPermissions'], self::$_config['App']['cacheGroup']);

		$overlayFile = self::getTileOverlayFilename($position);

		$colors = self::$_config['Collage']['colorDepth'];

		if (self::$_config['Collage']['internalComposite'])
		{
			$overlay = new Imagick($overlayFile);
			$image->setImageColorspace($overlay->getImageColorspace() );
			$image->compositeImage($overlay, Imagick::COMPOSITE_HARDLIGHT, 0, 0);
			$image->writeImage($destination);

			$time['composite'] = microtime(TRUE);

			// discover the binary path - currently returning a new line, simple fix
			$binary_path = '/usr/bin/convert';
			// build the cmd arguments
			$cmd_arguments = "$destination -colors $colors -matte";
			// reprocess the first pass image using shell_exec
			shell_exec("$binary_path $cmd_arguments $destination");

			$time['convert'] = microtime(TRUE);
		}
		else
		{
			$image->writeImage($destination);
			// discover the binary path - currently returning a new line, simple fix
			$binary_path = '/usr/bin/composite';
			// build the cmd arguments
			$cmd_arguments = "$overlayFile $destination -colors $colors -compose hardlight";
			// reprocess the first pass image using shell_exec
			shell_exec("$binary_path $cmd_arguments $destination");

			$time['composite'] = microtime(TRUE);
		}


		//Debug::logMsg("$binary_path $cmd_arguments $destination");
		// set permissions on the final image
		chmod($destination, octdec(self::$_config['App']['cacheFilePermissions']));
		chgrp($destination, self::$_config['App']['cacheGroup']);

		// return the base64 encoded destination file
		$contents = base64_encode(file_get_contents($destination));

		//$contents = base64_encode($image->getImageBlob());

		$time['read'] = microtime(TRUE);

		$log = array();
		foreach ($time as $key => $value) $log[] = $key . ': ' . ceil(($value - $start) * 1000) / 1000;
		dd('TIME! id:' . $id . ' len:' . strlen($contents) .  ' > ' . implode(', ', $log));

		return $contents;
	}


	// --- file path/url

	/**
	 * Return file path string
	 *
	 * @param string $prefix
	 * @param string $id
	 * @param string sufix
	 *
	 * @return
	 *		file path string
	 */
	public static function fileName($dir, $id, $sufix)
	{
		// make filename
		$fileName = substr($id, 0, 2) . '/' . substr($id, 2, 2) . '/' . substr($id, 4, 2) . '/' . substr($id, 6) . '.' . $sufix;
		return self::$_config['App']['pathCache'] . '/' . $dir . '/' . $fileName;
	}

	public static function getTileOverlayFilename($position)
	{
		$rgbColor = self::getTileRgbColor($position);
		//
		return self::fileName('tiles', str_pad($position, 4, '0', STR_PAD_LEFT) . $rgbColor, 'gif');
	}

	public static function getTileRgbColor($position)
	{
		// fetch the config for this page that includes ???
		$config = & Collage::getPageConfig();

		// fetch
		$index = $config['index'][$position];
		// fetch the tile
		$tile  = $config['grid'][$index['y']][$index['x']];
		// tile color
		$color = $tile['c'];
		$rgbColor = str_pad(dechex($color[0]), 2, '0', STR_PAD_LEFT);
		$rgbColor.= str_pad(dechex($color[1]), 2, '0', STR_PAD_LEFT);
		$rgbColor.= str_pad(dechex($color[2]), 2, '0', STR_PAD_LEFT);

		return $rgbColor;
	}

}

?>
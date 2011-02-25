<?php
/**
 * @package    TwitterCollage
 * @subpackage server
 * @version    v.0.4
 * @author     Andre Torgal <andre@quodis.com>
 * @license    http://www.opensource.org/licenses/bsd-license.php BSD License
 */


/**
 * escape from global scope
 */
function main()
{
	DEFINE('CLIENT', 'script');
	DEFINE('CONTEXT', __FILE__);
	DEFINE('NO_CONFIG', 'TRUE');
	DEFINE('NO_SESSION', 'TRUE');
	include dirname(__FILE__) . '/../bootstrap.php';

	require LIB_PATH . '/spyc-0.4.5/spyc.php';

	$configDir = realpath(dirname(__FILE__) . '/../config');
	dk($configDir);

	if (file_exists($configDir . '/config.yaml'))
	{
		$data = Spyc::YAMLLoad($configDir . '/config.yaml');

		$contents = "<?php \$config = unserialize('" . serialize($data) . "'); ?>";

		$fileName = $configDir . '/config.php';

		file_put_contents($fileName, $contents);
		chmod($fileName, octdec($data['Store']['filePermissions']));
		chgrp($fileName, $data['Store']['group']);
	}
	else
	{
		Dispatch::now(0, 'configuration file config/config.yaml not found');
	}
	Dispatch::now(1, 'CONFIGURE_OK');
}

try
{
	main();
}
catch(Exception $e) {
	Debug::logError($e, 'EXCEPTION ' . $e->getMessage());
	Dispatch::now(0, 'EXCEPTION ' . $e->getMessage());
}

?>
if(!window.console||!window.console.log){window.console={};window.console.log=function(a){};window.console.dir=function(a){}}function f_scrollLeft(){return f_filterResults(window.pageXOffset?window.pageXOffset:0,document.documentElement?document.documentElement.scrollLeft:0,document.body?document.body.scrollLeft:0)}function f_scrollTop(){return f_filterResults(window.pageYOffset?window.pageYOffset:0,document.documentElement?document.documentElement.scrollTop:0,document.body?document.body.scrollTop:0)}function f_clientWidth(){return f_filterResults(window.innerWidth?window.innerWidth:0,document.documentElement?document.documentElement.clientWidth:0,document.body?document.body.clientWidth:0)}function f_clientHeight(){return f_filterResults(window.innerHeight?window.innerHeight:0,document.documentElement?document.documentElement.clientHeight:0,document.body?document.body.clientHeight:0)}function f_filterResults(d,b,a){var c=d?d:0;if(b&&(!c||(c>b))){c=b}return a&&(!c||(c>a))?a:c}function getTinyUrl(c,d){var a="http://json-tinyurl.appspot.com/?url=";var b=a+encodeURIComponent(c)+"&callback=?";$.getJSON(b,function(e){d&&d(e.tinyurl)})}function objectLength(c){var b=0,a;for(a in c){if(c.hasOwnProperty(a)){b+=1}}return b}Array.prototype.shuffle=function(){for(var c,b,a=this.length;a;c=parseInt(Math.random()*a,10),b=this[--a],this[a]=this[c],this[c]=b){}};function number_format(f,c,h,e){f=(f+"").replace(/[^0-9+\-Ee.]/g,"");var b=!isFinite(+f)?0:+f,a=!isFinite(+c)?0:Math.abs(c),j=(typeof e==="undefined")?",":e,d=(typeof h==="undefined")?".":h,i="",g=function(o,m){var l=Math.pow(10,m);return""+Math.round(o*l)/l};i=(a?g(b,a):""+Math.round(b)).split(".");if(i[0].length>3){i[0]=i[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,j)}if((i[1]||"").length<a){i[1]=i[1]||"";i[1]+=new Array(a-i[1].length+1).join("0")}return i.join(d)}function date(j,h){var g=this,i,e,b=/\\?([a-z])/gi,a,c=function(l,f){if((l=l+"").length<f){return new Array((++f)-l.length).join("0")+l}else{return l}},d=["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur","January","February","March","April","May","June","July","August","September","October","November","December"],k={1:"st",2:"nd",3:"rd",21:"st",22:"nd",23:"rd",31:"st"};a=function(f,l){return e[f]?e[f]():l};e={d:function(){return c(e.j(),2)},D:function(){return e.l().slice(0,3)},j:function(){return i.getDate()},l:function(){return d[e.w()]+"day"},N:function(){return e.w()||7},S:function(){return k[e.j()]||"th"},w:function(){return i.getDay()},z:function(){var l=new Date(e.Y(),e.n()-1,e.j()),f=new Date(e.Y(),0,1);return Math.round((l-f)/86400000)+1},W:function(){var l=new Date(e.Y(),e.n()-1,e.j()-e.N()+3),f=new Date(l.getFullYear(),0,4);return 1+Math.round((l-f)/86400000/7)},F:function(){return d[6+e.n()]},m:function(){return c(e.n(),2)},M:function(){return e.F().slice(0,3)},n:function(){return i.getMonth()+1},t:function(){return(new Date(e.Y(),e.n(),0)).getDate()},L:function(){return new Date(e.Y(),1,29).getMonth()===1|0},o:function(){var m=e.n(),f=e.W(),l=e.Y();return l+(m===12&&f<9?-1:m===1&&f>9)},Y:function(){return i.getFullYear()},y:function(){return(e.Y()+"").slice(-2)},a:function(){return i.getHours()>11?"pm":"am"},A:function(){return e.a().toUpperCase()},B:function(){var l=i.getUTCHours()*3600,f=i.getUTCMinutes()*60,m=i.getUTCSeconds();return c(Math.floor((l+f+m+3600)/86.4)%1000,3)},g:function(){return e.G()%12||12},G:function(){return i.getHours()},h:function(){return c(e.g(),2)},H:function(){return c(e.G(),2)},i:function(){return c(i.getMinutes(),2)},s:function(){return c(i.getSeconds(),2)},u:function(){return c(i.getMilliseconds()*1000,6)},e:function(){throw"Not supported (see source code of date() for timezone on how to add support)"},I:function(){var l=new Date(e.Y(),0),n=Date.UTC(e.Y(),0),f=new Date(e.Y(),6),m=Date.UTC(e.Y(),6);return 0+((l-n)!==(f-m))},O:function(){var f=i.getTimezoneOffset();return(f>0?"-":"+")+c(Math.abs(f/60*100),4)},P:function(){var f=e.O();return(f.substr(0,3)+":"+f.substr(3,2))},T:function(){return"UTC"},Z:function(){return -i.getTimezoneOffset()*60},c:function(){return"Y-m-d\\Th:i:sP".replace(b,a)},r:function(){return"D, d M Y H:i:s O".replace(b,a)},U:function(){return i.getTime()/1000|0}};this.date=function(l,f){g=this;i=((typeof f==="undefined")?new Date():(f instanceof Date)?new Date(f):new Date(f*1000));return l.replace(b,a)};return this.date(j,h)}var party=party||{};(function(){var x,J,d,c=200,h,o=0,A,C=0,u={},w=[],q=[],G=[],z=0,t,s={},K=null,H=["#ACE8F1","#2D4891","#F7DC4B","#C52F14"],g={canvas:null,current:0,increment:0},R={input:null,original_caption:null},T={active_bubble_pos:0,keep_bubble_open:false,last_id:0,last_page:0,mosaic_offset:{},initial_tiles_per_frame_incremental:1,draw_new_tiles_every:0,draw_new_tiles_every_counter:0,total_tiles:0,last_tile_drawn_pos:-1},Q={high:{initial_frames_per_second:8,initial_tiles_per_frame:15,new_tiles_per_second:8,pause_after:10},medium:{initial_frames_per_second:4,initial_tiles_per_frame:30,new_tiles_per_second:6,pause_after:10},low:{initial_frames_per_second:1,initial_tiles_per_frame:200,new_tiles_per_second:1,pause_after:10}};function n(U){return U.replace(/(ftp|http|https|file):\/\/([\S]+(\b|$))/gim,'<a href="$&" class="my_link" target="_blank">$2</a>').replace(/([^\/])(www[\S]+(\b|$))/gim,'$1<a href="http://$2" class="my_link" target="_blank">$2</a>').replace(/(^|\s)@(\w+)/g,'$1<a href="http://twitter.com/$2" class="my_link" target="_blank">@$2</a>').replace(/(^|\s)#(\S+)/g,'$1<a href="http://search.twitter.com/search?q=%23$2" class="my_link" target="_blank">#$2</a>')}function M(X){var U,V,W;if(!X){return null}U=X.p;V=party.mosaic.index[U];if(!V){return null}W=document.createElement("div");W.setAttribute("id",U);W.style.backgroundImage="url("+party.store_url+"/mosaic.jpg)";W.style.backgroundPosition="-"+(V[0]*12)+"px -"+(V[1]*12)+"px";W.style.left=(V[0]*12)+"px";W.style.top=(V[1]*12)+"px";return W}function f(){var U,V;for(U=0;U<z;U+=1){w.push(U)}w.shuffle();V=parseInt(z/party.performance.initial_tiles_per_frame,10);g.increment=parseInt(T.total_tiles/V,10);x=window.setInterval(E,(1000/party.performance.initial_frames_per_second))}function E(){var X=[],V=0,U=0,Z=null,Y=false,W;U=(o+party.performance.initial_tiles_per_frame);for(V=o;V<U;V+=1){W=w[V];Z=M(u[W]);if(Z){X.push(Z);Y=true}}o=V;if(Y){party.canvas.append("",X);if(g.current<T.total_tiles){g.current+=g.increment;S()}}else{window.clearInterval(x);party.canvas.css("background","none");g.current=parseInt(T.total_tiles,10);S();p();r()}}function S(){g.canvas.text(number_format(g.current,0,party.l10n.dec_point,party.l10n.thousands_sep))}function F(){var W=$.makeArray($("#loading li")),U=0,Z,V=5,X=0,aa=$("#loading"),Y;W.shuffle();Z=function(){$(W[U]).hide();U+=1;if(U>=W.length){U=0}$(W[U]).show()};Y=function(){aa.css("background-position",-(X*240)+"px 0px");X+=1;if(X>=V){X=0}};Z();J=window.setInterval(Z,(party.loading_message_seconds*1000));Y();d=window.setInterval(Y,c)}function P(){window.clearInterval(J);window.clearInterval(d);$("#loading").remove()}function O(){var U;party.performance=party.performance_settings.high;if($.browser.msie){party.performance=party.performance_settings.medium}else{if($.browser.mozilla){if(window.navigator.userAgent.search("Firefox/4")!=-1){$("#download").remove()}}}g.canvas=$("#twitter-counter dd span");K=$("#tile-hover");party.canvas=$("#mosaic");U=$("#bubble");party.bubble={container:U,username_a:U.find("h1 a"),avatar_a:U.find("a.twitter-avatar"),avatar_img:U.find("a.twitter-avatar > img"),time:U.find("time"),time_a:U.find("time > a"),p:U.find("p")};T.mosaic_offset=party.canvas.offset();j();m();party.canvas.bind("mouseleave",function(){party.autoBubbleStartTimer=setTimeout(p,1000)});party.canvas.bind("mousemove",function(W){var V,Z,Y,X=party.canvas.offset();clearTimeout(party.mousemoveTimer);clearTimeout(party.autoBubbleStartTimer);if(T.keep_bubble_open){return}V=Math.ceil((W.clientX+f_scrollLeft()-X.left)/12)-1;Z=Math.ceil((W.clientY+f_scrollTop()-X.top)/12)-1;if(V<0||Z<0){return}Y=party.mosaic.grid[V][Z];party.mousemoveTimer=setTimeout(function(){if(Y){if(T.active_bubble_pos!=Y.i){l();T.active_bubble_pos=Y.i;I(Y.i)}}else{p()}},50)});K.bind("click",function(V){T.keep_bubble_open=true;V.stopPropagation();return false});party.canvas.bind("click",a);party.bubble.container.bind("click",function(V){if(!T.keep_bubble_open){T.keep_bubble_open=true}l();V.stopPropagation();return(V.target.nodeName.toLowerCase()=="a")});party.bubble.container.bind("mouseenter",function(){K.trigger("click")});party.bubble.container.bind("mouseleave",function(){party.canvas.trigger("click")});party.init=function(){return party}}function j(){R.input_dom=$("#search-input");R.original_caption=R.input_dom.val();R.input_dom.focus(function(){if($(this).val()===R.original_caption){$(this).val("")}});R.input_dom.blur(function(){if($(this).val()==""){$(this).val(R.original_caption)}});$("#search-box").submit(function(){var U=R.input_dom.val();if(U==""){return false}$("#search-box button").addClass("loading");$.ajax({url:"/tiles-by-username.php",type:"GET",dataType:"json",data:{user_name:U},success:L});return false})}function L(U){var W,V;$("#search-box button").removeClass("loading");if(U.payload.total==0){$("#search-box .error").fadeIn("fast");window.setTimeout(function(){$("#search-box .error").fadeOut("fast")},3*1000);return}W=U.payload.tiles[0];V=W.p;$.extend(u[V],W);l();T.keep_bubble_open=true;I(V);U=null}function N(){var U;U=q[C];if(!U){C=0;return}C+=1;I(U.position)}function p(){if(!A){N();A=setInterval(N,party.auto_bubble_seconds*1000)}}function l(){clearInterval(A);A=null}function I(Z){var ac,aa,Y,ab=party.bubble,X,U,V,W,ad;Y=u[Z];if(!Y||!ab){return}V=party.mosaic.index[Z];if(!V){return}ac=V[0];aa=V[1];W=party.mosaic.grid[ac][aa];if(!W){return}if(aa>24){if(ac>24){X="bottom-right";U={top:"",right:(564-(ac*12))+"px",bottom:(532-(aa*12))+"px",left:""}}else{X="bottom-left";U={top:"",right:"",bottom:(532-(aa*12))+"px",left:((ac*12)+2)+"px"}}}else{if(ac>24){X="top-right";U={top:((aa*12)-16)+"px",right:(564-(ac*12))+"px",bottom:"",left:""}}else{X="top-left";U={top:((aa*12)-16)+"px",right:"",left:((ac*12)+8)+"px",bottom:""}}}ab.container.hide();ad=date(party.l10n.date_format,Y.c);ab.username_a.text(Y.u).attr("href","http://twitter.com/"+Y.u);ab.avatar_a.attr("title",Y.u).attr("href","http://twitter.com/"+Y.u);ab.p.html(n(Y.n));ab.time_a.attr("href","http://twitter.com/"+Y.u+"/status/"+Y.w).text(ad);ab.time.attr("datetime",ad);ab.avatar_img.attr("src","").hide();ab.container.css(U).removeClass().addClass("bubble "+X+" color-"+W.r);party.showBubbleImageTimer=setTimeout(function(){ab.avatar_img.attr("src",Y.m);ab.avatar_img.load(function(){$(this).fadeIn("fast")});party.showBubbleImageTimer=null;Y=null},500);K.css({left:(ac*12)+"px",top:(aa*12)+"px","border-color":H[W.r]});ab.container.show()}function a(){T.active_bubble_pos=0;T.keep_bubble_open=false;party.bubble.container.hide();K.hide();if(party.showBubbleImageTimer){clearTimeout(party.showBubbleImageTimer);party.showBubbleImageTimer=null}}function e(){window.location=window.location}function m(){if(party.state.last_page==0){setTimeout(e,3*60*1000);return}F();var U=party.store_url+"/mosaic.json";$.getJSON(U,function(W){P();if(W.last_id>T.last_id){T.last_id=W.last_id}u=W.tiles;var V;for(V in u){if(u[V].p){q.push({id:parseInt(u[V].i,10),position:parseInt(u[V].p,10)})}}z=q.length;q.sort(function(Y,X){return X.id-Y.id});q=q.slice(0,199);T.total_tiles=parseInt(party.state.last_page*z,10);f();v();W=null})}function r(){t=window.setInterval(B,(1000/party.performance.new_tiles_per_second))}function B(){var aa,Z,U,V,X,W,Y;if(T.draw_new_tiles_every_counter>=T.draw_new_tiles_every){Z=G[0];T.draw_new_tiles_every_counter=0}T.draw_new_tiles_every_counter+=1;if(Z){aa=parseInt(Z.p,10);if(!u[aa]){G.shift();return}X={"background-image":"url(data:image/gif;base64,"+Z.d+")","background-position":"0px 0px"};Z.base64_only=true;$.extend(u[aa],Z);q.shift();q.push({id:parseInt(Z.i,10),position:aa});G.shift();g.current+=1;S()}else{aa=Math.floor(Math.random()*z);U=party.mosaic.index[aa];V=party.mosaic.grid[U[0]][U[1]];X={"background-image":"none","background-color":H[V.r]}}if(T.last_tile_drawn_pos>-1){W=u[T.last_tile_drawn_pos];Y=$("#"+T.last_tile_drawn_pos);if(W.base64_only){Y.css({"background-image":"url(data:image/gif;base64,"+W.d+")","background-position":"0px 0px"})}else{Y.css({"background-image":"url("+party.store_url+"/mosaic.jpg)","background-position":"-"+Y.css("left")+" -"+Y.css("top")})}}T.last_tile_drawn_pos=aa;$("#"+aa).css(X)}function v(){D();h=window.setInterval(D,(party.polling_timer_seconds*1000));if(window.location.href.indexOf("keepgoing")<0){window.setTimeout(b,party.performance.pause_after*60*1000)}}function D(){$.ajax({url:"/poll.php",dataType:"json",data:{last_id:T.last_id},success:function(U){if(U.payload.last_id>T.last_id){T.last_id=U.payload.last_id}G=G.concat(U.payload.tiles.reverse());T.draw_new_tiles_every=Math.round((party.performance.new_tiles_per_second*party.polling_timer_seconds)/G.length);U=null}})}function y(){return T.last_id}function b(){window.clearInterval(t);window.clearInterval(h);l()}function k(){r();v();p()}function i(){var W,Y,U,X;Y=new Date().getMilliseconds();for(var V=0;V<180000;V+=1){W=party.mosaic.index[parseInt(V/100,10)]}stop=new Date().getMilliseconds();X=stop-Y;console.log("test_lookup() executed in "+X+" milliseconds")}$.extend(party,{loading_message_seconds:2,polling_timer_seconds:180,auto_bubble_seconds:7,grid:[],index:[],init:O,getLastId:y,pause:b,resume:k,showBubble:I,performance:s,performance_settings:Q,state:T,new_tiles:G,test_lookup:i})}());(function(){var c=["assets/images/layout/bubbles.png"];for(var b=c.length;b--;){var a=new Image();a.src=c[b]}})();$(document).ready(function(){var c=0,a=0,b;$("#flang").change(function(){window.location="/"+$(this).val()});$("#twitter-counter > dl > dt > a").click(function(){var e=550,g=500,d=(window.screen.width-e)/2,f=(window.screen.height-g)/2;window.open($(this).attr("href"),"tweet","left="+d+",top="+f+",width="+e+",height="+g+",toolbar=0,resizable=1");return false});c=parseInt($("#brand em").width(),10)+20;a=parseInt($("#brand p").width(),10);$("#brand em").before('<span style="left:0; width:'+(a-c)/2+'px" />').fadeIn("slow");$("#brand em").after('<span style="right:0; width:'+(a-c)/2+'px" />').fadeIn("slow");b=$('<img src="'+party.store_url+'/mosaic.jpg">');b.load(party.init)});


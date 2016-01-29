// Non-Jquery Call - SHADOWBOX
Shadowbox.loadSkin('classic', 'src/skin');
Shadowbox.loadLanguage('en', 'src/lang');
Shadowbox.loadPlayer(['flv', 'html', 'iframe', 'img', 'qt', 'swf', 'wmp'], 'src/player');
window.onload = function(){Shadowbox.init();};

// Non-Jquery Call - JSON GUESTBOOK
function jsonp(url,callback,name){    
var q = $("#q").attr("value");
$("#list").empty();

if (url.indexOf("?") > -1)
	url += "&jsonp=" 
else
	url += "?jsonp=" 
url += name + "&";
if (q)
	url += "a=" + encodeURIComponent(q) + "&";   
url += new Date().getTime().toString(); // prevent caching        

var script = document.createElement("script");        
script.setAttribute("src",url);
script.setAttribute("type","text/javascript");        	
document.body.appendChild(script);
}


// 
	
// .

// ..
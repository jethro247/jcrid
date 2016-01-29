YAHOO.namespace('com.thecodecentral');

function makehash(str)
 { hash=0;
   for (j=0;j<str.length;j++)
    hash=hash*j+j+str.charCodeAt(j);
   return hash; };

function cp(actualhash,pw)
{	

	thehash=makehash(pw);
	//alert(thehash);

	if (actualhash==thehash)
	{
		YAHOO.com.thecodecentral.dialog5.hide();
		document.getElementById("homepage_wrap").style.display='block';
	}
	else
	{
	alert('Sorry, that password is incorrect. Please try again.');
	}

}


function init() {
	var handleCancel = function(o){
		this.cancel();
	}
	YAHOO.com.thecodecentral.dialog5 =
	new YAHOO.widget.Dialog("test5",
	{ width : "355px",
	fixedcenter : true,
	visible : false,
	close: false,
	draggable: false,
	modal: true,
	constraintoviewport : false});
	YAHOO.util.Event.addListener('closeImg', 'click', function(o){YAHOO.com.thecodecentral.dialog5.hide()});
	YAHOO.com.thecodecentral.dialog5.render();
	YAHOO.util.Dom.setStyle(['test5'], 'display', 'block');
	YAHOO.com.thecodecentral.dialog5.show();
	};
	YAHOO.util.Event.addListener(window, "load", init);
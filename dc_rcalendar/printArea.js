(function($) {
    var counter = 0;
    var defaults = { title : 'Mr. Site - Booking Tool'};
    var settings = {};
    $.fn.printArea = function( options )
        {
            $.extend( settings, defaults, options );
			
            counter++;
            var idPrefix = "printArea_";
            $( "[id^=" + idPrefix + "]" ).remove();
            var ele = $(this);
			
            settings.id = idPrefix + counter;
			
            var writeDoc;
            var printWindow;
			
			var f = new Iframe();
			writeDoc = f.doc;
			printWindow = f.contentWindow || f;
			
            writeDoc.open();
            writeDoc.write("<html>" + getHead() + getBody(ele) + "</html>" );
            writeDoc.close();
			
            printWindow.focus();
            printWindow.print();
        }
    function getHead()
    {
        var head = "<head><title>" + settings.title + "</title>";
        $(document).find("link")
            .filter(function(){
                    return $(this).attr("rel").toLowerCase() == "stylesheet";
                })
            .filter(function(){ // this filter contributed by "mindinquiring"
                    var media = $(this).attr("media");
                    return (media.toLowerCase() == "" || media.toLowerCase() == "print")
                })
            .each(function(){
                    head += '<link type="text/css" rel="stylesheet" href="' + $(this).attr("href") + '" >';
                });
        head += "</head>";
        return head;
    }
	
    function getBody( printElement )
    {
        var body = "<body>";
        body += '<div class="' + $(printElement).attr("class") + '">' + $(printElement).html() + '</div>';
        body += "</body>";
        return body;
    }
	
    function Iframe()
    {
        var frameId = settings.id;
        var iframeStyle = 'border:0;position:absolute;width:0px;height:0px;left:0px;top:0px;';
        var iframe;
		iframe = document.createElement('iframe');
		document.body.appendChild(iframe);
		$(iframe).attr({ style: iframeStyle, id: frameId, src: "" });
		iframe.doc = null;
		iframe.doc = iframe.contentDocument ? iframe.contentDocument : ( iframe.contentWindow ? iframe.contentWindow.document : iframe.document);
        if ( iframe.doc == null ) throw "Cannot find document.";
        return iframe;
    }
})(jQuery);
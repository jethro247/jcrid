// Guestbook Style 1
function callbackGbookFunction(Result){
$("#list").append('<div id="gbook_jdiv">')
	$.each(Result.dataSet.rows, function(i,item){
			$("#gbook_jdiv").append('<div class="gbook_jpost-slick"><div class="comment"><strong>' + item.name + '</strong>&nbsp;Says:</div><div class="time">' + item.dateadded + ' - ' + item.timeadded + '</div>');
			$("#gbook_jdiv").append('<div id="tcol2" class="gbook_jmessage-slick"><div class="inner">' + item.msg + '</div></div>');  // Posts the message
$("#list").append('</div>');});
}
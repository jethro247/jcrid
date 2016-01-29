// Guestbook Style 2
function callbackFunction(Result){
$("#list").append('<div id="gbook_jdiv">')
		$.each(Result.dataSet.rows, function(i,item){
				$("#gbook_jdiv").append('<div id="tcol2" class="gbook_jpost-std"><div class="comment"><strong>' + item.name + '</strong>&nbsp;Posted:</div><div class="time">' + item.dateadded + ' - ' + item.timeadded + '</div><div class="clear"></div>');
				$("#gbook_jdiv").append('<div id="tcol2" class="gbook_jmessage-std"><div class="inner">' + item.msg + '</div></div>');  // Posts the message
$("#list").append('</div>');});
}
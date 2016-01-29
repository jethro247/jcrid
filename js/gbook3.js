// Guestbook Style 3
function callbackFunction(Result){
$("#list").append('<div id="gbook_jdiv">')
		$.each(Result.dataSet.rows, function(i,item){
				$("#gbook_jdiv").append('<div class="gbook_jmessage-bubble"><div class="inner">' + item.msg + '</div></div>');  // Posts the message
				$("#gbook_jdiv").append('<div class="gbook_jpost-bubble"><div class="comment"><strong>' + item.name + '</strong>&nbsp;Posted:</div><div class="time">' + item.dateadded + ' - ' + item.timeadded + '</div><div class="clear"></div>');
$("#list").append('</div>');});
}
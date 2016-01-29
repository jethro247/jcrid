YAHOO.DC.EventCalendar.ContextMenu = function(contId,params,_a,calendarId)
{
	var body_in = "";
	if (_a.title.length > 0)
	{
		body_in += '<div class="contextPopup ui-state-default ui-corner-all">';
			body_in += '<div class="contextPopupDate ui-widget-header ui-state-default">';
				body_in += '<table cellspacing="0" cellpadding="0" width="100%">';
					body_in += '<tr>';
						body_in += '<td width="28"><span class="ui-icon ui-icon-info"></span></td>';
						body_in += '<td class="contextPopupEventTitle" colspan="2">'+_a.title+'</td>';
					body_in += '</tr>';
				body_in += '</table>';
			body_in += '</div>';
			body_in += '<div class="contextPopupBody ui-state-active">';
				body_in += '<div class="contextPopupRow">';
					body_in += '<ul style="context-ui-menu">';
						if(params.viewDetails)
							body_in += '<li class="context-ui-menu-hasIcon ui-state-active"><a href="#view"><span class="ui-icon ui-icon-circle-zoomin"></span><span class="ui-text">View '+_a.title+' details</span></a></li>';
						if(params.goUrl)
							body_in += '<li class="context-ui-menu-hasIcon ui-state-active"><a href="#goUrl"><span class="ui-icon ui-icon-info"></span><span class="ui-text">More information</span></a></li>';
						if(params.makeBooking && YAHOO.DC.EventCalendar.BookingEnabled)
							body_in += '<li class="context-ui-menu-hasIcon ui-state-active"><a href="#book"><span class="ui-icon ui-icon-circle-check"></span><span class="ui-text">Make a booking</span></a></li>';
					body_in += '</ul>';
				body_in += '</div>';
			body_in += '</div>';
		body_in += '</div>';
	}
	else
	{
		body_in += '<div class="contextPopup ui-state-default ui-corner-all">';
			body_in += '<div class="contextPopupDate ui-widget-header ui-state-default">';
				body_in += '<table cellspacing="0" cellpadding="0" width="100%">';
					body_in += '<tr>';
						body_in += '<td width="28"><span class="ui-icon ui-icon-calendar"></span></td>';
						body_in += '<td class="contextPopupEventTitle" colspan="2">Unavailable to book</td>';
					body_in += '</tr>';
				body_in += '</table>';
			body_in += '</div>';
		body_in += '</div>';
	}
	
	$('#myMenu').html(body_in);
	$('#myMenu').fadeOut('normal');
	$('#'+contId).contextMenu({ menu: 'myMenu', leftButton: true },
        function(action) { 
			if(action.split('#')[1])
				action = action.split('#')[1];
			switch (action) {
				case "delete":
					{
						YAHOO.DC.EventCalendar.confirmAndDelete(_a.myid);
						break;
					}
				case "editEvent":
					{
						YAHOO.DC.EventCalendar.showAddCustomReg(calendarId,_a.myid);
						break;
					}
				case "editSubscribers":
					{
						YAHOO.DC.EventCalendar.showApplicantsList(calendarId,_a.myid);
						break;
					}
				case "editBooking":
					{
						YAHOO.DC.EventCalendar.showAddBookingAdmin(calendarId,_a.myid,YAHOO.DC.EventCalendar.roomType[calendarId]);
						break;
					}
				case "book":
					{
						YAHOO.DC.EventCalendar.showAddBookingClient(calendarId,_a.myid);
						break;
					}
				case "view":
					{
						YAHOO.DC.EventCalendar.viewEventDetails(_a,calendarId);
						break;
					}
				case "goUrl":
					{
						window.open(_a.goUrl);
						break;
					}
			}
	});
}
YAHOO.DC.EventCalendar.ShowContextMenu = function(contId,params,_a,calendarId)
{
	
	var body_in = '<div class="contextPopup ui-state-default ui-corner-all">';
		body_in += '<div class="contextPopupDate ui-widget-header ui-state-default">';
			body_in += '<table cellspacing="0" cellpadding="0" width="100%">';
				body_in += '<tr>';
					body_in += '<td width="28"><span class="ui-icon ui-icon-info"></span></td>';
					body_in += '<td class="contextPopupEventTitle" colspan="2">'+_a.title+'</td>';
				body_in += '</tr>';
			body_in += '</table>';
		body_in += '</div>';
		body_in += '<div class="contextPopupBody ui-state-active">';
			body_in += '<div class="contextPopupRow">';
				body_in += '<ul style="context-ui-menu">';
					if(params.viewDetails)
						body_in += '<li class="context-ui-menu-hasIcon ui-state-active"><a href="#view"><span class="ui-icon ui-icon-circle-zoomin"></span><span class="ui-text">View '+_a.title+' details</span></a></li>';
					if(params.goUrl)
						body_in += '<li class="context-ui-menu-hasIcon ui-state-active"><a href="#goUrl"><span class="ui-icon ui-icon-info"></span><span class="ui-text">More information</span></a></li>';
					if(params.makeBooking)
						body_in += '<li class="context-ui-menu-hasIcon ui-state-active"><a href="#book"><span class="ui-icon ui-icon-circle-check"></span><span class="ui-text">Make a booking</span></a></li>';
				body_in += '</ul>';
			body_in += '</div>';
		body_in += '</div>';
	body_in += '</div>';
	
	$('#myMenu').html(body_in);
	$('#myMenu').fadeOut('normal');
	$('#'+contId).showContextMenu({ menu: 'myMenu', leftButton: true },
        function(action) {
			if(action.split('#')[1])
				action = action.split('#')[1];
			switch (action) {
				case "delete":
					{
						YAHOO.DC.EventCalendar.confirmAndDelete(_a.myid);
						break;
					}
				case "editEvent":
					{
						YAHOO.DC.EventCalendar.showAddCustomReg(calendarId,_a.myid);
						break;
					}
				case "editSubscribers":
					{
						YAHOO.DC.EventCalendar.showApplicantsList(calendarId,_a.myid);
						break;
					}
				case "editBooking":
					{
						YAHOO.DC.EventCalendar.showAddBookingAdmin(calendarId,_a.myid,YAHOO.DC.EventCalendar.roomType[calendarId]);
						break;
					}
				case "book":
					{
						YAHOO.DC.EventCalendar.showAddBookingClient(calendarId,_a.myid);
						break;
					}
				case "view":
					{
						YAHOO.DC.EventCalendar.viewEventDetails(_a,calendarId);
						break;
					}
				case "goUrl":
					{
						window.open(_a.goUrl);
						break;
					}
			}
	});
}

YAHOO.DC.EventCalendar.EventListContextMenu = function(contId,a,calendarId)
{
	var body_in = "";
	
	body_in += '<div class="contextPopup ui-state-default ui-corner-all">';
		body_in += '<div class="contextPopupDate ui-widget-header ui-state-default">';
			body_in += '<table cellspacing="0" cellpadding="0" width="100%">';
				body_in += '<tr>';
					body_in += '<td width="28"><span class="ui-icon ui-icon-info"></span></td>';
					body_in += '<td class="contextPopupEventTitle" colspan="2">Events for this day</td>';
				body_in += '</tr>';
			body_in += '</table>';
		body_in += '</div>';
		body_in += '<div class="contextPopupBody ui-state-active">';
			body_in += '<div class="contextPopupRow">';
				body_in += '<ul style="context-ui-menu">';
					//
					for (var o in a){
						body_in += '<li class="context-ui-menu-hasIcon ui-state-active" id="#eventMenuId'+o+'"><a href="#viewevent-'+o+'"><span class="ui-icon ui-icon-document-b"></span><span class="ui-text">'+a[o].title+'</span></a></li>';
					}
					//
				body_in += '</ul>';
			body_in += '</div>';
		body_in += '</div>';
	body_in += '</div>';
	
	
	if(YAHOO.DC.EventCalendar.admin[calendarId])
		body_in += '<li class="insert" id="addMenuId"><a href="#addevent-">Add New Event</a></li>';
	$('#subMenu').html(body_in);
	$('#subMenu').fadeOut('normal');

	$('#'+contId).contextMenu({ menu: 'subMenu', leftButton: true },function(action, el, pos) {
            if(action.split('#')[1])
		action = action.split('#')[1];
            var params = new Object();
            var o = action.split('-')[1];
            switch(action.split('-')[0]){
                case "viewevent":
                    params.viewDetails=true;
                    params.makeBooking=true;
                    if(YAHOO.DC.EventCalendar.admin[calendarId]){
						params.deleteDetails=true;
						params.editSubscribers=true;
						params.editEvent=true;
					}
                    if(a[o].goUrl!="")
                            params.goUrl = true;
                    action = action.split('#')[1];
                    YAHOO.DC.EventCalendar.ShowContextMenu('eventMenuId'+o,params,a[o],calendarId);
                    break;
                case "addevent":
                    var d = $(el).text();
                    var m = $(el).parent().parent().attr('class').split(' ')[0].substring(1);
                    var y = $(el).parent().parent().parent().attr('class').split(' ')[1].substring(1);
                    var date = m+"/"+d+"/"+y;
                    var niceDate = new Date(Date.parse(date));
                    YAHOO.DC.EventCalendar.calendarArray[calendarId].setInterval(niceDate, niceDate);
                    YAHOO.DC.EventCalendar.showAddCustomReg(calendarId,-1);
                    break;
            }
		});
}
YAHOO.DC.EventCalendar.ReservationsListContextMenu = function(contId,a,calendarId)
{
	var body_in = "";
        var startDate;
        var endDate;
	body_in += '<li class="insert" id="addMenuId">This Day Reservations:</li>';
	 for (var o in a){
            startDate = new Date(Date.parse(a[o].range.split('-')[1])).format('d mmm yyyy');
            endDate = new Date(Date.parse(a[o].range.split('-')[1])).format('d mmm yyyy');

            if(a[o].entryTypeId==1)
		 body_in += '<li class="copy" id="#eventMenuId'+o+'"><a href="#viewbooking-'+o+'" >'+startDate+' - '+endDate+'</a></li>';
            else if(a[o].entryTypeId==4)
                 body_in += '<li class="copy" id="#eventMenuId'+o+'"><a href="#viewevent-'+o+'" >'+startDate+' - '+endDate+'</a></li>';
	 }
	$('#subMenu').html(body_in);
	$('#subMenu').fadeOut('normal');

	$('#'+contId).contextMenu({ menu: 'subMenu', leftButton: true },function(action, el, pos) {
            if(action.split('#')[1])
				action = action.split('#')[1];
            var params = new Object();
            var o = action.split('-')[1];
            switch(action.split('-')[0]){
                case "viewbooking":
                    params.viewDetails=true;
                    params.deleteDetails=true;
                    params.editBooking=true;
                    if(a[o].goUrl!="")
                            params.goUrl = true;
                    YAHOO.DC.EventCalendar.ShowContextMenu('eventMenuId'+o,params,a[o],calendarId);
                    break;
                case "viewevent":
                    params.viewDetails=true;
                    params.deleteDetails=true;
                    params.editEvent=true;
                    if(a[o].goUrl!="")
                            params.goUrl = true;
                    YAHOO.DC.EventCalendar.ShowContextMenu('eventMenuId'+o,params,a[o],calendarId);
                    break;
            }
        });
}

YAHOO.DC.EventCalendar.viewEventDetails = function(_a,calendarId)
{
	//View event details
	var content='';// = _a.comment;
	var startDate = new Date(Date.parse(_a.range.split("-")[0])).format('d mmm yyyy');//new Date.parse();
	var endDate = new Date(Date.parse(_a.range.split("-")[1])).format('d mmm yyyy');//new Date.parse();
	
	if(_a.entryTypeId == 1 && YAHOO.DC.EventCalendar.admin[calendarId]){
		
		return false;
	}
	else if(_a.entryTypeId == 4 || _a.entryTypeId == 6){

		content += '<table class="PreviewDialogPopup" cellspacing="0" cellpadding="0" width:"100%">';
			content += '<tr>';
				content += '<td width="65%">';
					content += '<h1 class="DialogTitle noTopMargin">'+_a.title;
						if (_a.vacancies == 0)
							content += '<span class="noVacancies">(No vacancies)</span>';
					content += '</h1>';
					content += '<h2 class="DialogTitleDates ui-state-active">'+startDate+' <span class="separatorSpan">to</span> '+endDate+'</h2>';
				content += '</td>';
				content += '<td class="DialogPreviewPrice" width="25%">';
					content += '<h1 class="DialogTitle noTopMargin">Price: '+YAHOO.DC.EventCalendar.currency[calendarId]+_a.price+'</h1>';
				content += '</td>';
			content += '</tr>';
			if(YAHOO.DC.EventCalendar.checkIfExtrasExist(_a))
			{
				content += '<tr>';
					content += '<td colspan="2">';
						content += '<div class="PreviewDialogExtras ui-widget-header ui-corner-all ui-state-default">';
							content += '<h3 class="DialogTitleExtras">Available extras:</h3>';
								content += '<table cellspacing="0" cellpadding="0" class="PreviewDialogExtras">';
								for(var i in YAHOO.DC.EventCalendar.extras[calendarId])
									{
										var tempExtras = YAHOO.DC.EventCalendar.extras[calendarId][i];	
										if (_a.extrasInEntry[i].ExtrasInEntry){
											content += '<tr class="CallToolTip" rel="'+tempExtras.ExtrasDescription+'"><td class="list_td"><span>'+tempExtras.ExtrasName+' ('+YAHOO.DC.EventCalendar.currency[calendarId]+tempExtras.ExtrasPrice+' per night)</span></td></tr>';
										}
									}
								content += '</table>';
							content += '</div>';
					content += '</td>';
				content += '</tr>';
			}
			content += '<tr><td colspan="2"><div class="PreviewContent">'+_a.comment+'</div></td></tr>';
			
		content += '</table>';
		content += '<table class="DialogTableControl" cellspacing="0" cellpadding="0" width="100%"><tr>';
			content += '<td align="left"><a title="Cancel booking" id="CancelBookingBtn" class="CancelBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#dialog\').dialog(\'close\');$.unblockUI();"><span class="ui-icon ui-icon-close"></span>Close</a></td>';
			if (_a.vacancies != 0)
				content += '<td align="right"><a title="Make a booking" onclick="$(\'#dialog\').dialog(\'close\');YAHOO.DC.EventCalendar.showAddBookingClient(\''+calendarId+'\','+_a.myid+');" class="MakeBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all"><span class="ui-icon ui-icon-circle-check"></span>Make a booking</a></td>';
	content += '</tr></table>';
		
	}else {
		
		content += '<table class="PreviewDialogPopup" cellspacing="0" cellpadding="0" width:"100%">';
			content += '<tr>';
				content += '<td width="100%">';
					content += '<h1 class="DialogTitle noTopMargin">'+_a.title+'</h1>';
					content += '<h2 class="DialogTitleDates ui-state-active">'+startDate+' <span class="separatorSpan">to</span> '+endDate+'</h2>';
				content += '</td>';
			content += '</tr>';
			content += '<tr><td colspan="2"><div class="PreviewContent">'+_a.comment+'</div></td></tr>';
		content += '</table>';
	}
	
	if(content != ''){
		 if(_a.title)
			YAHOO.DC.EventCalendar.showAddEventDialog(_a.title,content,560);
		 else
			YAHOO.DC.EventCalendar.showAddEventDialog('Booking Details',content,560);
	}
}

YAHOO.DC.EventCalendar.showAddBooking = function(calendarId,id,entryTypeId)
{
	if(entryTypeId === undefined)
		entryTypeId = 1;
	var body_in = '<li class="insert"><a href="#insert">Add New</a></li><li class="edit"><a href="#edit">Edit</a></li><li class="delete"><a href="#delete">Delete</a></li>';  
	if(YAHOO.DC.EventCalendar.admin[calendarId]  && id != -1)
		YAHOO.DC.EventCalendar.showAddBookingAdmin(calendarId,id);
	else {
		if(id != -1)
		{
			var obj2 = YAHOO.DC.EventCalendar.events[calendarId][YAHOO.DC.EventCalendar.getEventId(calendarId, id)];
			if (obj2.goUrl != "")
			{
				if (obj2.target == 2)
					document.location =  obj2.goUrl;
				else    
					window.open(obj2.goUrl);
			}  	    
		}else {
			var interval = YAHOO.DC.EventCalendar.calendarArray[calendarId].getInterval();
			if(interval.length!=0){
				YAHOO.DC.EventCalendar.showAddBookingAdmin(calendarId,id,entryTypeId);
			}else alert('You need to select date to proceed with your booking.');
		}	
	}
}

YAHOO.DC.EventCalendar.showAddBookingAdmin = function(calendarId,id, entryTypeId)
{
	index = YAHOO.DC.EventCalendar.getEventId(calendarId,id);
	obj = YAHOO.DC.EventCalendar.events[calendarId][index];
	init = function(id)
	{
		found = false;
	    
		//YAHOO.DC.addCalendar.setInterval(obj.l,obj.u);	
		//document.getElementById("titleEvent").value=obj.title;
		document.getElementById("descriptionEvent_"+id).value = obj.regComments;
		//$('#descriptionEvent_'+id).html=obj.comment;
		$('#CBfirstName_'+id).val(obj.firstName);
		$('#CBlastName_'+id).val(obj.lastName);
		$('#CBaddress_'+id).val(obj.address);
		$('#CBcity_'+id).val(obj.city);
		$('#CBpostCode_'+id).val(obj.postCode);
		$('#CBtelephone_'+id).val(obj.telephone);
		$('#CBemail_'+id).val(obj.email);
		$('#CBnrOfPeople_'+id).val(obj.numberOfPeople);
		if (obj.confirmed)
		    document.getElementById("ConfirmBooking_"+id).checked = true;
		else
		    document.getElementById("ConfirmBooking_"+id).checked = false; 
		
	}
	
	showPrice = function(calendarId,range,id,admin,numberOfPeople, discount)
	{
		var body_in = '';
		var Deposit = YAHOO.DC.EventCalendar.deposit[calendarId];
		var VAT = YAHOO.DC.EventCalendar.vat[calendarId];
		
		if(!numberOfPeople)
			numberOfPeople = 1;
		else
			numberOfPeople = parseInt(numberOfPeople);
		var rangeTemp = range;
		range = range.split("-");
		
		var l = new Date(Date.parse(range[0]));
		if(range[1])
			var u = new Date(Date.parse(range[1]));
		else{
			var u = new Date(Date.parse(range[0]));
			u = YAHOO.widget.DateMath.add(u,YAHOO.widget.DateMath.DAY,1);
		}
		var finalPrice = 0;
		var nrOfNights = 0;
		body_in += '<table class="BookingPrice" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">';
		if(YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[1] == '1')
			u=YAHOO.widget.DateMath.add(u,YAHOO.widget.DateMath.DAY,1);
		for (var j=l;j<u;j=YAHOO.widget.DateMath.add(j,YAHOO.widget.DateMath.DAY,1))
		{
			var tempIndex = new Date(j).format('m/d/yyyy');
			if(YAHOO.DC.EventCalendar._prices[calendarId][tempIndex] && !YAHOO.DC.EventCalendar._prices[calendarId][tempIndex][YAHOO.DC.EventCalendar._prices[calendarId][tempIndex].length-1].lastDay && YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[1] != '1')
				finalPrice += YAHOO.DC.EventCalendar._prices[calendarId][tempIndex][YAHOO.DC.EventCalendar._prices[calendarId][tempIndex].length-1].value;
			else if(YAHOO.DC.EventCalendar._prices[calendarId][tempIndex] && YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[1] == '1')
				finalPrice += YAHOO.DC.EventCalendar._prices[calendarId][tempIndex][YAHOO.DC.EventCalendar._prices[calendarId][tempIndex].length-1].value;
			else 
				finalPrice += YAHOO.DC.EventCalendar.defaultPrice[calendarId];
			nrOfNights++;
		}
		body_in += '<tr class="BookingPriceRow"><td class="BookingLeftCell">Price ('+nrOfNights+' '+(YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[1] == '1'?'days':'nights')+'):</td><td><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+finalPrice.toFixed(2)+'</strong></td></tr>';
		var extrasPrice = 0;
		$('.extrasInEntry_'+id).each(function(){
			var extrasId = $(this).attr('extrasId');
			if($('#extrasInEntry_'+extrasId+':checked').length > 0){
				var tt = (YAHOO.DC.EventCalendar.extras[calendarId][extrasId].ExtrasPrice*YAHOO.DC.EventCalendar.getSelectedNights(rangeTemp)*numberOfPeople);	
				extrasPrice += tt;
				body_in += '<tr class="BookingPriceRow BookingExtrasRow"><td class="BookingLeftCell ExtrasCellLeft ui-widget-content ui-state-active"><span class="ExtrasItemSpan">'+(YAHOO.DC.EventCalendar.getSelectedNights(rangeTemp)*numberOfPeople)+' x '+YAHOO.DC.EventCalendar.extras[calendarId][extrasId].ExtrasName+'</span><span class="ui-icon ui-icon-plusthick"></span></td><td class="ExtrasCellRight ui-widget-content ui-state-active">'+YAHOO.DC.EventCalendar.currency[calendarId]+tt.toFixed(2)+'</td></tr>';
				}
		});
		if(YAHOO.DC.EventCalendar.priceType[calendarId] == 'perperson'){
			finalPrice = finalPrice * numberOfPeople;
		}
		finalPrice += extrasPrice;
		
		body_in += '<tr class="BookingPriceRow BookingPriceRowSubtotal"><td class="BookingLeftCell">Subtotal:</td><td class="price_td"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+(finalPrice).toFixed(2)+'</strong></td></tr>';
		if(admin){
			if(discount == undefined)
				discount = parseFloat($('#CBdiscount_'+id).val());
			body_in += '<tr class="BookingPriceRow"><td class="BookingLeftCell">Discount:</td><td class="price_td"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+'<input id="CBdiscount_'+id+'" type="text" value="'+discount.toFixed(2)+'"/></strong></td></tr>';
			finalPrice -= parseFloat(discount);
			body_in += '<tr class="BookingPriceRow"><td class="BookingLeftCell">After discount:</td><td class="price_td"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+finalPrice.toFixed(2)+'</strong></td></tr>';
		}
		var priceVAT = (finalPrice*VAT)/100;
		body_in += '<tr class="BookingPriceRow"><td class="BookingLeftCell">Tax:</td><td class="price_td"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+(priceVAT).toFixed(2)+'</strong></td></tr>';
		body_in += '<tr class="FinalPriceofBooking"><td class="FinalPriceofBookingCell ui-state-active">Total price:</td><td class="price_td FinalPriceofBookingCell ui-state-active"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+'<span id="displayPrice">'+(finalPrice+priceVAT).toFixed(2)+'</span></td></tr>'
		body_in += '</table><input id="CBprice_'+id+'" type="hidden" value="'+(finalPrice)+'">';
		
		$('#priceTD'+id).html(body_in);
		$('#CBdiscount_'+id).change(function(){
			showPrice(calendarId,$('#startdate_'+id).val()+"-"+$('#enddate_'+id).val(),id,YAHOO.DC.EventCalendar.admin[calendarId],$('#CBnrOfPeople_'+id).val());
		});
	}
	
	showurl = function()
	{
		obj1 = document.getElementById("eTooltipEvent");
		obj2 = document.getElementById("tooltipEvent");
		if (obj1.options[obj1.selectedIndex].value==2 && obj2.checked)
		    document.getElementById("divurlEvent").style.display = "none";
		else
		    document.getElementById("divurlEvent").style.display = "";
	}
	intervalToString = function(interval)
	{
		return (interval[0].getMonth() + 1)+"/"+interval[0].getDate()+"/"+interval[0].getFullYear()+"-"+(interval[1].getMonth() + 1)+"/"+interval[1].getDate()+"/"+interval[1].getFullYear();

    }
 	validateAndSave = function()
	{
		$('#form'+id).submit(function(){return false;});
		if($('#form'+id).validationEngine({returnIsValid:true})){
			$('#startdate_'+id).datepicker('option', {dateFormat: 'm/d/yy'});
			$('#enddate_'+id).datepicker('option', {dateFormat: 'm/d/yy'});
				
			
			if (!YAHOO.DC.EventCalendar.checkDates($('#startdate_'+id).val(),$('#enddate_'+id).val()))
				alert('Start date is later than end date.');
			else if (!YAHOO.DC.EventCalendar.checkInterval($('#startdate_'+id).val(),$('#enddate_'+id).val(), id))
					alert('You can\'t make this booking. There is resrvation conflict.');
			else{
				
				var a = YAHOO.DC.EventCalendar.events[calendarId];
				var _a = YAHOO.DC.EventCalendar._events[calendarId];
				var tempBooking = new Object();
				var etargetEvent = document.getElementById("targetEvent");
				var range = tempBooking.range = $('#startdate_'+id).val()+"-"+$('#enddate_'+id).val();
				var days = range.split("-");
				var endDayTemp = days[1].split("/");
				if (id>=0)
					myid = tempBooking.myid = id;
				else{
					myid = tempBooking.myid = -1;
				}
				tempBooking.l = days[0];
				tempBooking.u = days[1];
				var goUrl = tempBooking.goUrl = "";
				var target = tempBooking.target ="0";
				var title = tempBooking.title = "";
				
				var confirmed = tempBooking.confirmed = false;
				var firstName = tempBooking.firstName = document.getElementById("CBfirstName_"+id).value;
				var lastName = tempBooking.lastName = document.getElementById("CBlastName_"+id).value;
				var address = tempBooking.address = document.getElementById("CBaddress_"+id).value;
				var city = tempBooking.city = document.getElementById("CBcity_"+id).value;
				var postCode = tempBooking.postCode = document.getElementById("CBpostCode_"+id).value;
				var telephone = tempBooking.telephone = document.getElementById("CBtelephone_"+id).value;
				var email = tempBooking.email = document.getElementById("CBemail_"+id).value;
				var price = tempBooking.price = document.getElementById("CBprice_"+id).value;
				var numberOfPeople = tempBooking.numberOfPeople = document.getElementById("CBnrOfPeople_"+id).value;
				if(document.getElementById("goToUrl_"+id))
					goUrl = tempBooking.goUrl = ((document.getElementById("goToUrl_"+id).checked)?document.getElementById("urlEvent").value:"");
				if(document.getElementById("goToUrl_"+id))
					target = tempBooking.target = ((document.getElementById("goToUrl_"+id).checked)?etargetEvent.options[etargetEvent.selectedIndex].value:"0");
				if(document.getElementById("ConfirmBooking_"+id))
					confirmed = tempBooking.confirmed = ((document.getElementById("ConfirmBooking_"+id).checked)?true:false);
				var tt = tempBooking.comment = $('#descriptionEvent_'+id).val();
				var paidAmount, amountToPay;
				tempBooking.entryTypeId = entryTypeId;
				if($('#paymentType option:selected').val() == '1')
						amountToPay = (YAHOO.DC.EventCalendar.deposit[calendarId]*parseFloat(price))/100;
					else
						amountToPay = parseFloat(price);
				
				paidAmount = tempBooking.paidAmount = amountToPay;
				tempBooking.roomId = YAHOO.DC.EventCalendar.RoomId[calendarId];
				amountToPay += (amountToPay * YAHOO.DC.EventCalendar.vat[calendarId]) / 100;
				
				amountToPay = amountToPay.toFixed(2);
				
				//paid extras list
				tempBooking.extrasInEntry = new Array();
				var k = 0;
				var extrasInEntry = '[';
				for(var i in YAHOO.DC.EventCalendar.extras[calendarId])
				{
					if($('#extrasInEntry_'+i).length>0)
					{
						tempBooking.extrasInEntry[k] = new Object();
						extrasInEntry+='{';
						extrasInEntry+='ExtrasId:'+YAHOO.DC.EventCalendar.extras[calendarId][i].ExtrasId+',';
						tempBooking.extrasInEntry[k].ExtrasId = YAHOO.DC.EventCalendar.extras[calendarId][i].ExtrasId;
						if ($('#extrasInEntry_'+i+':checked').length>0){
							extrasInEntry+='ExtrasInEntry:true';
							tempBooking.extrasInEntry[k].ExtrasInEntry = true;
						}
						else
						{
							extrasInEntry+='ExtrasInEntry:false';
							tempBooking.extrasInEntry[k].ExtrasInEntry = false;
						}
						extrasInEntry+='},';
						i++;k++;
					}
				}
				extrasInEntry+=']';
				
				//BLOCK UI - Step 1 (All calendar types): Reserving your booking details
				
				switch(YAHOO.DC.EventCalendar.roomType[CalendarId]){
					case 1:
						//Villa
						var thisLoaderType = 'Villa';
						break;
					case 2:
						//Hotel
						var thisLoaderType = 'Hotel';
						break;
					case 6:
						//Event
						var thisLoaderType = 'Event';
						break;
				}	
				if (YAHOO.DC.EventCalendar.roomName[CalendarId].length > 0 && YAHOO.DC.EventCalendar.folderName[CalendarId].length)
					$.blockUI({message: '<h1 class="DialogTitle DialogTitlewithLoader">Reserving your details</h1><div class="BookingDetailsLoader '+thisLoaderType+'_Loader"><span class="StaticLoaderImage"></span><span class="LoaderText">'+YAHOO.DC.EventCalendar.folderName[CalendarId]+' '+YAHOO.DC.EventCalendar.roomName[CalendarId]+'...</span></div>'});
					
				else
					$.blockUI({message: '<h1 class="DialogTitle DialogTitlewithLoader">Reserving your details</h1><div class="BookingDetailsLoader '+thisLoaderType+'_Loader"><span class="StaticLoaderImage"></span></div>'});
					
				$('#dialog').dialog('close');
				YAHOO.DC.EventCalendar.events[calendarId].push(tempBooking);
				//-----------------
				$(function(){$.getJSON(pathServer+"/ajax_client.ashx?action=setBooking&jsoncallback=?", { CalendarId: calendarId, l:days[0], u:days[1],
					comment:tt,
					colorSelected: '#000000',//myColors[colorSelected.substring(8,colorSelected.length)],
					goUrl:goUrl,
					title:title,
					target:target,
					firstName:firstName,
					lastName:lastName,
					address:address,
					city:city,
					postCode:postCode,
					telephone:telephone,
					email:email,
					numberOfPeople: numberOfPeople,
					entryTypeId: entryTypeId,
					confirmed:confirmed,
					myid: myid,
					RoomId: YAHOO.DC.EventCalendar.RoomId[calendarId],
					price:price,
					paidAmount: paidAmount,
					amountToPay: amountToPay,
					extrasInEntry: extrasInEntry},
					function(response){
						$.unblockUI();
						if(response != "nocredits") {
							if(price > 0 && response != "payed"){
								//Make payment window...
								var title = 'Reserve your booking for '+YAHOO.DC.EventCalendar.roomName[calendarId];
								var content = '<h1 class="DialogTitle">Please pay '+YAHOO.DC.EventCalendar.currency[calendarId]+amountToPay+' for your booking</h1>';
								content += '<p>Click on the \'<strong>Pay by PayPal</strong>\' button to confirm and pay your <strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+amountToPay+'</strong> booking fee. ';
								content += 'If you click \'<strong>Cancel</strong>\' your booking will remain unconfirmed until your booking fee is paid.</p><br/>';
								content += '<div class="input_holder">';
								content += '<table cellspacing="0" cellpadding="0" width="100%"><tr>';
									content += '<td align="left"><a title="Cancel" id="CancelBookingBtn" class="CancelBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#dialog\').dialog(\'close\');$.unblockUI();"><span class="ui-icon ui-icon-arrowreturnthick-1-w"></span>Cancel</a></td>';
									content += '<td align="right"><a title="Pay with PayPal" id="bookingBtn_'+id+'" class="MakeBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all"><span class="ui-icon ui-icon-circle-check"></span>Pay by PayPal</a></td>';
								content += '</tr></table>';
								
								content += '<div class="clear"></div><img src="DC_RCalendar/img/paypal_mc_visa_amex_disc_210x80.gif" style="display:block; margin:30px auto 20px auto;"/>';
								YAHOO.DC.EventCalendar.showAddEventDialog(title,content,400);
								$('#bookingBtn_'+id).click(function(){
									$('#dialog').dialog('close');
									window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&LandingPage=Billing&SolutionType=Sole&token='+response.Token);
									
									//BLOCK UI - step 3 (Villa / Cottage booking): Waiting for PayPal credentials confirmation
									$.blockUI({ message: '<h1 class="DialogTitle DialogTitlewithLoader">Confirming your PayPal credentials</h1><div class="BookingDetailsLoader PayPal_Loader"><span class="StaticLoaderImage"></span><a title="Cancel booking" class="CancelBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#subDialog\').dialog(\'close\');$.unblockUI();isAutorized=true;"><span class="ui-icon ui-icon-arrowreturnthick-1-w"></span>Cancel booking</a>' }); 
									checkPayPalAutorization(response.Token);
								});
							}else{
								YAHOO.DC.EventCalendar.initData(calendarId);
								YAHOO.DC.EventCalendar.viewBooking(false);
							}
						} else {
							alert("User has no credits!");
						}
					});});
			}
		}
    }
	priceIncVat = function(price){
		return priceVAT = ((price*YAHOO.DC.EventCalendar.vat[calendarId])/100)+price;
	}
	
	var title;
	if (YAHOO.DC.EventCalendar.admin[calendarId]==true)
		title = 'Add/Edit Booking';	
	else 
		{
			if (YAHOO.DC.EventCalendar.folderName[calendarId].length > 0)
				title = YAHOO.DC.EventCalendar.roomName[calendarId]+' ('+YAHOO.DC.EventCalendar.folderName[calendarId]+') - Booking form';
			else
				title = YAHOO.DC.EventCalendar.roomName[calendarId]+' - Booking form';
		}
	var interval;
	var range;
	// if id is selected selecting interval not necessary
	if (id >= 0)
		range = YAHOO.DC.EventCalendar.events[calendarId][YAHOO.DC.EventCalendar.getEventId(calendarId, id)].range;
	else {
		interval = YAHOO.DC.EventCalendar.calendarArray[calendarId].getInterval();
		if(interval[0] == interval[1] && YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[1] != '1')
			interval[1] = YAHOO.widget.DateMath.add(interval[1],YAHOO.widget.DateMath.DAY,1)
		range = intervalToString(interval);
	}
	var startDate = new Date(Date.parse(range.split("-")[0])).format('d mmm yyyy');//new Date.parse();
	var endDate = new Date(Date.parse(range.split("-")[1])).format('d mmm yyyy');//new Date.parse();
	var content;
	
	// Add booking - Event
	content = '<div id="divAddEvent" class="BookingToolDialog">';
	content += '<form id="form'+id+'" method="post" action="">';
	content += '<div class="fl">';
	content += '<h1 class="DialogTitle">'+title+'</h1>';
	content += '<h2 class="DialogTitleDates ui-state-active">From:&nbsp; <input type="text" id="startdate_'+id+'" value="'+startDate+'"> <span class="separatorSpan">to</span> <input type="text" id="enddate_'+id+'" value="'+endDate+'"></h2>';
	
	content += '<table class="OuterEventsTable" cellspacing="0" cellpadding="0"><tr>';
	
		//Event booking price
		content += '<td width="50%">';
			if (YAHOO.DC.EventCalendar.extras[calendarId].length != 0)
		{
			content += '<div class="EventBookingExtras DialogAvailableExtras ui-corner-all ui-state-default"><h3 class="DialogTitleExtras">Available extras:</h3><table class="EventBookingExtras" cellspacing="0" cellpadding="0">';
					for(var i in YAHOO.DC.EventCalendar.extras[calendarId])
					{
						var tempExtras = YAHOO.DC.EventCalendar.extras[calendarId][i];
						if(tempExtras.ExtrasInRoom){
							content += '<tr class="CallToolTip_extras" rel="'+tempExtras.ExtrasDescription+'"><td><span>'+tempExtras.ExtrasName+' ('+YAHOO.DC.EventCalendar.currency[calendarId]+tempExtras.ExtrasPrice+' per night)</span></td><td><input type="checkbox" id="extrasInEntry_'+i+'" class="extrasInEntry_'+id+'" extrasId="'+i+'" ';
							if (obj)	
								if (obj.extrasInEntry[i].ExtrasInEntry)
									content += 'checked';
							content += '/></td></tr>';
						}
					}
				content += '</table>';
			content += '</div>';
		}
		content += '<div class="EventBookingExtras PriceofBooking ui-corner-all ui-state-default">';
			content += '<h3 class="DialogTitleExtras">Price of booking:</h3>';
			content += '<table class="EventBookingPrice" cellspacing="0" cellpadding="0">';
				content += '<tr>';
					content += '<td id="priceTD'+id+'"></td>';
				content += '</tr>';
	
				// If they've already paid, then...
				if(obj)
					{
					content += '<tr height="5"></tr>';
					content += '<tr>';
						content += '<td id="paidAlready"><strong>Paid already:</strong> '+YAHOO.DC.EventCalendar.currency[calendarId]+priceIncVat(obj.paidAmount).toFixed(2)+'</td>';
					content += '</tr>';
					content += '<tr height="5"></tr>';
				}
					
			content += '</table>';
		content += '</div>';
		content += '</td>';
	
	
	//Event booking extras
	content += '<td width="50%">';
		//Event booking form
			content += '<div class="EventBookingForm"><h3 class="DialogTitleExtras">Your details:</h3><table class="EventBookingForm">';
			if(YAHOO.DC.EventCalendar.deposit[calendarId]>0){
				if(obj){
					if(obj.paidAmount == 0){
						content += '<tr><td><span class="g3label">Payment:</span></td><td><select id="paymentType" class="g3select RoundedCornerB"><option value="0" selected>Full amount</option><option value="1">'+YAHOO.DC.EventCalendar.deposit[calendarId]+'% deposit only</option></select></td></tr>';
					}
				}else
				content += '<tr><td><span class="g3label">Payment:</span></td><td><select id="paymentType" class="g3select RoundedCornerB"><option value="0" selected>Full amount</option><option value="1">'+YAHOO.DC.EventCalendar.deposit[calendarId]+'% deposit only</option></select></td></tr>';
			}
			content += '<tr><td><span class="g3label">First name:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,custom[onlyLetter],length[0,100]]" id="CBfirstName_'+id+'"></td></tr>';
			content += '<tr><td><span class="g3label">Last name:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,custom[onlyLetter],length[0,100]]" id="CBlastName_'+id+'"></td></tr>';
			content += '<tr><td><span class="g3label">Address:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,length[0,500]]" id="CBaddress_'+id+'"></td></tr>';
			content += '<tr><td><span class="g3label">City:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,custom[onlyLetter],length[0,100]]" id="CBcity_'+id+'"></td></tr>';
			content += '<tr><td><span class="g3label">Postcode:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,length[0,20]]" id="CBpostCode_'+id+'"></td></tr>';
			content += '<tr><td><span class="g3label">Telephone:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,custom[onlyNumber],length[0,20]]" id="CBtelephone_'+id+'"></td></tr>';
			content += '<tr><td><span class="g3label">Email:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,custom[email],length[0,300]]" id="CBemail_'+id+'"></td></tr>';
			content += '<tr><td><span class="g3label">Number of people:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,custom[onlyNumber],length[0,2]]" value="1" id="CBnrOfPeople_'+id+'" style="width:60px;"></td></tr>';
			content += '<tr><td><span class="g3label">Additional notes:</span></td><td><textarea class="tinymce EventBookingForm g3textarea RoundedCornerB" type="text" name="descriptionEvent_'+id+'" id="descriptionEvent_'+id+'"/></textarea></td></tr>';
			content += '</table>';
			content += '</div>';
		// End of outer table
		content += '</td></tr></table>';
	
	content += '<div class="clear"></div>';
	content += '<input id="entryTypeId" type="hidden"></input>';
	content += '<div class="input_holder"><table cellspacing="0" cellpadding="0" width="100%"><tr>';
	//content += '<input type="button" id="SaveBookingBtn" class="g3input makeHover RoundedCornerA" onclick="javascript:validateAndSave()" value="Add booking">&nbsp;<input type="button" id="CancelBookingBtn" class="g3input makeHover RoundedCornerA" onclick="javascript:$(\'#dialog\').dialog(\'close\');" value="Cancel booking">';

		content += '<td align="left"><a href="#" title="Cancel booking" class="CancelBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#dialog\').dialog(\'close\');$.unblockUI();"><span class="ui-icon ui-icon-arrowreturnthick-1-w"></span>Cancel booking</a>';
		if (id>=0)
		{
			content += '&nbsp;<input type="button" onclick="javascript:YAHOO.DC.EventCalendar.confirmAndDelete('+id+')" value="Delete" class="ui-button button-action-white ui-button-delete">';
		}
		content += '</td>';
		
		content += '<td align="right"><a href="#" title="Add booking" class="MakeBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" id="SaveBookingBtn" onclick="javascript:validateAndSave()"><span class="ui-icon ui-icon-circle-check"></span>Make booking</a></td>';

	content += '</tr></table></div></form></div>';

	YAHOO.DC.EventCalendar.showAddEventDialog(title,content,560);
	if (id>=0){
        init(id, entryTypeId);
		showPrice(calendarId,$('#startdate_'+id).val()+"-"+$('#enddate_'+id).val(),id,YAHOO.DC.EventCalendar.admin[calendarId],$('#CBnrOfPeople_'+id).val(), (parseFloat(YAHOO.DC.EventCalendar.getFinalPrice(calendarId,obj.range,id,obj.numberOfPeople,'extrasInEntry_'))-obj.price));
	}
	else {
		$('#entryTypeId').val(entryTypeId);
		showPrice(calendarId,$('#startdate_'+id).val()+"-"+$('#enddate_'+id).val(),id,YAHOO.DC.EventCalendar.admin[calendarId],$('#CBnrOfPeople_'+id).val(), 0);
	}
	$('.CallToolTip').callToolTip();
	$('.CallToolTip_extras').callToolTip('ui-tooltip ui-tabs-selected ui-state-active ui-corner-all');
	$('#startdate_'+id).datepicker({
		beforeShow: function() {$('#ui-datepicker-div').maxZIndex(); },
		defaultDate: startDate,
		dateFormat: 'dd M yy'
	});
	$('#enddate_'+id).datepicker({
		beforeShow: function() {$('#ui-datepicker-div').maxZIndex(); },
		defaultDate: endDate,
		dateFormat: 'dd M yy'
	});
	$('#form'+id).validationEngine();
	$('.extrasInEntry_'+id).change(function(){
		showPrice(calendarId,$('#startdate_'+id).val()+"-"+$('#enddate_'+id).val(),id,YAHOO.DC.EventCalendar.admin[calendarId],$('#CBnrOfPeople_'+id).val());
	});
	$('#startdate_'+id).change(function(){
		showPrice(calendarId,$('#startdate_'+id).val()+"-"+$('#enddate_'+id).val(),id,YAHOO.DC.EventCalendar.admin[calendarId],$('#CBnrOfPeople_'+id).val());
	}).change();
	$('#enddate_'+id).change(function(){
		showPrice(calendarId,$('#startdate_'+id).val()+"-"+$('#enddate_'+id).val(),id,YAHOO.DC.EventCalendar.admin[calendarId],$('#CBnrOfPeople_'+id).val());
	}).change();
	$('#CBnrOfPeople_'+id).change(function(){
		showPrice(calendarId,$('#startdate_'+id).val()+"-"+$('#enddate_'+id).val(),id,YAHOO.DC.EventCalendar.admin[calendarId],$('#CBnrOfPeople_'+id).val());
	});
}

YAHOO.DC.EventCalendar.viewBooking = function(isConfirmation)
{
	var id = 666;
	index = YAHOO.DC.EventCalendar.events[calendarId].length-1;
	obj = YAHOO.DC.EventCalendar.events[calendarId][index];
	init = function(id)
	{
		$('#descriptionEvent'+id).html(obj.regComments);
		$('#CBfirstName'+id).html(obj.firstName);
		$('#CBlastName'+id).html(obj.lastName);
		$('#CBaddress'+id).html(obj.address);
		$('#CBcity'+id).html(obj.city);
		$('#CBpostCode'+id).html(obj.postCode);
		$('#CBtelephone'+id).html(obj.telephone);
		$('#CBemail'+id).html(obj.email);
		$('#CBnrOfPeople'+id).html(obj.numberOfPeople);
		
	}
	
	showPrice = function(calendarId,range,id,admin,numberOfPeople, discount)
	{
		var body_in = '';
		var Deposit = YAHOO.DC.EventCalendar.deposit[calendarId];
		var VAT = YAHOO.DC.EventCalendar.vat[calendarId];
		
		if(!numberOfPeople)
			numberOfPeople = 1;
		else
			numberOfPeople = parseInt(numberOfPeople);
		var rangeTemp = range;
		range = range.split("-");
		
		var l = new Date(Date.parse(range[0]));
		if(range[1])
			var u = new Date(Date.parse(range[1]));
		else{
			var u = new Date(Date.parse(range[0]));
			u = YAHOO.widget.DateMath.add(u,YAHOO.widget.DateMath.DAY,1);
		}
		var finalPrice = 0;
		var nrOfNights = 0;
		body_in += '<table>';
		if(YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[1] == '1')
			u=YAHOO.widget.DateMath.add(u,YAHOO.widget.DateMath.DAY,1);
		for (var j=l;j<u;j=YAHOO.widget.DateMath.add(j,YAHOO.widget.DateMath.DAY,1))
		{
			var tempIndex = new Date(j).format('m/d/yyyy');
			if(YAHOO.DC.EventCalendar._prices[calendarId][tempIndex] && !YAHOO.DC.EventCalendar._prices[calendarId][tempIndex][YAHOO.DC.EventCalendar._prices[calendarId][tempIndex].length-1].lastDay && YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[1] != '1')
				finalPrice += YAHOO.DC.EventCalendar._prices[calendarId][tempIndex][YAHOO.DC.EventCalendar._prices[calendarId][tempIndex].length-1].value;
			else if(YAHOO.DC.EventCalendar._prices[calendarId][tempIndex] && YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[1] == '1')
				finalPrice += YAHOO.DC.EventCalendar._prices[calendarId][tempIndex][YAHOO.DC.EventCalendar._prices[calendarId][tempIndex].length-1].value;
			else 
				finalPrice += YAHOO.DC.EventCalendar.defaultPrice[calendarId];
			nrOfNights++;
		}
		body_in += '<tr><td class="label_td">Price: ('+nrOfNights+' '+(YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[1] == '1'?'days':'nights')+')</td><td>'+YAHOO.DC.EventCalendar.currency[calendarId]+finalPrice.toFixed(2)+'</td></tr>';
		var extrasPrice = 0;
		$('.extrasInEntry'+id).each(function(){
			var extrasId = $(this).attr('extrasId');
			if($('#extrasInEntry'+extrasId+':checked').length > 0){
				var tt = (YAHOO.DC.EventCalendar.extras[calendarId][extrasId].ExtrasPrice*YAHOO.DC.EventCalendar.getSelectedNights(rangeTemp)*numberOfPeople);	
				extrasPrice += tt;
				body_in += '<tr><td class="label_td">'+(YAHOO.DC.EventCalendar.getSelectedNights(rangeTemp)*numberOfPeople)+' x '+YAHOO.DC.EventCalendar.extras[calendarId][extrasId].ExtrasName+'</td><td>'+YAHOO.DC.EventCalendar.currency[calendarId]+tt.toFixed(2)+'</td></tr>';
				}
		});
		if(YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[0] == '2')
			finalPrice *= numberOfPeople;
		finalPrice += extrasPrice;
		
		body_in += '<tr><td class="label_td">Price excl. tax:</td><td class="price_td">'+YAHOO.DC.EventCalendar.currency[calendarId]+(finalPrice).toFixed(2)+'</td></tr>';
		if(admin){
			body_in += '<tr><td class="label_td">Discount:</td><td class="price_td">'+YAHOO.DC.EventCalendar.currency[calendarId]+'<span id="CBdiscount'+id+'">'+discount.toFixed(2)+'</span></td></tr>';
			finalPrice -= parseFloat(discount);
			body_in += '<tr><td class="label_td">After discount:</td><td class="price_td">'+YAHOO.DC.EventCalendar.currency[calendarId]+finalPrice.toFixed(2)+'</td></tr>';
		}
		var priceVAT = (finalPrice*VAT)/100;
		body_in += '<tr><td class="label_td">Tax:</td><td class="price_td">'+YAHOO.DC.EventCalendar.currency[calendarId]+(priceVAT).toFixed(2)+'</td></tr>';
		body_in += '<tr><td class="label_td">Total incl. tax:</td><td class="price_td"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+'<span id="displayPrice">'+(finalPrice+priceVAT).toFixed(2)+'</span></td></tr>'
		
		$('#priceTD'+id).html(body_in);
	}
	
	priceIncVat = function(price){
		return priceVAT = ((price*YAHOO.DC.EventCalendar.vat[calendarId])/100)+price;
	}
	
	var title;
	
	title = '<div class="dialog_icon booking_details"></div>Booking details';
	var interval;
	var range;
	// if id is selected selecting interval not necessary
	range = YAHOO.DC.EventCalendar.events[calendarId][index].range;
	
	var startDate = new Date(Date.parse(range.split("-")[0])).format('d mmm yyyy');//new Date.parse();
	var endDate = new Date(Date.parse(range.split("-")[1])).format('d mmm yyyy');//new Date.parse();
	var content;
	content = '<div id="divAddEvent">';
	content += '<form id="form'+id+'" method="post" action="">';
	content += '<div id="fl" class="fl wide" style="padding-bottom:10px;">';
	
	content += '<h1 class="DialogTitle">'+YAHOO.DC.EventCalendar.roomName[calendarId]+'</h1>';
	content += '<h2 class="DialogTitleDates ui-state-active">'+startDate+' <span>to</span> '+endDate+'</h2>';
	
	content += '<table class="add_edit_extras_table wide_table"><tr>';
	
	
	// booking table divide left
	content += '<td class="add_edit_extras_table_left greyed_out" width="200px">';
		content += '<table>';
			content += '<tr><td colspan="2" class="extras_arrow greyed_out"><strong>Selected extras:</strong></td></tr>';
	
	for(var i in YAHOO.DC.EventCalendar.extras[calendarId])
	{
		var tempExtras = YAHOO.DC.EventCalendar.extras[calendarId][i];
		if(tempExtras.ExtrasInRoom){
			content += '<tr class="CallToolTip" rel="'+tempExtras.ExtrasDescription+'"><td class="list_td"><span>'+tempExtras.ExtrasName+' ('+YAHOO.DC.EventCalendar.currency[calendarId]+tempExtras.ExtrasPrice+' per night)</span></td><td><input type="checkbox" id="extrasInEntry'+i+'" class="extrasInEntry'+id+'" extrasId="'+i+'" ';
			if (obj)	
				if (obj.extrasInEntry[i].ExtrasInEntry)
					content += 'checked';
			content += ' disabled /></td></tr>';
		}
	}
	content += '</table></td>';
	
	// booking table center 
	content += '<td class="add_edit_extras_table_right" width="230px">';
		content += '<table width="100%">';
			content += '<tr><td class="label_td" colspan="2">Price:</td></tr>';
			content += '<tr><td colspan="2" width="100%" id="priceTD'+id+'"></td></tr>';
	
	if(id > 0)
		content += '<tr><td class="paid_td">Paid already:</td><td class="paid_td">'+YAHOO.DC.EventCalendar.currency[calendarId]+(obj.paid?priceIncVat(obj.paidAmount).toFixed(2):'0.00')+'</td></tr>';
		content += '</table></td>';	
		
	
	// booking table right
	content += '<td class="add_edit_extras_table_right booking details" width="335px">';
	content += '<table>';
	content += '<tr><td class="label_td greyed_out">Booking details:</td></tr><tr><td class="label_td">First name:</td><td><span id="CBfirstName'+id+'"></span></td></tr>';
	content += '<tr><td class="label_td">Last name:</td><td><span id="CBlastName'+id+'"></span></td></tr>';
	content += '<tr><td class="label_td">Address:</td><td><span id="CBaddress'+id+'"></span></td></tr>';
	content += '<tr><td class="label_td">City:</td><td><span id="CBcity'+id+'"></span></td></tr>';
	content += '<tr><td class="label_td">Postcode:</td><td><span id="CBpostCode'+id+'"></span></td></tr>';
	content += '<tr><td class="label_td">Email:</td><td><span id="CBemail'+id+'"></span></td></tr>';
	content += '<tr><td class="label_td">Telephone:</td><td><span id="CBtelephone'+id+'"></span></td></tr>';
	content += '<tr><td class="label_td">Number of people:</td><td><span id="CBnrOfPeople'+id+'"></span></td></tr>';
	content += '</table></td>';
	content += '</tr></table>'
	content += '<table><tr><td class="label_td"><strong>Comments:</strong></tr></td><tr><td colspan="2"><span type="text" id="descriptionEvent'+id+'" class="extras_table booking_form greyed_out"/></span></td></tr>';
	content += '</div>';
	content += '<div style="clear:both"></div>';
	content += '<div style="clear:both"></div>';
	content += '<div class="input_holder">';
	content += '<table cellspacing="0" cellpadding="0" width="100%"><tr>';
	if(isConfirmation){
		content += '<td><table width="100%" cellspacing="0" cellpadding="0"><tr>'				
				content += '<td align="left"><table cellspacing="0" cellpadding="0"><tr>';
					content += '<td><a title="Cancel booking" class="CancelBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#subDialog\').dialog(\'close\');$.unblockUI();"><span class="ui-icon ui-icon-cross"></span>Cancel booking</a></td>';
					content += '<td width="10"></td><td><a title="Print" class="CancelBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#fl\').printArea(\'MrSite BokingTool - Booking Info\');"><span class="ui-icon ui-icon-print"></span>Print</a></td>';
				content += '</tr></table></td>';
				content += '<td align="right"><a title="Confirm payment" id="confirmPayment" class="MakeBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" ><span class="ui-icon ui-icon-circle-check"></span>Confirm payment</a></td>';		
		content += '</tr></table></td>';
	}else{
	content += '<td><a title="Close booking details" class="CancelBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#subDialog\').dialog(\'close\');"><span class="ui-icon ui-icon-cross"></span>Close</a></td>';
	content += '<td><a title="Print booking details" class="MakeBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#fl\').printArea(\'MrSite BokingTool - Booking Info\');"><span class="ui-icon ui-icon-print"></span>Print</a></td>';
	}
	content += '</tr></table></div></form></div>';
	content +='<a href="mailto:beta@mrsite.co.uk?subject=Booking%20Tool%20feedback:%20calendar%20toolbar%20-%20Add/Edit%20booking%20section"><span id="feedback14" class="feedback ui-interact"></span></a>';
	
	YAHOO.DC.EventCalendar.showAddEventSubDialog('<div class="dialog_icon booking_details"></div>Booking details',content,800);
	init(id);
	
	var discount = parseFloat(YAHOO.DC.EventCalendar.getFinalPrice(calendarId,obj.range,id,obj.numberOfPeople,'extrasInEntry'))-obj.price;
	showPrice(calendarId,range,id,YAHOO.DC.EventCalendar.admin[calendarId],obj.numberOfPeople, discount);
}

YAHOO.DC.EventCalendar.showAddBookingClient = function(calendarId,eventId,id)
//--------------------------------------------------------------
{
	var basicPrice;
	var freeSpaces;
	var index = YAHOO.DC.EventCalendar.getEventId(calendarId,eventId);
	var obj2 = YAHOO.DC.EventCalendar.events[calendarId][index];
	
	showPrice = function(calendarId,admin,numberOfPeople, discount)
	{
		var body_in = '';
		var VAT = YAHOO.DC.EventCalendar.vat[calendarId];
		var finalPrice;
		if(!numberOfPeople)
			numberOfPeople = 1;
		else
			numberOfPeople = parseInt(numberOfPeople);
		
		
		
		// Show the price of booking in stages
		var finalPrice = obj2.price;
		finalPrice = finalPrice * numberOfPeople;
		body_in += '<table class="BookingPrice" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">';
		
		body_in += '<tr class="BookingPriceRow"><td class="BookingLeftCell">Base price:</td><td><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+finalPrice.toFixed(2)+'</strong></td></tr>';
		var extrasPrice = 0;
		$('.extrasInForm'+id).each(function(){
			var extrasId = $(this).attr('extrasId');
			if($('#extrasInForm'+extrasId+':checked').length > 0){
				var tt = (YAHOO.DC.EventCalendar.extras[calendarId][extrasId].ExtrasPrice*numberOfPeople);	
				extrasPrice += tt;
				body_in += '<tr class="BookingPriceRow BookingExtrasRow"><td class="BookingLeftCell ExtrasCellLeft ui-widget-content ui-state-active"><span class="ExtrasItemSpan">'+numberOfPeople+' x '+YAHOO.DC.EventCalendar.extras[calendarId][extrasId].ExtrasName+'</span><span class="ui-icon ui-icon-plusthick"></span></td><td class="ExtrasCellRight ui-widget-content ui-state-active">'+YAHOO.DC.EventCalendar.currency[calendarId]+tt.toFixed(2)+'</td></tr>';
				
			}
		});
		
		finalPrice += extrasPrice;
		
		body_in += '<tr class="BookingPriceRow BookingPriceRowSubtotal"><td class="BookingLeftCell">Subtotal:</td><td class="price_td"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+(finalPrice).toFixed(2)+'</strong></td></tr>';
		if(admin){
			if(discount == undefined)
				discount = parseFloat($('#CBdiscount_'+id).val());
			body_in += '<tr class="BookingPriceRow"><td class="BookingLeftCell">Discount:</td><td class="price_td"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+'<input id="CBdiscount_'+id+'" type="text" value="'+discount.toFixed(2)+'"/></strong></td></tr>';
			finalPrice -= parseFloat(discount);
			body_in += '<tr class="BookingPriceRow"><td class="BookingLeftCell">After discount:</td><td class="price_td"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+finalPrice.toFixed(2)+'</strong></td></tr>';
		}
		var priceVAT = (finalPrice*VAT)/100;
		body_in += '<tr class="BookingPriceRow"><td class="BookingLeftCell">Tax:</td><td class="price_td"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+(priceVAT).toFixed(2)+'</strong></td></tr>';
		body_in += '<tr class="FinalPriceofBooking"><td class="FinalPriceofBookingCell ui-state-active">Total price:</td><td class="price_td ui-state-active"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+'<span id="displayPrice">'+(finalPrice+priceVAT).toFixed(2)+'</span></td></tr>'
		body_in += '</table><input id="clienBookingprice_'+id+'" type="hidden" value="'+(finalPrice)+'">';
		
		$('#priceTD'+id).html(body_in);
		$('#CBdiscount_'+id).change(function(){
			showPrice(calendarId,YAHOO.DC.EventCalendar.admin[calendarId],$('#CBnrOfPeople_'+id).val());
		});
	}
	
	getPrice = function(applicant)
	{
		var body_in = '';
		var VAT = YAHOO.DC.EventCalendar.vat[calendarId];
		var finalPrice;
		
		var finalPrice = obj2.price;
		var extrasPrice = 0;
		for(var i in applicant.extrasInForm){
			var extrasId = applicant.extrasInForm[i].ExtrasId;
			var tempIndex = -1;
			if(applicant.extrasInForm[i].ExtrasInForm){
				for(var k in YAHOO.DC.EventCalendar.extras[calendarId]){
					if(applicant.extrasInForm[i].ExtrasId == YAHOO.DC.EventCalendar.extras[calendarId][k].ExtrasId)
						tempIndex = k;
				}
				var tt = (YAHOO.DC.EventCalendar.extras[calendarId][tempIndex].ExtrasPrice*applicant.numberOfPeople);	
				extrasPrice += tt;
			}
		}
		finalPrice = finalPrice * applicant.numberOfPeople;
		finalPrice += extrasPrice;
		
		
		return finalPrice;
	}
	
	priceIncVat = function(price){
		return priceVAT = ((price*YAHOO.DC.EventCalendar.vat[calendarId])/100)+price;
	}
	
	
	
	intervalToString = function(interval)
	{
		return (interval[0].getMonth() + 1)+"/"+interval[0].getDate()+"/"+interval[0].getFullYear()+"-"+(interval[1].getMonth() + 1)+"/"+interval[1].getDate()+"/"+interval[1].getFullYear();

    }
 	validateAndSave = function()
	{
		$('#form'+id).submit(function(){return false;});
		if($('#form'+id).validationEngine({returnIsValid:true})){
			var numberOfPeople = $('#CBnrOfPeople_'+id).val();
				
			if(freeSpaces < numberOfPeople)
				alert('There is no required number of places');
			else
			{
				YAHOO.DC.EventCalendar.applicantsList[calendarId][0] = new Object();
				var obj = new Object();
				
					
				var etargetEvent = document.getElementById("targetEvent");
				
				var range = $('#startdate_'+id).val()+"-"+$('#enddate_'+id).val();
				var days = range.split("-");
				var endDayTemp = days[1].split("/");
				
				myid = eventId;
				var a = YAHOO.DC.EventCalendar.events[calendarId][YAHOO.DC.EventCalendar.getEventId(calendarId, eventId)];
				var confirmed = false;
				var firstName = document.getElementById("CBfirstName_"+id).value;
				var lastName = document.getElementById("CBlastName_"+id).value;
				var address = document.getElementById("CBaddress_"+id).value;
				var city = document.getElementById("CBcity_"+id).value;
				var postCode = document.getElementById("CBpostCode_"+id).value;
				var telephone = document.getElementById("CBtelephone_"+id).value;
				var email = document.getElementById("CBemail_"+id).value;
				
				var price = parseFloat($('#clienBookingprice_'+id).val());
				
				var paid = false;
				
				if(price == 0) 
					paid = true;
				var tt = $('#descriptionEvent_'+id).val();
				//paid extras list
				var amountToPay = priceIncVat(parseFloat(price));
				amountToPay = amountToPay.toFixed(2);
				
				obj.extrasInForm = new Array();
				var extrasInForm = '[';
				$('.extrasInForm'+id).each(function()
				{
					var tempExtrasInForm = new Object();
					var i = parseInt($(this).attr('ExtrasId'));
					extrasInForm+='{';
					extrasInForm+='ExtrasId:'+YAHOO.DC.EventCalendar.extras[calendarId][i].ExtrasId+',';
					tempExtrasInForm.ExtrasId = YAHOO.DC.EventCalendar.extras[calendarId][i].ExtrasId
					if ($('#extrasInForm'+i+':checked').length>0){
						extrasInForm+='ExtrasInForm:true';
						tempExtrasInForm.ExtrasInForm = true;
					}
					else{
						extrasInForm+='ExtrasInForm:false';
						tempExtrasInForm.ExtrasInForm = false;
					}
					extrasInForm+='},';
					obj.extrasInForm.push(tempExtrasInForm);
				});
				extrasInForm+=']';
				
				obj.comment = tt;
				obj.paidAmount = parseFloat(amountToPay);
				obj.firstName = firstName;
				obj.lastName = lastName;
				obj.address = address;
				obj.city = city;
				obj.postCode = postCode;
				obj.telephone = telephone;
				obj.email = email;
				obj.paid = paid;
				obj.id = -1;
				obj.numberOfPeople = parseInt(numberOfPeople);
				obj.calendarEntryId = parseInt(eventId);
				YAHOO.DC.EventCalendar.applicantsList[calendarId][0] = obj;
				
				//-----------------
				$('#subDialog').dialog('close');
				
				//BLOCK UI - 2: Sending event booking details to the server
				if (YAHOO.DC.EventCalendar.roomName[CalendarId].length > 0 && YAHOO.DC.EventCalendar.folderName[CalendarId].length)
					$.blockUI({message: '<h1 class="DialogTitle DialogTitlewithLoader">Reserving your details</h1><div class="BookingDetailsLoader Event_Loader"><span class="StaticLoaderImage"></span><span class="LoaderText">'+YAHOO.DC.EventCalendar.folderName[CalendarId]+' '+YAHOO.DC.EventCalendar.roomName[CalendarId]+'...</span></div>'});
					
				else
					$.blockUI({message: '<h1 class="DialogTitle DialogTitlewithLoader">Reserving your details</h1><div class="BookingDetailsLoader Event_Loader"><span class="StaticLoaderImage"></span></div>'});

				
				$.getJSON(pathServer+"/ajax_client.ashx?action=setBooking&jsoncallback=?", { l:a.l, u:a.u,
					comment: tt,
					firstName:firstName,
					lastName:lastName,
					address:address,
					city:city,
					postCode:postCode,
					telephone:telephone,
					email:email,
					numberOfPeople: numberOfPeople,
					entryTypeId: 6,
					price: price,
					amountToPay: amountToPay,
					paid: paid,
					confirmed:confirmed,
					myid: myid,
					CalendarId: calendarId,
					RoomId: YAHOO.DC.EventCalendar.RoomId[calendarId],
					id: (id>=0?id:-1),
					extrasInForm: extrasInForm},
					function(response){
						if(response){
							$.unblockUI();
							if(!paid && price > 0 && response != "payed"){
								
								//Confirmation window for event booking
								var title = 'Reserve your booking for '+YAHOO.DC.EventCalendar.roomName[calendarId];
								var content = '<h1 class="DialogTitle">Please pay '+YAHOO.DC.EventCalendar.currency[calendarId]+amountToPay+' for your booking</h1>';
								content += '<p>Click on the \'<strong>Pay by PayPal</strong>\' button to confirm the booking and pay your <strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+amountToPay+'</strong> booking fee. If you click \'<strong>Cancel</strong>\' your booking will remain unconfirmed until your booking fee is paid.</p><br/>';
								content += '<div class="input_holder">';
								content += '<table cellspacing="0" cellpadding="0" width="100%"><tr>';
									content += '<td align="left"><a title="Cancel" id="CancelBookingBtn" class="CancelBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#dialog\').dialog(\'close\');$.unblockUI();"><span class="ui-icon ui-icon-arrowreturnthick-1-w"></span>Cancel</a></td>';
									content += '<td align="right"><a title="Pay by PayPal" id="eventBookingBtn_'+id+'" class="MakeBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all"><span class="ui-icon ui-icon-circle-check"></span>Pay by PayPal</a></td>';
								content += '</tr></table>';
								
								content += '<div class="clear"></div><img src="DC_RCalendar/img/paypal_mc_visa_amex_disc_210x80.gif" style="display:block; margin:30px auto 20px auto;"/>';
								
								
								YAHOO.DC.EventCalendar.showAddEventDialog(title,content,400);
								$('#eventBookingBtn_'+id).click(function(){
									$('#dialog').dialog('close');
									window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&LandingPage=Billing&SolutionType=Sole&token='+response.Token);
									
									//BLOCK UI - 3: Waiting for PayPal credentials
									$.blockUI({ message: '<h1 class="DialogTitle DialogTitlewithLoader">Confirming your PayPal credentials</h1><div class="BookingDetailsLoader PayPal_Loader"><span class="StaticLoaderImage"></span><a title="Cancel booking" class="CancelBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#subDialog\').dialog(\'close\');$.unblockUI();isAutorized=true;"><span class="ui-icon ui-icon-arrowreturnthick-1-w"></span>Cancel booking</a>' }); 
									checkPayPalAutorization(response.Token);
								});
							}else{
								var content = '<p align="center">Thankyou for booking</p>';
								//YAHOO.DC.EventCalendar.showAddEventDialog('Confirmation Window',content,300);
								YAHOO.DC.EventCalendar.viewBookingClient();
							}
						}
					});
			}
		}
    }
	
	isExtrasInForm = function(applicant, id) {
		for(var i in applicant.extrasInForm) {
			if(applicant.extrasInForm[i].ExtrasId == id)
				return applicant.extrasInForm[i].ExtrasInForm;
		}
	}
	
	priceIncVat = function(price){
		return priceVAT = ((price*YAHOO.DC.EventCalendar.vat[calendarId])/100)+price;
	}
	// Event booking form....
	var title = obj2.title+' - Booking form';
	var interval;
	var range;
	
	range = YAHOO.DC.EventCalendar.events[calendarId][YAHOO.DC.EventCalendar.getEventId(calendarId, eventId)].range;
	
	if(id){
		var applicantIndex = YAHOO.DC.EventCalendar.getApplicantId(calendarId,eventId, id);
		var obj = YAHOO.DC.EventCalendar.applicantsList[calendarId][eventId][applicantIndex];
	}
	var content;
	
	//
	var startDate = new Date(Date.parse(range.split("-")[0])).format('d mmm yyyy');//new Date.parse();
	var endDate = new Date(Date.parse(range.split("-")[1])).format('d mmm yyyy');//new Date.parse();
	content = '<div id="divAddEvent" class="BookingToolDialog">';
	content += '<form id="form'+id+'" method="post" action="">';
	content += '<div class="fl">';
	content += '<h1 class="DialogTitle">'+title+'</h1>';
	content += '<h2 class="DialogTitleDates ui-state-active">'+startDate+' <span class="separatorSpan">to</span> '+endDate+'</h2>';
	
	content += '<table class="OuterEventsTable" cellspacing="0" cellpadding="0">';
		content += '<tr>';
			content += '<td width="50%">';
				if (YAHOO.DC.EventCalendar.extras[calendarId].length != 0)
				{
					if(obj2)
					{
						if(YAHOO.DC.EventCalendar.checkIfExtrasExist(obj2))
						{
							content += '<div class="EventBookingExtras DialogAvailableExtras ui-corner-all ui-state-default"><h3 class="DialogTitleExtras">Available extras:</h3><table class="EventBookingExtras" cellspacing="0" cellpadding="0">';
							for(var i in YAHOO.DC.EventCalendar.extras[calendarId])
								{
									//alert(obj2.extrasInEntry);
									var tempExtras = YAHOO.DC.EventCalendar.extras[calendarId][i];	
									if (obj2.extrasInEntry[i].ExtrasInEntry){
										content += '<tr class="CallToolTip" rel="'+tempExtras.ExtrasDescription+'"><td><span>'+tempExtras.ExtrasName+' ('+YAHOO.DC.EventCalendar.currency[calendarId]+tempExtras.ExtrasPrice+' per night)</span></td><td><input type="checkbox" id="extrasInForm'+i+'" class="extrasInForm'+id+'" ExtrasId="'+i+'" ';
										
										 if (obj)
											if(isExtrasInForm(obj, obj2.extrasInEntry[i].ExtrasId))
												content += 'checked';
										content += '/></td></tr>';
									}
								}
							content += '</table></div>';
						}
					}
				}
			
			//Insert the price here...
				content += '<div class="EventBookingExtras PriceofBooking ui-corner-all ui-state-default"><h3 class="DialogTitleExtras">Price of booking:</h3>';
				content += '<table class="EventBookingPrice" cellspacing="0" cellpadding="0">';
					content += '<tr>';
						content += '<td id="priceTD'+id+'"></td>';
					content += '</tr>';
				
				// If they've already paid, then...
				if(obj)
					{
					content += '<tr>';
						content += '<td class="paid_td">Paid already:</td>';
						content += '<td id="paidAlready">'+YAHOO.DC.EventCalendar.currency[calendarId]+(obj.paid?priceIncVat(obj.paidAmount).toFixed(2):'0.00')+'</td>';
					content += '</tr>';
					}
					
					
					
				content += '</table>';
				
			content += '</td>';
			
			content += '<td width="50%">';
				
				content += '<div class="EventBookingForm"><h3 class="DialogTitleExtras">Your details:</h3><table class="EventBookingForm">';
				content += '<tr><td><span class="g3label">First name:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,custom[onlyLetter],length[0,100]]" id="CBfirstName_'+id+'"></td></tr>';
				content += '<tr><td><span class="g3label">Last name:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,custom[onlyLetter],length[0,100]]" id="CBlastName_'+id+'"></td></tr>';
				content += '<tr><td><span class="g3label">Address:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,length[0,500]]" id="CBaddress_'+id+'"></td></tr>';
				content += '<tr><td><span class="g3label">City:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,custom[onlyLetter],length[0,100]]" id="CBcity_'+id+'"></td></tr>';
				content += '<tr><td><span class="g3label">Postcode:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,length[0,10]]" id="CBpostCode_'+id+'"></td></tr>';
				content += '<tr><td><span class="g3label">Telephone:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,custom[onlyNumber],length[0,20]]" id="CBtelephone_'+id+'"></td></tr>';
				content += '<tr><td><span class="g3label">Email:</span></td><td class="BookingFormValue"><input type="text" class="validate[required,custom[email],length[0,200]]" id="CBemail_'+id+'"></td></tr>';
				content += '<tr><td><span class="g3label">Number of people:</span></td><td class="BookingFormValue"><input class="validate[required,custom[onlyNumber],length[0,2]]" type="text" value="1" id="CBnrOfPeople_'+id+'" style="width:60px;"></td></tr>';
				content += '<tr><td><span class="g3label">Additional notes:</span></td><td><textarea class="g3textarea EventBookingForm RoundedCornerB" type="text" id="descriptionEvent_'+id+'" /></textarea></td></tr>';
				content += '</table></div>';
				
				
				
			content += '</td>';
			
			
		content += '</tr>';
	content += '</table>';
	
	content += '</div>';
	content += '<div class="clear"></div>';
	content += '<div class="input_holder"><table cellspacing="0" cellpadding="0" width="100%"><tr>';
	
		content += '<td align="left"><a title="Cancel" class="CancelBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#subDialog\').dialog(\'close\');$.unblockUI();"><span class="ui-icon ui-icon-arrowreturnthick-1-w"></span>Cancel</a></td>';
		content += '<td align="right"><a title="Make booking" class="MakeBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" id="bookingBtn_'+id+'" onclick="javascript:validateAndSave()"><span class="ui-icon ui-icon-circle-check"></span>Make booking</a></td>';
		
	content += '</table></div>';
	content += '</form></div>';
		
	YAHOO.DC.EventCalendar.showAddEventSubDialog(title,content,660);
	
	$('#CBnrOfPeople_'+id).change(function(){
		showPrice(calendarId,YAHOO.DC.EventCalendar.admin[calendarId],$('#CBnrOfPeople_'+id).val());
	});
	$('#form'+id).validationEngine();
	
    if (eventId>=0 )
        showPrice(calendarId,YAHOO.DC.EventCalendar.admin[calendarId],1, 0);
	
	$('.extrasInForm'+id).change(function(){
		showPrice(calendarId,YAHOO.DC.EventCalendar.admin[calendarId],$('#CBnrOfPeople_'+id).val());
	});
		
}

YAHOO.DC.EventCalendar.checkIfExtrasExist = function(obj){
	var count=0;
	for(var i in obj.extrasInEntry){
		if (obj.extrasInEntry[i].ExtrasInEntry)
			count++;
	}
	if(count>0)
		return true;
	else 
		return false;
}

YAHOO.DC.EventCalendar.viewBookingClient = function(isConfirmation)
//--------------------------------------------------------------
{
	var calendarId = CalendarId;
	var eventId = YAHOO.DC.EventCalendar.applicantsList[calendarId][0].calendarEntryId;
	var id = YAHOO.DC.EventCalendar.applicantsList[calendarId][0].id;
	var basicPrice;
	var freeSpaces;
	var index = YAHOO.DC.EventCalendar.getEventId(calendarId,eventId);
	var obj2 = YAHOO.DC.EventCalendar.events[calendarId][index];
	var obj = YAHOO.DC.EventCalendar.applicantsList[calendarId][0];
	
	
	showPrice = function(calendarId,admin,numberOfPeople, discount)
	{
		var body_in = '';
		var VAT = YAHOO.DC.EventCalendar.vat[calendarId];
		var finalPrice;
		if(!numberOfPeople)
			numberOfPeople = 1;
		else
			numberOfPeople = parseInt(numberOfPeople);
		var finalPrice = obj2.price;
		body_in += '<table>';
		
		body_in += '<tr><td class="label_td">Price:</td><td>'+YAHOO.DC.EventCalendar.currency[calendarId]+finalPrice.toFixed(2)+'</td></tr>';
		var extrasPrice = 0;
		$('.extrasInForm'+id).each(function(){
			var extrasId = $(this).attr('extrasId');
			if($('#extrasInForm'+extrasId+':checked').length > 0){
				var tt = (YAHOO.DC.EventCalendar.extras[calendarId][extrasId].ExtrasPrice*numberOfPeople);	
				extrasPrice += tt;
				body_in += '<tr><td class="label_td">'+numberOfPeople+' x '+YAHOO.DC.EventCalendar.extras[calendarId][extrasId].ExtrasName+'</td><td>'+YAHOO.DC.EventCalendar.currency[calendarId]+tt.toFixed(2)+'</td></tr>';	
			}
		});
		finalPrice = finalPrice * numberOfPeople;
		finalPrice += extrasPrice;
		
		body_in += '<tr><td class="label_td">Price excl. tax:</td><td class="price_td">'+YAHOO.DC.EventCalendar.currency[calendarId]+(finalPrice).toFixed(2)+'</td></tr>';
		if(admin){
			if(discount == undefined)
				discount = parseFloat($('#CBdiscount'+id).val());
			body_in += '<tr><td class="label_td">Discount:</td><td class="price_td">'+YAHOO.DC.EventCalendar.currency[calendarId]+''+discount.toFixed(2)+'</td></tr>';
			finalPrice -= parseFloat(discount);
			body_in += '<tr><td class="label_td">After discount:</td><td class="price_td">'+YAHOO.DC.EventCalendar.currency[calendarId]+finalPrice.toFixed(2)+'</td></tr>';
		}
		var priceVAT = (finalPrice*VAT)/100;
		body_in += '<tr><td class="label_td">Tax:</td><td class="price_td">'+YAHOO.DC.EventCalendar.currency[calendarId]+(priceVAT).toFixed(2)+'</td></tr>';
		body_in += '<tr><td class="label_td">Total price:</td><td class="price_td"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+'<span id="displayPrice">'+(finalPrice+priceVAT).toFixed(2)+'</span></td></tr>'
		body_in += '</table>';
		
		$('#priceTD').html(body_in);
	}
	
	getPrice = function(applicant)
	{
		var body_in = '';
		var VAT = YAHOO.DC.EventCalendar.vat[calendarId];
		var finalPrice;
		
		var finalPrice = obj2.price;
		var extrasPrice = 0;
		for(var i in applicant.extrasInForm){
			var extrasId = applicant.extrasInForm[i].ExtrasId;
			var tempIndex = -1;
			if(applicant.extrasInForm[i].ExtrasInForm){
				for(var k in YAHOO.DC.EventCalendar.extras[calendarId]){
					if(applicant.extrasInForm[i].ExtrasId == YAHOO.DC.EventCalendar.extras[calendarId][k].ExtrasId)
						tempIndex = k;
				}
				var tt = (YAHOO.DC.EventCalendar.extras[calendarId][tempIndex].ExtrasPrice*applicant.numberOfPeople);	
				extrasPrice += tt;
			}
		}
		finalPrice = finalPrice * applicant.numberOfPeople;
		finalPrice += extrasPrice;
		
		
		return finalPrice;
	}
	
	priceIncVat = function(price){
		return priceVAT = ((price*YAHOO.DC.EventCalendar.vat[calendarId])/100)+price;
	}
	init = function(eventId, id)
	{
		freeSpaces = obj2.vacancies - obj2.registered
		
		showPrice(calendarId,YAHOO.DC.EventCalendar.admin[calendarId],obj.numberOfPeople);
		
		basicPrice = obj2.price;
	}
	
	isExtrasInForm = function(applicant, id){
		for(var i in applicant.extrasInForm){
			if(applicant.extrasInForm[i].ExtrasId == id)
				return applicant.extrasInForm[i].ExtrasInForm;
		}
	}
	
	priceIncVat = function(price){
		return priceVAT = ((price*YAHOO.DC.EventCalendar.vat[calendarId])/100)+price;
	}
	
	var title = 'Event Booking details';
	var interval;
	var range;
	
	range = YAHOO.DC.EventCalendar.events[calendarId][YAHOO.DC.EventCalendar.getEventId(calendarId, eventId)].range;
	
	var content;
	var startDate = new Date(Date.parse(range.split("-")[0])).format('d mmm yyyy');//new Date.parse();
	var endDate = new Date(Date.parse(range.split("-")[1])).format('d mmm yyyy');//new Date.parse();
	content = '<div id="divAddEvent">';
	content += '<form id="form'+id+'" method="post" action="">';
	content += '<div id="fl" class="fl wide">';
	
	content += '<h1 class="DialogTitle noTopMargin">'+YAHOO.DC.EventCalendar.roomName[calendarId]+' - Booking confirmation</h1>';
	content += '<h2 class="DialogTitleDates ui-state-active">'+startDate+' <span class="separatorSpan">to</span> '+endDate+'</h2>';
	
	content += '<table class="add_edit_extras_table"><tr><td class="add_edit_extras_table_left greyed_out" width="25%">';
	
	if(YAHOO.DC.EventCalendar.checkIfExtrasExist(obj2))
	{
		content += '<table><tr><td colspan="2" class="extras_arrow greyed_out"><strong>Selected extras:</strong></td></tr>'
		
		for(var i in YAHOO.DC.EventCalendar.extras[calendarId])
				{
					var tempExtras = YAHOO.DC.EventCalendar.extras[calendarId][i];	
					if (obj2.extrasInEntry[i].ExtrasInEntry){
						content += '<tr class="CallToolTip" rel="'+tempExtras.ExtrasDescription+'"><td class="list_td"><span>'+tempExtras.ExtrasName+' ('+YAHOO.DC.EventCalendar.currency[calendarId]+tempExtras.ExtrasPrice+' per night)</span></td><td><input type="checkbox" id="extrasInForm'+i+'" class="extrasInForm'+id+'" ExtrasId="'+i+'" disabled ';
						 if (obj)
							if(isExtrasInForm(obj, obj2.extrasInEntry[i].ExtrasId))
								content += 'checked';
						content += '/></td></tr>';
					}
				}
		content += '</table>'
	}
	
	content += '</td><td class="add_edit_extras_table_right" width="30%"><table width="100%"><tr><td class="label_td">Price:</td></tr><tr><td colspan="2" id="priceTD" width="100%"></td></tr>';
	if(obj)
	content += '<tr><td class="label_td">Paid already:</td><td class="paid_td">'+YAHOO.DC.EventCalendar.currency[calendarId]+(obj.paid?priceIncVat(obj.paidAmount).toFixed(2):'0.00')+'</td></tr>';
	
				
	content += '</table></td><td class="add_edit_extras_table_right details"><table><tr><td class="label_td">Booking details:</td></tr><tr><td class="label_td">First name:</td><td class="right_td">'+obj.firstName+'</td></tr>';
	content += '<tr><td class="label_td">Last name:</td><td class="right_td">'+obj.lastName+'</td></tr>';
	content += '<tr><td class="label_td">Address:</td><td class="right_td">'+obj.address+'</td></tr>';
	content += '<tr><td class="label_td">City:</td><td class="right_td">'+obj.city+'</td></tr>';
	content += '<tr><td class="label_td">Postcode:</td><td class="right_td">'+obj.postCode+'</td></tr>';
	content += '<tr><td class="label_td">Telephone:</td><td class="right_td">'+obj.telephone+'</td></tr>';
	content += '<tr><td class="label_td">Email:</td><td class="right_td">'+obj.email+'</td></tr>';
	content += '<tr><td class="label_td">Number of people:</td><td class="right_td">'+obj.numberOfPeople+'</td></tr></table></td></table>';
	content += '</table><tr><td></td></tr><tr><td colspan="2"><span class="extras_table booking_form greyed_out">'+obj.comment+'</span></td></tr></table>';
	content += '</div><div style="clear:both"></div>';
	content += '<div class="input_holder">';
		content += '<table cellspacing="0" cellpadding="0" width="100%"><tr>';
				//content += '<input type="button" id="printBtn'+id+'" onclick="javascript:$(\'#fl\').printArea(\'Event Booking Info\')" class="calendar_button ui-button button-action-blue ui-corner-all" value="Print">';
				if(isConfirmation){
					content += '<td align="left">';
						content += '<table cellspacing="0" cellpadding="0" width="100%">';
							content += '<tr>';
								content += '<td><a title="Cancel" class="CancelBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#subDialog\').dialog(\'close\');$.unblockUI();" style="margin-right:10px;"><span class="ui-icon ui-icon-arrowreturnthick-1-w"></span>Cancel</a>';
								content += '<a title="Print booking details" id="printBtn'+id+'" class="CancelBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#fl\').printArea(\'Event Booking Info\')"><span class="ui-icon ui-icon-print"></span>Print</a></td>';
							content += '</tr>';
						content += '</table>';
					content += '</td>';
					content += '<td align="right"><a title="Confirm" id="confirmPayment" class="MakeBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#subDialog\').dialog(\'close\');$.unblockUI();"><span class="ui-icon ui-icon-circle-check"></span>Confirm payment</a></td><td width="10"></td>';
				}
				else
				{
					content += '<td align="left"><a title="Close" class="CancelBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#subDialog\').dialog(\'close\');$.unblockUI();"><span class="ui-icon ui-icon-close"></span>Close</a>&nbsp;';
					content += '<a title="Print booking details" id="printBtn'+id+'" class="CancelBookingButton fg-button ui-state-default fg-button-icon-left ui-corner-all" onclick="javascript:$(\'#fl\').printArea(\'Event Booking Info\')"><span class="ui-icon ui-icon-print"></span>Print</a></td>';
				}
	
				content += '</tr>';
			content += '</table>';
		content += '</div>';
	content += '</form>';
	content += '</div>';
		
	YAHOO.DC.EventCalendar.showAddEventSubDialog(title,content,800);
	
    if (eventId>=0 )
        init(eventId, id);
	
		
}


$.maxZIndex = $.fn.maxZIndex = function(opt) {
    var def = { inc: 10, group: "*" };
    $.extend(def, opt);
    var zmax = 0;
    $(def.group).each(function() {
        var cur = parseInt($(this).css('z-index'));
        zmax = cur > zmax ? cur : zmax;
    });
    if (!this.jquery)
        return zmax;

    return this.each(function() {
        zmax += def.inc;
        $(this).css("z-index", zmax);
    });
}
var isAutorized = false;
checkPayPalAutorization = function(token){
	isAutorized = false;
	$.getJSON(pathServer+"/ajax_client.ashx?action=checkPayPalAutorization&jsoncallback=?",
		{token: token},
		function(rs){
			if(rs == true && !isAutorized){
				isAutorized = true;
				//$.blockUI({ message: '<strong>Payment in progress...</strong>' }); 
				//add confirmation requester
				if(YAHOO.DC.EventCalendar.roomType[calendarId] == 6)
					YAHOO.DC.EventCalendar.viewBookingClient(true);
				else
					YAHOO.DC.EventCalendar.viewBooking(true);
				//--------------
				$('#confirmPayment').unbind('click').click(function(){
					doPayPalPayment(token);
					$('#subDialog').dialog('close');
				});
					
			}
			else if (isAutorized == false)	
				checkPayPalAutorization(token);
		}
	);
}
doPayPalPayment = function(token){
	var rs = "false";
	$.blockUI({ message: '<strong>Payment in progress...</strong>' }); 
	$.getJSON(pathServer+"/ajax_client.ashx?action=doPayPalPayment&jsoncallback=?",
		{token: token},
		function(response){
			YAHOO.DC.EventCalendar.initData(calendarId);
			$.unblockUI();
			setTimeout(function(){// delay to hide panel and show blockUI
				if(response.Ack == 0)
					alert('We have recieved confirmation of your payment. Thank you for your booking.');
				else
					alert('Your payment wasn\'t successful. Please contact us for further information.');
			},1000);
		}
	);
}
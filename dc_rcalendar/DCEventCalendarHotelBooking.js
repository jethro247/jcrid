 /*
 * jQuery UI selectmenu
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */

(function($) {

$.widget("ui.selectmenu", {
	_init: function() {
		var self = this, o = this.options;
		
		//quick array of button and menu id's
		this.ids = [this.element.attr('id') + '-' + 'button', this.element.attr('id') + '-' + 'menu'];
		
		//define safe mouseup for future toggling
		this._safemouseup = true;
		
		//create menu button wrapper
		this.newelement = $('<a class="'+ this.widgetBaseClass +' ui-widget ui-state-default ui-corner-all" id="'+this.ids[0]+'" role="button" href="#" aria-haspopup="true" aria-owns="'+this.ids[1]+'"></a>')
			.insertAfter(this.element);
		
		//transfer tabindex
		var tabindex = this.element.attr('tabindex');
		if(tabindex){ this.newelement.attr('tabindex', tabindex); }
		
		//save reference to select in data for ease in calling methods
		this.newelement.data('selectelement', this.element);
		
		//menu icon
		this.selectmenuIcon = $('<span class="'+ this.widgetBaseClass +'-icon ui-icon"></span>')
			.prependTo(this.newelement)
			.addClass( (o.style == "popup")? 'ui-icon-triangle-2-n-s' : 'ui-icon-triangle-1-s' );	

			
		//make associated form label trigger focus
		$('label[for='+this.element.attr('id')+']')
			.attr('for', this.ids[0])
			.bind('click', function(){
				self.newelement[0].focus();
				return false;
			});	

		//click toggle for menu visibility
		this.newelement
			.bind('mousedown', function(event){
				self._toggle(event);
				//make sure a click won't open/close instantly
				if(o.style == "popup"){
					self._safemouseup = false;
					setTimeout(function(){self._safemouseup = true;}, 300);
				}	
				return false;
			})
			.bind('click',function(){
				return false;
			})
			.keydown(function(event){
				var ret = true;
				switch (event.keyCode) {
					case $.ui.keyCode.ENTER:
						ret = true;
						break;
					case $.ui.keyCode.SPACE:
						ret = false;
						self._toggle(event);	
						break;
					case $.ui.keyCode.UP:
					case $.ui.keyCode.LEFT:
						ret = false;
						self._moveSelection(-1);
						break;
					case $.ui.keyCode.DOWN:
					case $.ui.keyCode.RIGHT:
						ret = false;
						self._moveSelection(1);
						break;	
					case $.ui.keyCode.TAB:
						ret = true;
						break;	
					default:
						ret = false;
						self._typeAhead(event.keyCode, 'mouseup');
						break;	
				}
				return ret;
			})
			.bind('mouseover focus', function(){ 
				$(this).addClass(self.widgetBaseClass+'-focus ui-state-hover'); 
			})
			.bind('mouseout blur', function(){  
				$(this).removeClass(self.widgetBaseClass+'-focus ui-state-hover'); 
			});
		
		//document click closes menu
		$(document)
			.mousedown(function(event){
				self.close(event);
			});

		//change event on original selectmenu
		this.element
			.click(function(){ this._refreshValue(); })
			.focus(function(){ this.newelement[0].focus(); });
		
		//create menu portion, append to body
		var cornerClass = (o.style == "dropdown")? " ui-corner-bottom" : " ui-corner-all"
		this.list = $('<ul class="' + self.widgetBaseClass + '-menu ui-widget ui-widget-content'+cornerClass+' ui-state-active" aria-hidden="true" role="listbox" aria-labelledby="'+this.ids[0]+'" id="'+this.ids[1]+'"></ul>').appendTo('body');				
		
		//serialize selectmenu element options	
		var selectOptionData = [];
		this.element
			.find('option')
			.each(function(){
				selectOptionData.push({
					value: $(this).attr('value'),
					text: self._formatText(jQuery(this).text()),
					selected: $(this).attr('selected'),
					classes: $(this).attr('class'),
					parentOptGroup: $(this).parent('optgroup').attr('label')
				});
			});		
				
		//active state class is only used in popup style
		var activeClass = (self.options.style == "popup") ? " ui-state-active" : "";
		
		//write li's
		for(var i in selectOptionData){
			var thisLi = $('<li role="presentation"><a href="#" tabindex="-1" role="option" aria-selected="false">'+ selectOptionData[i].text +'</a></li>')
				.data('index',i)
				.addClass(selectOptionData[i].classes)
				.data('optionClasses', selectOptionData[i].classes|| '')
				.mouseup(function(event){
						if(self._safemouseup){
							var changed = $(this).data('index') != self._selectedIndex();
							self.value($(this).data('index'));
							self.select(event);
							if(changed){ self.change(event); }
							self.close(event,true);
						}
					return false;
				})
				.click(function(){
					return false;
				})
				.bind('mouseover focus', function(){ 
					self._selectedOptionLi().addClass(activeClass); 
					self._focusedOptionLi().removeClass(self.widgetBaseClass+'-item-focus ui-state-hover'); 
					$(this).removeClass('ui-state-active').addClass(self.widgetBaseClass + '-item-focus ui-state-hover'); 
				})
				.bind('mouseout blur', function(){ 
					if($(this).is( self._selectedOptionLi() )){ $(this).addClass(activeClass); }
					$(this).removeClass(self.widgetBaseClass + '-item-focus ui-state-hover'); 
				});
				
			//optgroup or not...
			if(selectOptionData[i].parentOptGroup){
				var optGroupName = self.widgetBaseClass + '-group-' + selectOptionData[i].parentOptGroup;
				if(this.list.find('li.' + optGroupName).size()){
					this.list.find('li.' + optGroupName + ':last ul').append(thisLi);
				}
				else{
					$('<li role="presentation" class="'+self.widgetBaseClass+'-group '+optGroupName+'"><span class="'+self.widgetBaseClass+'-group-label">'+selectOptionData[i].parentOptGroup+'</span><ul></ul></li>')
						.appendTo(this.list)
						.find('ul')
						.append(thisLi);
				}
			}
			else{
				thisLi.appendTo(this.list);
			}
			
			//this allows for using the scrollbar in an overflowed list
			this.list.bind('mousedown mouseup', function(){return false;});
			
			//append icon if option is specified
			if(o.icons){
				for(var j in o.icons){
					if(thisLi.is(o.icons[j].find)){
						thisLi
							.data('optionClasses', selectOptionData[i].classes + ' ' + self.widgetBaseClass + '-hasIcon')
							.addClass(self.widgetBaseClass + '-hasIcon');
						var iconClass = o.icons[j].icon || "";
						
						thisLi
							.find('a:eq(0)')
							.prepend('<span class="'+self.widgetBaseClass+'-item-icon ui-icon '+iconClass + '"></span>');
					}
				}
			}
		}	
		
		//add corners to top and bottom menu items
		this.list.find('li:last').addClass("ui-corner-bottom");
		if(o.style == 'popup'){ this.list.find('li:first').addClass("ui-corner-top"); }
		
		//transfer classes to selectmenu and list
		if(o.transferClasses){
			var transferClasses = this.element.attr('class') || ''; 
			this.newelement.add(this.list).addClass(transferClasses);
		}
		
		//original selectmenu width
		var selectWidth = this.element.width();
		
		//set menu button width
		this.newelement.width( (o.width) ? o.width : selectWidth);
		
		//set menu width to either menuWidth option value, width option value, or select width 
		if(o.style == 'dropdown'){ this.list.width( (o.menuWidth) ? o.menuWidth : ((o.width) ? o.width : selectWidth)); }
		else { this.list.width( (o.menuWidth) ? o.menuWidth : ((o.width) ? o.width - o.handleWidth : selectWidth - o.handleWidth)); }	
		
		//set max height from option 
		if(o.maxHeight && o.maxHeight < this.list.height()){ this.list.height(o.maxHeight); }	
		
		//save reference to actionable li's (not group label li's)
		this._optionLis = this.list.find('li:not(.'+ self.widgetBaseClass +'-group)');
				
		//transfer menu click to menu button
		this.list
			.keydown(function(event){
				var ret = true;
				switch (event.keyCode) {
					case $.ui.keyCode.UP:
					case $.ui.keyCode.LEFT:
						ret = false;
						self._moveFocus(-1);
						break;
					case $.ui.keyCode.DOWN:
					case $.ui.keyCode.RIGHT:
						ret = false;
						self._moveFocus(1);
						break;	
					case $.ui.keyCode.HOME:
						ret = false;
						self._moveFocus(':first');
						break;	
					case $.ui.keyCode.PAGE_UP:
						ret = false;
						self._scrollPage('up');
						break;	
					case $.ui.keyCode.PAGE_DOWN:
						ret = false;
						self._scrollPage('down');
						break;
					case $.ui.keyCode.END:
						ret = false;
						self._moveFocus(':last');
						break;			
					case $.ui.keyCode.ENTER:
					case $.ui.keyCode.SPACE:
						ret = false;
						self.close(event,true);
						$(event.target).parents('li:eq(0)').trigger('mouseup');
						break;		
					case $.ui.keyCode.TAB:
						ret = true;
						self.close(event,true);
						break;	
					case $.ui.keyCode.ESCAPE:
						ret = false;
						self.close(event,true);
						break;	
					default:
						ret = false;
						self._typeAhead(event.keyCode,'focus');
						break;		
				}
				return ret;
			});
			
		//selectmenu style
		if(o.style == 'dropdown'){
			this.newelement
				.addClass(self.widgetBaseClass+"-dropdown");
			this.list
				.addClass(self.widgetBaseClass+"-menu-dropdown");	
		}
		else {
			this.newelement
				.addClass(self.widgetBaseClass+"-popup");
			this.list
				.addClass(self.widgetBaseClass+"-menu-popup");	
		}
		
		//append status span to button
		this.newelement.prepend('<span class="'+self.widgetBaseClass+'-status">'+ selectOptionData[this._selectedIndex()].text +'</span>');
		
		//hide original selectmenu element
		this.element.hide();
		
		//transfer disabled state
		if(this.element.attr('disabled') == true){ this.disable(); }
		
		//update value
		this.value(this._selectedIndex());
	},
	destroy: function() {
		this.element.removeData(this.widgetName)
			.removeClass(this.widgetBaseClass + '-disabled' + ' ' + this.namespace + '-state-disabled')
			.removeAttr('aria-disabled');
	
		//unbind click on label, reset its for attr
		$('label[for='+this.newelement.attr('id')+']')
			.attr('for',this.element.attr('id'))
			.unbind('click');
		this.newelement.remove();
		this.list.remove();
		this.element.show();	
	},
	_typeAhead: function(code, eventType){
		var self = this;
		//define self._prevChar if needed
		if(!self._prevChar){ self._prevChar = ['',0]; }
		var C = String.fromCharCode(code);
		c = C.toLowerCase();
		var focusFound = false;
		function focusOpt(elem, ind){
			focusFound = true;
			$(elem).trigger(eventType);
			self._prevChar[1] = ind;
		};
		this.list.find('li a').each(function(i){	
			if(!focusFound){
				var thisText = $(this).text();
				if( thisText.indexOf(C) == 0 || thisText.indexOf(c) == 0){
						if(self._prevChar[0] == C){
							if(self._prevChar[1] < i){ focusOpt(this,i); }	
						}
						else{ focusOpt(this,i); }	
				}
			}
		});
		this._prevChar[0] = C;
	},
	_uiHash: function(){
		return {
			value: this.value()
		};
	},
	open: function(event){
		var self = this;
		var disabledStatus = this.newelement.attr("aria-disabled");
		if(disabledStatus != 'true'){
			this._refreshPosition();
			this._closeOthers(event);
			this.newelement
				.addClass('ui-state-active');
			
			this.list
				.appendTo('body')
				.addClass(self.widgetBaseClass + '-open')
				.attr('aria-hidden', false)
				.find('li:not(.'+ self.widgetBaseClass +'-group):eq('+ this._selectedIndex() +') a')[0].focus();	
			if(this.options.style == "dropdown"){ this.newelement.removeClass('ui-corner-all').addClass('ui-corner-top'); }	
			this._refreshPosition();
			this._trigger("open", event, this._uiHash());
		}
	},
	close: function(event, retainFocus){
		if(this.newelement.is('.ui-state-active')){
			this.newelement
				.removeClass('ui-state-active');
			this.list
				.attr('aria-hidden', true)
				.removeClass(this.widgetBaseClass+'-open');
			if(this.options.style == "dropdown"){ this.newelement.removeClass('ui-corner-top').addClass('ui-corner-all'); }
			if(retainFocus){this.newelement[0].focus();}	
			this._trigger("close", event, this._uiHash());
		}
	},
	change: function(event) {
		this.element.trigger('change');
		this._trigger("change", event, this._uiHash());
	},
	select: function(event) {
		this._trigger("select", event, this._uiHash());
	},
	_closeOthers: function(event){
		$('.'+ this.widgetBaseClass +'.ui-state-active').not(this.newelement).each(function(){
			$(this).data('selectelement').selectmenu('close',event);
		});
		$('.'+ this.widgetBaseClass +'.ui-state-hover').trigger('mouseout');
	},
	_toggle: function(event,retainFocus){
		if(this.list.is('.'+ this.widgetBaseClass +'-open')){ this.close(event,retainFocus); }
		else { this.open(event); }
	},
	_formatText: function(text){
		return this.options.format ? this.options.format(text) : text;
	},
	_selectedIndex: function(){
		return this.element[0].selectedIndex;
	},
	_selectedOptionLi: function(){
		return this._optionLis.eq(this._selectedIndex());
	},
	_focusedOptionLi: function(){
		return this.list.find('.'+ this.widgetBaseClass +'-item-focus');
	},
	_moveSelection: function(amt){
		var currIndex = parseInt(this._selectedOptionLi().data('index'), 10);
		var newIndex = currIndex + amt;
		return this._optionLis.eq(newIndex).trigger('mouseup');
	},
	_moveFocus: function(amt){
		if(!isNaN(amt)){
			var currIndex = parseInt(this._focusedOptionLi().data('index'), 10);
			var newIndex = currIndex + amt;
		}
		else { var newIndex = parseInt(this._optionLis.filter(amt).data('index'), 10); }
		
		if(newIndex < 0){ newIndex = 0; }
		if(newIndex > this._optionLis.size()-1){
			newIndex =  this._optionLis.size()-1;
		}
		var activeID = this.widgetBaseClass + '-item-' + Math.round(Math.random() * 1000);
		
		this._focusedOptionLi().find('a:eq(0)').attr('id','');
		this._optionLis.eq(newIndex).find('a:eq(0)').attr('id',activeID)[0].focus();
		this.list.attr('aria-activedescendant', activeID);
	},
	_scrollPage: function(direction){
		var numPerPage = Math.floor(this.list.outerHeight() / this.list.find('li:first').outerHeight());
		numPerPage = (direction == 'up') ? -numPerPage : numPerPage;
		this._moveFocus(numPerPage);
	},
	_setData: function(key, value) {
		this.options[key] = value;
		if (key == 'disabled') {
			this.close();
			this.element
				.add(this.newelement)
				.add(this.list)
					[value ? 'addClass' : 'removeClass'](
						this.widgetBaseClass + '-disabled' + ' ' +
						this.namespace + '-state-disabled')
					.attr("aria-disabled", value);
		}
	},
	value: function(newValue) {
		if (arguments.length) {
			this.element[0].selectedIndex = newValue;
			this._refreshValue();
			this._refreshPosition();
		}
		return this.element[0].selectedIndex;
	},
	_refreshValue: function() {
		var activeClass = (this.options.style == "popup") ? " ui-state-active" : "";
		var activeID = this.widgetBaseClass + '-item-' + Math.round(Math.random() * 1000);
		//deselect previous
		this.list
			.find('.'+ this.widgetBaseClass +'-item-selected')
			.removeClass(this.widgetBaseClass + "-item-selected" + activeClass)
			.find('a')
			.attr('aria-selected', 'false')
			.attr('id', '');
		//select new
		this._selectedOptionLi()
			.addClass(this.widgetBaseClass + "-item-selected"+activeClass)
			.find('a')
			.attr('aria-selected', 'true')
			.attr('id', activeID);
			
		//toggle any class brought in from option
		var currentOptionClasses = this.newelement.data('optionClasses') ? this.newelement.data('optionClasses') : "";
		var newOptionClasses = this._selectedOptionLi().data('optionClasses') ? this._selectedOptionLi().data('optionClasses') : "";
		this.newelement
			.removeClass(currentOptionClasses)
			.data('optionClasses', newOptionClasses)
			.addClass( newOptionClasses )
			.find('.'+this.widgetBaseClass+'-status')
			.html( 
				this._selectedOptionLi()
					.find('a:eq(0)')
					.html() 
			);
			
		this.list.attr('aria-activedescendant', activeID)
	},
	_refreshPosition: function(){	
		//set left value
		this.list.css('left', this.newelement.offset().left);
		
		//set top value
		var menuTop = this.newelement.offset().top;
		var scrolledAmt = this.list[0].scrollTop;
		this.list.find('li:lt('+this._selectedIndex()+')').each(function(){
			scrolledAmt -= $(this).outerHeight();
		});
		
		if(this.newelement.is('.'+this.widgetBaseClass+'-popup')){
			menuTop+=scrolledAmt; 
			this.list.css('top', menuTop); 
		}	
		else { 
			menuTop += this.newelement.height();
			this.list.css('top', menuTop); 
		}
	}
});

$.extend($.ui.selectmenu, {
	getter: "value",
	version: "@VERSION",
	eventPrefix: "selectmenu",
	defaults: {
		transferClasses: true,
		style: 'popup', 
		width: null, 
		menuWidth: null, 
		handleWidth: 26, 
		maxHeight: null,
		icons: null, 
		format: null
	}
});

})(jQuery);
//Mr Site UI Frameset


$(document).ready(function(){
	//all hover and click logic for buttons
	$('a.fg-button[href=#]').live('click',function(){return false;});
	
	$(".fg-button:not(.ui-state-disabled)").live('mouseover', function(){
		$(this).addClass("ui-state-hover"); 
	}).live('mouseout', function(){
		$(this).removeClass("ui-state-hover"); 
	}).live('mousedown', function(){
		$(this).parents('.fg-buttonset-single:first').find(".fg-button.ui-state-active").removeClass("ui-state-active");
		if( $(this).is('.ui-state-active.fg-button-toggleable, .fg-buttonset-multi .ui-state-active') ){ $(this).removeClass("ui-state-active"); }
		else { $(this).addClass("ui-state-active"); }
	}).live('mouseup', function(){
		if(! $(this).is('.fg-button-toggleable, .fg-buttonset-single .fg-button,  .fg-buttonset-multi .fg-button') ){
			$(this).removeClass("ui-state-active");
		}
	});
	
	
	$('.contextMenu UL li').live('mouseover',function(){
		$(this).addClass('ui-context-hover');
		//$(this).removeClass('ui-state-active').addClass('ui-state-hover');
		//$(this).children('a').addClass('ui-state-default');
		//$(this).children().children('span.ui-text').addClass('ui-state-default');
	}).live('mouseout',function(){
		$(this).removeClass('ui-context-hover');
		//$(this).removeClass('ui-state-hover').addClass('ui-state-active');
		//$(this).children('a').removeClass('ui-state-default');
		//$(this).children().children('span.ui-text').removeClass('ui-state-default');
	});
	
	
	//Tab fix for IE's
	
	$('li.BookingToolTabs a, li.BookingToolTabs a span').live('mouseover',function(){
		$(this).parent('li').addClass('ui-state-hover');
	}).live('mouseout',function(){
		$(this).parent('li').removeClass('ui-state-hover');
	});
	
	//Make a booking
	$('a#MakeBookingCTA').live('mouseup', function(){
		$('#tabs').tabs('select',0);
	});
	
	//For the booking tool, use this generic 'live' hover
	$('input#viewCalenfarInfoBtn, input#add_booking, input#CancelBookingBtn, input#SaveBookingBtn, input.MakeBookingBtn, input.CancelBookingBtn, input.PayWithPayPal').live('mouseover', function(){
		$(this).addClass('addHover');
	}).live('mouseout',function(){
		$(this).removeClass('addHover');
	});

});

var pathCalendar = "DC_RCalendar";
var CalendarId;
var showFolder = '';
var groupId = 0;

function initEventCalendar(calendarId,pages,type,admin,lang,m,width,height, folderName, _groupId, _roomId)
{
	YAHOO.DC.EventCalendar.BookingEnabled = true;
	if(m.showBookingButton != undefined && !m.showBookingButton) {
		YAHOO.DC.EventCalendar.BookingEnabled = false;
	}

	if(_groupId != undefined && _groupId != 0)
		groupId = _groupId;
	if(folderName)
		showFolder = folderName;
	$('head').append('<style type="text/css">#'+calendarId+'Container .yui-calendar td.calcell {width:'+(width)+'px !important;height:'+(height)+'px !important;}</style>');
	//$('#calContainer').attr('id',calendarId+'Container');
	CalendarId = calendarId;
	//////config var//////////////
	var mCfg;
    mCfg = {TITLE_DELIMITER1:"",TITLE_DELIMITER2:"",DATE_FIELD_DELIMITER:"",MDY_DAY_POSITION:"",MDY_MONTH_POSITION:"",MDY_YEAR_POSITION:"",START_WEEKDAY:"",OVERLAPPING:0};
    mCfg.TITLE_DELIMITER1 = " ";
    mCfg.TITLE_DELIMITER2 = ", ";
    mCfg.DATE_FIELD_DELIMITER = "/";
    mCfg.MDY_DAY_POSITION = 2;
    mCfg.MDY_MONTH_POSITION = 1;
    mCfg.MDY_YEAR_POSITION = 3;
    mCfg.START_WEEKDAY = 0;
	mCfg.ReservationColor = "#ff0000";
    pagedate = "";  // month/year like this "8/2008"  
    mindate = "";   // month/day/year like this "8/5/2008"
    maxdate = "";   // month/day/year like this "8/15/2008"
    mCfg.OVERLAPPING = 0; 
    /////////////////////////////////////

	YAHOO.DC.EventCalendar.typeCalendar[calendarId] = type;
    YAHOO.DC.EventCalendar.admin[calendarId] = admin;
	YAHOO.DC.EventCalendar.rooms[calendarId] = new Array();
	YAHOO.DC.EventCalendar.folders[calendarId] = new Array();
	YAHOO.DC.EventCalendar.events[calendarId] = new Array();
    YAHOO.DC.EventCalendar._events[calendarId] = new Array();
	YAHOO.DC.EventCalendar.prices[calendarId] = new Array();
	YAHOO.DC.EventCalendar._prices[calendarId] = new Array();
	YAHOO.DC.EventCalendar.colors[calendarId] = new Array();
	YAHOO.DC.EventCalendar.ha[calendarId] = new Array();
	YAHOO.DC.EventCalendar.applicantsList[calendarId] = new Array();
	if(_roomId == 0 || _roomId == undefined) {
		YAHOO.DC.EventCalendar.RoomId[calendarId] = -1;
	} else {
		YAHOO.DC.EventCalendar.RoomId[calendarId] = _roomId;
	}
	$.getJSON(pathServer+"/ajax_client.ashx?action=getSettings&jsoncallback=?", { CalendarId: calendarId, Foldername: folderName, groupId:groupId, roomId:YAHOO.DC.EventCalendar.RoomId[calendarId]},
		function(response){
			if(!response[0].Active) {
				$('div.BookingToolBodyFull').html('<div>Booking Tool is deleted or not active</div>');
				$('div.BookingToolWidget').html('<div>Booking Tool Widget is not active</div>');
				return false;
			}
			YAHOO.DC.EventCalendar.defaultPrice[calendarId] = response[0].DefaultPrice;
			YAHOO.DC.EventCalendar.priceType[calendarId] = response[0].PriceType;
			YAHOO.DC.EventCalendar.currency[calendarId] = response[0].Currency;
			YAHOO.DC.EventCalendar.RoomId[calendarId] = response[0].RoomId;
			YAHOO.DC.EventCalendar.rooms[calendarId] = response[1];
			YAHOO.DC.EventCalendar.folders[calendarId] = response[3];
			YAHOO.DC.EventCalendar.HasCredits = response[0].HasCredits;
			YAHOO.DC.EventCalendar.Active = response[0].Active;
			YAHOO.DC.EventCalendar.colors[calendarId]['ColorBankHoliday'] = response[0].ColorBankHoliday;
			YAHOO.DC.EventCalendar.colors[calendarId]['ColorBookingConfirmed'] = response[0].ColorBookingConfirmed;
			YAHOO.DC.EventCalendar.colors[calendarId]['ColorBookingNotConfirmed'] = response[0].ColorBookingNotConfirmed;
			YAHOO.DC.EventCalendar.colors[calendarId]['ColorCustomReservation'] = response[0].ColorCustomReservation;
			YAHOO.DC.EventCalendar.colors[calendarId]['ColorEvent1'] = response[0].ColorEvent1;
			YAHOO.DC.EventCalendar.colors[calendarId]['ColorEvent2'] = response[0].ColorEvent2;
			YAHOO.DC.EventCalendar.colors[calendarId]['ColorEvent3'] = response[0].ColorEvent3;
			YAHOO.DC.EventCalendar.colors[calendarId]['ColorEvent4'] = response[0].ColorEvent4;
			YAHOO.DC.EventCalendar.colors[calendarId]['ColorEvent5'] = response[0].ColorEvent5;
			YAHOO.DC.EventCalendar.deposit[calendarId] = response[0].Deposit;
			YAHOO.DC.EventCalendar.vat[calendarId] = response[0].VAT;
			YAHOO.DC.EventCalendar.startDate[calendarId] = response[0].StartDate;
			YAHOO.DC.EventCalendar.endDate[calendarId] = response[0].EndDate;
			YAHOO.DC.EventCalendar.RoomCfg[calendarId] = {id:calendarId,pages:pages,cfg:mCfg,language:lang,w:width,h:height,pagedate: pagedate,mindate: response[0].StartDate,maxdate: response[0].EndDate};
			//YAHOO.util.Event.onDOMReady(YAHOO.DC.EventCalendar.init,YAHOO.DC.EventCalendar.RoomCfg[calendarId]);
			//YAHOO.DC.EventCalendar.initData(calendarId);
			// YAHOO.DC.EventCalendar.BookingEnabled = YAHOO.DC.EventCalendar.HasCredits && YAHOO.DC.EventCalendar.Active && YAHOO.DC.EventCalendar.BookingEnabled;

			YAHOO.DC.EventCalendar.init(YAHOO.DC.EventCalendar.RoomCfg[calendarId]);
	});
}

YAHOO.namespace("DC.EventCalendar");
YAHOO.DC.EventCalendar.typeCalendar = new Array();
YAHOO.DC.EventCalendar.colors = new Array();
YAHOO.DC.EventCalendar.admin =  new Array();
YAHOO.DC.EventCalendar.events = new Array();
YAHOO.DC.EventCalendar._events = new Array();
YAHOO.DC.EventCalendar.RoomId = new Array();
YAHOO.DC.EventCalendar.roomType = new Array();
YAHOO.DC.EventCalendar.prices = new Array();
YAHOO.DC.EventCalendar._prices = new Array();
YAHOO.DC.EventCalendar.rooms = new Array();
YAHOO.DC.EventCalendar.folders = new Array();
YAHOO.DC.EventCalendar.roomName = new Array();
YAHOO.DC.EventCalendar.folderName = new Array();
YAHOO.DC.EventCalendar.numberOfRooms = new Array();
YAHOO.DC.EventCalendar.roomDescription = new Array();
YAHOO.DC.EventCalendar.extras = new Array();
YAHOO.DC.EventCalendar.ha = new Array();
YAHOO.DC.EventCalendar.pricesLoaded = false;
YAHOO.DC.EventCalendar.defaultPrice = new Array();
YAHOO.DC.EventCalendar.priceType = new Array();
YAHOO.DC.EventCalendar.currency = new Array();
YAHOO.DC.EventCalendar.deposit = new Array();
YAHOO.DC.EventCalendar.vat = new Array();
YAHOO.DC.EventCalendar.applicantsList = new Array();
YAHOO.DC.EventCalendar.calendarArray = new Array();
YAHOO.DC.EventCalendar.RoomCfg = new Array();
YAHOO.DC.EventCalendar.startDate = new Array();
YAHOO.DC.EventCalendar.endDate = new Array();
YAHOO.DC.EventCalendar.onClickEvent = function(args) {}

YAHOO.DC.EventCalendar.configLanguage = function(calendarId,lang){
    var ms,	ml, wc,ws, wm, wl;
	var cal = YAHOO.DC.EventCalendar.calendarArray[calendarId];

	switch(lang){
		case "DE":
			ms = ["Jan", "Feb", "M&auml;r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
			ml = ["Januar", "Februar", "M&auml;rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
			wc = ["S", "M", "D", "M", "D", "F", "S"];
			ws = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
			wm = ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"];
			wl = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

		break;
		case "SP":
			ms = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
			ml = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
			wc = ["D", "L", "M", "M", "J", "V", "S"];
			ws = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
			wm = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
			wl = ["Domingo", "Lunes", "Martes", "Mi&eacute;rcoles", "Jueves", "Viernes", "S&acute;bado"];

		break;
		case "FR":
			ms = ["Jan", "F&eacute;v", "Mar", "Avr", "Mai", "Jui", "Jui", "Ao&ucirc;", "Sep", "Oct", "Nov", "D&eacute;c"];
			ml = ["Janvier", "F&eacute;vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao&ucirc;t", "Septembre", "Octobre", "Novembre", "D&eacute;cembre"];
			wc = ["D", "L", "M", "M", "J", "V", "S"];
			ws = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];
			wm = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
			wl = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

		break;
		case "IT":
			ms = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Aug", "Set", "Ott", "Nov", "Dic"];
			ml = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
			wc = ["D", "L", "M", "M", "G", "V", "S"];
			ws = ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"];
			wm = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
			wl = ["Domenica", "Luned&igrave;", "Marted&igrave;", "Mercoled&igrave;", "Gioved&igrave;", "Venerd&igrave;", "Sabato"];

		break;
		case "PT":
			ms = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
			ml = ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
			wc = ["D", "S", "T", "Q", "Q", "S", "S"];
			ws = ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"];
			wm = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b"];
			wl = ["Domingo", "Seg", "Ter", "Quarta", "Qui", "Sex", "S&aacute;bado"];

		break;
		default:
			return;
		break;
	}

	cal.cfg.setProperty("MONTHS_SHORT", ms);
	cal.cfg.setProperty("MONTHS_LONG", ml);
    cal.cfg.setProperty("WEEKDAYS_1CHAR", wc);
	cal.cfg.setProperty("WEEKDAYS_SHORT", ws);
	cal.cfg.setProperty("WEEKDAYS_MEDIUM",wm);
	cal.cfg.setProperty("WEEKDAYS_LONG",  wl);
	YAHOO.DC.EventCalendar.calendarArray[calendarId] = cal;
}
YAHOO.DC.EventCalendar.init = function(config ) {
	if(arguments.length > 2) config = arguments[2];
	calendarId = config.id;
	pages = config.pages;
	language = config.language;
	var content = '';
	var nameContainer = calendarId+"ContainerAdmin";
	
	
	content += '<div id="CalendarManager" class="ui-widget-content ui-corner-left">';
	if (YAHOO.DC.EventCalendar.rooms[calendarId].length > 1 && (showFolder.split(',')[1] == undefined || showFolder.split(',')[1] == ''))
	{
		//If they've selected a widget style Booking tool, then we need to build it slightly different,
		//Starting with the Room Selector dropdown.
		if ($('input.thisBT').attr('thisbt')== 'BTWidget') content += '<div class="RoomSelectorContainer"><span class="RoomSelectorDropdown"><select id="RoomSelector" class="g3select RoundedCornerB"></select></span><div class="clear"></div></div>';
	}
	content += '</div>';
	content += '<div id="tabs" class="ui-tabs ui-widget ui-widget-content ui-corner-all">';
	content += '<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">';
	content += '<li id="FirstTab" class="BookingToolTabs ui-state-default ui-corner-top ui-tabs-selected ui-state-active"><a class="MakeBooking" href="#tabs-2"><span class="ui-icon ui-icon-calendar"></span><span class="TabText">Availability</span></a></li>';
	content += '<li id="SecondTab" class="BookingToolTabs ui-state-default ui-corner-top"><a class="BookingInformation" href="#tabs-1"><span class="ui-icon ui-icon-info"></span><span class="TabText">Loading...</span></a></li>';
	
	
	//If they have a folder of calendard and want to display it, then we need to 
	if (YAHOO.DC.EventCalendar.rooms[calendarId].length > 1 && (showFolder.split(',')[1] == undefined || showFolder.split(',')[1] == ''))
	{
		if ($('input.thisBT').attr('thisbt')== 'BTBody') content += '<select id="RoomSelector" class="g3select RoundedCornerB"></select>';
	}
	//content += '<li id="ThirdTab"><a href="#tabs-3">Details</a></li>';
	content += '</ul>';
	content += '<div class="BookingInformation ui-tabs-panel ui-widget-content ui-corner-bottom" id="tabs-1">';
		if ($('input.thisBT').attr('thisBT')== 'BTWidget')
		{
			content += '<div class="WidgetBookingTool">';
				content += '<h2 class="SelectCalendarHeader"><span class="CalendarTitle">&nbsp;</span><span class="MakeBooking">Availability</span></h2><div class="clear"></div>';
				content += '<div id="CalendarShortDescription">';
				content += '<div class="ShortDescriptionCopy"></div>';
				content += '<div class="ShortDescriptionImageExtras">';
						content += '<div class="ShortDescriptionImage"></div>';
						content += '<div class="ShortDescriptionExtras"></div>';
					content += '</div>';
				content += '<div class="clear"></div></div>';
			content += '</div>';
		}
		else
		{
			content += '<div class="BodyBookingTool">';
				content += '<h2 class="SelectCalendarHeader"><span class="CalendarTitle">&nbsp;</span><span class="MakeBooking">Availability</span></h2><div class="clear"></div>';
				content += '<div id="CalendarShortDescription">';
					content += '<div class="ShortDescriptionCopy"></div>';
					content += '<div class="ShortDescriptionImageExtras">';
						content += '<div class="ShortDescriptionImage"></div>';
						content += '<div class="ShortDescriptionExtras"></div>';
					content += '</div>';
				content += '<div class="clear"></div></div>';
			content += '</div>';
		}
	content += '</div>';
	content += '<div class="MakeBooking ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hidden ui-tabs-hide" id="tabs-2">';
	content += '<h2 class="SelectCalendarHeader"><span class="CalendarTitle">&nbsp;</span></h2><div class="clear"></div>';
	content += '<div class="sitewidget_i">'
	if ($('input.ThisBookingToolStyle').attr('ThisBookingToolStyle') == 'DefaultStyle')
	{
		//If they select DefaultStyle, then we go with the UI rolled theme...
		content += '<div id="CalendarEditor">';
	}
	else
	{
		//Else we use our own styling..?
		content += '<div id="CalendarEditor">';
	}

	if(YAHOO.DC.EventCalendar.rooms[calendarId] != undefined)
		content += '<div class="content"><div class="addEventDivTitle"></div><div id="'+calendarId+'tabs"><div id="'+calendarId+'tab1"></div></div><div class="clear"></div></div>';
	content += '</div><div class="clear"></div></div>';
	content += '</div>';
	//content += '<div id="tabs-3">';
	//content += '</div>';
	content += '</div><div class="clear"></div>';

	$('#'+calendarId+'Container').html(content);
	if(YAHOO.DC.EventCalendar.rooms[calendarId] != undefined){
		var obj2 = $('#'+calendarId+'tab1');
		obj2.html('<div id="tab1CalendarContainer"><div id="'+nameContainer+'"></div></div><div id="'+calendarId+'addEventDiv" class="addEventDiv ui-helper-clearfix"></div>');
		var obj = $('#'+calendarId+'addEventDiv');
		//if(YAHOO.DC.EventCalendar.roomType[calendarId] != 6)
		
		//obj.html('<input type="button" class="ui-button button-action-blue" id="add_booking" value="Add booking"/>');
		if(YAHOO.DC.EventCalendar.BookingEnabled) {
			obj.html('<a href="#" id="add_booking" class="fg-button ui-state-default fg-button-icon-left ui-corner-all" title="Add booking"><span class="ui-icon ui-icon-squaresmall-plus"></span>Add booking</a>');
		}
		/*
		if ($('input.thisBT').attr('thisBT')== 'BTWidget')
			obj.append('<a href="#" id="viewCalenfarInfoBtn" class="fg-button ui-state-default fg-button-icon-left ui-corner-all" title="View info"><span class="ui-icon ui-icon-circle-zoomin"></span>View info</a><div class="clear"></div>');
			//obj.append('<input type="button" class="ui-button button-action-blue" id="viewCalenfarInfoBtn" value="View info"/><div class="clear"></div>');
		*/
	}
	
	//tabs generator
	YAHOO.DC.EventCalendar.calendarArray[calendarId] = new YAHOO.DC.EventCalendar.IntervalCalendar(nameContainer, {pages:pages, pagedate: config.pagedate, mindate: config.mindate, maxdate: config.maxdate});
	// init calendar
    
	var cal = YAHOO.DC.EventCalendar.calendarArray[calendarId];
	YAHOO.DC.EventCalendar.configLanguage(calendarId,language);
	cal.mCfg = config.cfg;
	cal.cfg.setProperty("START_WEEKDAY",cal.mCfg.START_WEEKDAY);
    cal.width = config.w;
    cal.height = config.h;
    if (true) //override function
    {
	    cal.renderCellDefault = function(workingDate, cell) {
	        cell.innerHTML = workingDate.getDate();
        }
    }
	YAHOO.DC.EventCalendar.calendarArray[calendarId] = cal;
	YAHOO.DC.EventCalendar.showListOfCalendars(showFolder);//Grab the first calendar in the list
				
}

YAHOO.DC.EventCalendar.ApplyRoomTitle = function()
{
	
	//Check our Calendar URL...
	var CalIndex = '';
	var TabIndex = '';
	var Calurl = location.href.split('?')[0]+'?'+YAHOO.DC.EventCalendar.RoomId[CalendarId];
    var Calparams = new Array(); 
	if(Calurl.split('?')[1])
	{	
		Calparams = Calurl.split('?')[1].split('&');
		CalIndex = Calparams[0];
		TabIndex = Calparams[1];
	}
		
	var AppendRoomCount = '';
	var AppendRoomCount_extras = '';
	var SocialStr = '';
	var CalltoActionStr = '';
	var CalendarTypeVacancy = '';
	var InjectTitle = YAHOO.DC.EventCalendar.roomName[CalendarId];
	
	/*
	$('a.BookingInformation').attr('href','#tabs-1');
	$('a.MakeBooking').attr('href','#book_'+InjectTitle.replace(/\ /ig,"_"));
	
	$('div.BookingInformation').attr('id',InjectTitle.replace(/\ /ig,"_"));
	$('div.MakeBooking').attr('id','book_'+InjectTitle.replace(/\ /ig,"_"));
	*/
	
	function SetCalendarTypeVacancy(){
		switch(YAHOO.DC.EventCalendar.roomType[CalendarId]){
			case 1:
				//Villa
				CalendarTypeVacancy = 'Availability';
				break;
			case 2:
				//Hotel
				CalendarTypeVacancy = 'Availability';
				break;
			case 6:
				// Event
				CalendarTypeVacancy = 'Availability';
				break;
		}
	}
	SetCalendarTypeVacancy();
	
	//Generate tabs
	$("#tabs").tabs();
	//Append the first calendar to the header...
	$('h2.SelectCalendarHeader span.CalendarTitle').empty().append(InjectTitle);
	$('div.ShortDescriptionImage, div.ShortDescriptionExtras').empty();
	
	//var SplitTitle = InjectTitle.substr(0,30);
	//Append our first tab
	//if ($('input.thisBT').attr('thisbt')== 'BTWidget') $('li#FirstTab a span.TabText').empty().append('Info');
	//else $('li#FirstTab a span.TabText').empty().append(SplitTitle+'... info');
	
	if ($('input.thisBT').attr('thisbt')== 'BTWidget') $('li#SecondTab a span.TabText').empty().append('Info');
	else $('li#SecondTab a span.TabText').empty().append('More info');
	
	if (YAHOO.DC.EventCalendar.folderName[CalendarId] >= 1) 
		$('#RoomSelector optgroup.ThisCalendarGroup').empty().append(YAHOO.DC.EventCalendar.folderName[CalendarId]).show();
	
	$('#CalendarShortDescription div.ShortDescriptionCopy').empty();
	//This line sets the character limit of the short description by checking to see whether the booking tool is set as a widget or in the page body.
	//If it's set to Widget, the character limit is 200.  If it's the page body, then there is no limit.  NO LIMIT!
	////////////////////////////////////////////////
	
	//Show extras and rooms
	RoomCount = '<table class="BookingInfoExtraList" cellspacing="0" cellpadding="0">';
	if (YAHOO.DC.EventCalendar.roomType[CalendarId]==6)
	{RoomCount += '<tr height="10"></tr>';}
	else
	{
		RoomCount += '<tr><td><table class="ExtrasTableElements ui-widget-header ui-corner-all ExtrasTableRoomCount"><td><span class="TableTitle CalendarTypeVacancy">'+CalendarTypeVacancy+':</span></td><td><span class="ListElementRight">'+YAHOO.DC.EventCalendar.numberOfRooms[calendarId]+'</span></td></tr></table></td><tr height="10"></tr>';
	}
	for(var i in YAHOO.DC.EventCalendar.extras[CalendarId])
	{
		if(YAHOO.DC.EventCalendar.extras[CalendarId][i].ExtrasInRoom)
			AppendRoomCount_extras += '<tr><td><span class="ListElementLeft">'+YAHOO.DC.EventCalendar.extras[CalendarId][i].ExtrasName+'</span></td><td><span class="ListElementRight">'+YAHOO.DC.EventCalendar.currency[calendarId]+YAHOO.DC.EventCalendar.extras[calendarId][i].ExtrasPrice+'</span></td></tr>';
	}
	if(AppendRoomCount_extras != ''){
		RoomCount += '<tr><td colspan="2"><table class="ExtrasTableElements ui-state-default ui-corner-all"><tr height="5"></tr><tr><td><h3 class="DialogTitleExtras">Available extras:</h3></td></tr>'+AppendRoomCount_extras+'<tr height="5"></tr></table></td></tr>';
	}
	RoomCount += '';
	RoomCount += '</table>';
	AppendRoomCount = RoomCount;
	
	//Share this on Social websites
	SocialContent = '<div style="display:none;"><br/><a href="#" class="DescriptionReadMore" title="Read more about '+InjectTitle+'">Read more about '+InjectTitle+'</a><div class="clear"></div></div>';
	SocialContent += '<div class="ShareThisPage"><table cellspacing="0" cellpadding="0"><tr><td class="ShareThisCell">Share '+InjectTitle+':</td></tr><tr height="5"></tr><tr><td>';
	SocialContent += '<a href="http://www.facebook.com/sharer.php?u='+Calurl+'&t='+InjectTitle.replace(/\ /ig,"+")+'" target="_blank" title="Share '+InjectTitle+' on Facebook"><span class="SocialIcon FaceBookIcon"></span></a>';
	SocialContent += '<a href="http://www.bebo.com/c/share?Url='+Calurl+'&Title='+InjectTitle.replace(/\ /ig,"+")+'" target="_blank" title="Share '+InjectTitle+' on Bebo"><span class="SocialIcon BeboIcon"></span></a>';
	SocialContent += '<a href="http://www.twitter.com/home?status='+InjectTitle.replace(/\ /ig,"%20")+'%20'+Calurl+'" target="_blank" title="Share '+InjectTitle+' on Twitter"><span class="SocialIcon TwitterIcon"></span></a>';
	SocialContent += '<a href="http://digg.com/submit?phase=2&title='+InjectTitle.replace(/\ /ig,"+")+'&url='+Calurl+'" target="_blank" title="Share '+InjectTitle+' on Digg"><span class="SocialIcon DiggIcon"></span></a>';
	SocialContent += '<a href="http://www.stumbleupon.com/submit?url='+Calurl+'&title='+InjectTitle.replace(/\ /ig,"+")+'" target="_blank" title="Share '+InjectTitle+' on Stumbleupon"><span class="SocialIcon StumbleIcon"></span></a>';
	SocialContent += '<a href="http://del.icio.us/post?url='+Calurl+'&title='+InjectTitle.replace(/\ /ig,"+")+'" target="_blank" title="Share '+InjectTitle+' on Delicious"><span class="SocialIcon DeliciousIcon"></span></a>';
	SocialContent += '<a href="http://reddit.com/submit?url='+Calurl+'&title='+InjectTitle.replace(/\ /ig,"+")+'" target="_blank" title="Share '+InjectTitle+' on Reddit"><span class="SocialIcon RedditIcon"></span></a>';
	SocialContent += '</td><td></td></tr></table></div>';
	SocialStr = SocialContent;
	
	ctastr = '<div class="clear"></div><div class="CallToActions fg-buttonset ui-helper-clearfix">';
	ctastr += '<a href="#" id="MakeBookingCTA" class="fg-button ui-state-default fg-button-icon-left ui-corner-all" title="See availability"><span class="ui-icon ui-icon-triangle-1-e"></span>See availability</a>';
	ctastr += '</div>';

	CalltoActionStr = ctastr;
	
	//var ShortRoomDescription = YAHOO.DC.EventCalendar.roomDescription[CalendarId].substr(0,60);
	////////////////////////////////////////////////
	//Append our content in an orderly fashion
	//if (YAHOO.DC.EventCalendar.roomDescription[CalendarId].length >= 400 && $('input.thisBT').attr('thisBT') == 'BTWidget') 
	if($('#MakeBookingCTA').size()==0)
	{
		$('div.BookingInformation').append(CalltoActionStr);
	}
	$('#CalendarShortDescription div.ShortDescriptionCopy').append(YAHOO.DC.EventCalendar.roomDescription[CalendarId]);
	//if (!YAHOO.DC.EventCalendar.roomType[calendarId]==6) $('#CalendarShortDescription div.ShortDescriptionExtras').append(RoomCount+SocialStr);
	$('#CalendarShortDescription div.ShortDescriptionExtras').append(RoomCount+SocialStr);
	
	//Take the first image in the description
	if ($('div#CalendarShortDescription div.ShortDescriptionCopy img').eq(0).size() != 0)
	{
		$($('div#CalendarShortDescription div.ShortDescriptionCopy img').eq(0)).addClass('DescriptionImage').appendTo('div.ShortDescriptionImage');
		$('div.ShortDescriptionImage img').wrap('<span class="DescriptionImageWrap"><span class="DescriptionImageWrapInner ui-state-default"><span class="LightBoxLink" rel="'+$('div.ShortDescriptionImage img').eq(0).attr('src')+'" title="View '+InjectTitle+'" thisTitle="'+InjectTitle+'"></span></span></span>');
	}
	
	//Clean up any bad tags in the description
	$('#CalendarShortDescription div.ShortDescriptionCopy').html($('#CalendarShortDescription div.ShortDescriptionCopy').html().replace("<p></p>",""));
	
	////////////////////////////////////////////////
	//We need to use a function for the shadowbox...
	function OpenLightBox(thisRel, thisTitle){
		Shadowbox.open({player:'img',content:thisRel,title:thisTitle});
	}
	//Find the click
	$('span.LightBoxLink').live('click',function(){OpenLightBox($(this).attr('rel'), $(this).attr('thisTitle'));});
	////////////////////////////////////////////////
	
}


YAHOO.DC.EventCalendar.showListOfCalendars = function(folderName)
{
	
	//Check for a hash value on page load, and update the page accordingly...
	var FirstIndex = '';
	var SecondIndex = '';
	var url = location.href;
    var params = new Array(); 
	if(url.split('?')[1])
	{	
		params = url.split('?')[1].split('&');
		FirstIndex = params[0];
		SecondIndex = params[1];
	}
	else
		FirstIndex = YAHOO.DC.EventCalendar.RoomId[calendarId];

	//ApplyRoomTitle
	$('#RoomSelector, #RoomSelector optgroup').empty();
	$('#RoomSelector').append('<optgroup class="ThisCalendarGroup"></optgroup>');
	for(var i in YAHOO.DC.EventCalendar.rooms[calendarId]){
		if(folderName.split(',')[0] == YAHOO.DC.EventCalendar.rooms[calendarId][i].FolderName || folderName == ''){
			var className= '';
			if(YAHOO.DC.EventCalendar.rooms[calendarId][i].RoomType == "1")
				className = 'villa';
			else if(YAHOO.DC.EventCalendar.rooms[calendarId][i].RoomType == 2)
				className = 'hotel';
			else if(YAHOO.DC.EventCalendar.rooms[calendarId][i].RoomType == 6)
				className = 'event';
			$('#RoomSelector optgroup').append('<option calType="'+className+'" name="'+YAHOO.DC.EventCalendar.rooms[calendarId][i].RoomName.replace(/\ /ig,"_")+'" class="image RoomSelection ui-interact '+className+'" value="'+YAHOO.DC.EventCalendar.rooms[calendarId][i].RoomId+'" '+(YAHOO.DC.EventCalendar.rooms[calendarId][i].RoomId==FirstIndex?'selected':'')+' rel="'+YAHOO.DC.EventCalendar.rooms[calendarId][i].RoomName+'">'+YAHOO.DC.EventCalendar.rooms[calendarId][i].RoomName+'</option>');
		}
	}
	UpdateCalendar(FirstIndex);
	
	
	function UpdateCalendar(roomId){
		//Dom ready, hide the embed loader and continue with Booking Tool load
		
		YAHOO.DC.EventCalendar.RoomId[calendarId] = roomId;
		//$.blockUI({ message: '<span class="LoadingBookingTool"><span class="LoaderImage"></span><span class="LoaderText">Loading '+$('select#RoomSelector option:selected').attr('rel')+'...</span></span>' });
		YAHOO.DC.EventCalendar.initData(calendarId);
	}
	/*
	$('#RoomSelector').unbind('change').change(function(){
		var URL = location.href.split('?')[0] +'?'+ $(this).val();
		window.open(URL, "_parent");
	});
	*/
	
	$('#RoomSelector').unbind('change').selectmenu({
		width: 160,
		style:'dropdown',
		change:function(){
			//var URL = location.href.split('?')[0] +'?'+ $(this).val();
			//window.open(URL, "_parent");
			//location.href = location.href.split('?')[0] +'?'+ $(this).val();
			UpdateCalendar(parseInt($(this).val()));
		},
		icons: [
			{find: '.image', icon: 'ui-icon-search'}
		]
	});
	
	
	
}


YAHOO.DC.EventCalendar.generateAvailibilityList = function(targetDivId, calendarId, type) {// need to adjust  - not used yet
	var body_in = "";
	
	 
	var startDate = new Date(Date.parse(YAHOO.DC.EventCalendar.startDate[calendarId])).format('d mmm yyyy');//new Date.parse();
	var endDate = new Date(Date.parse(YAHOO.DC.EventCalendar.endDate[calendarId])).format('d mmm yyyy');//new Date.parse();
	
	body_in += '<div style="text-align: left;">From: <input type="text" id="availibilityListStartDate" value="'+startDate+'" style="width: 110px"/> to <input type="text" id="availibilityListEndDate" value="'+endDate+'" style="width: 110px"/></div>';
	body_in += '<div style="max-height: 240px; overflow: auto;" id="availibilityList'+CalendarId+'"><table id="tableSorter'+targetDivId+'" class="tablesorter">';
	body_in += YAHOO.DC.EventCalendar.generateAvailibilityListTableContent(startDate, endDate);
	body_in += '</table></div><div class="addEventDiv ui-helper-clearfix"><input class="print button-action-blue ui-button"type="button" id="availibilityListPrint" value="print"></div>';
	
	return body_in;
}

YAHOO.DC.EventCalendar.generateAvailibilityListTableContent = function(sDate, eDate){// need to adjust  - not used yet

	var a = YAHOO.DC.EventCalendar._events[calendarId];
	var sDate = new Date(Date.parse(sDate));
	var eDate = new Date(Date.parse(eDate));
	var strArray = new Array();
	var line = '';
	var body_in = '<thead><tr><th>Date</th><th>Availability</th></tr></thead><tbody>';
	var body_temp = '';
	for (var date in YAHOO.DC.EventCalendar.ha[calendarId])
	{
		var Availibility = Math.floor(YAHOO.DC.EventCalendar.ha[calendarId][date].ha/2);
		var tempDate = date.split('/')[2]+'/'+date.split('/')[0]+'/'+date.split('/')[1];
		tempDate = new Date(Date.parse(tempDate));
		var niceDate = tempDate.format('dd mmm yyyy');
		if ((tempDate >= sDate) && (tempDate <= eDate)){
			body_temp = '<tr><td>'+niceDate+'</td><td '+((Availibility==0)?'style="background-color: #ff0000;"':'')+'>'+Availibility+'</td></tr>';
			strArray.splice(0,0,body_temp);
		}
	}
	body_in += strArray.join('')
	body_in += '</tbody>';
	return body_in;
}

YAHOO.DC.EventCalendar.generatePriceList = function(targetDivId, calendarId, type) {
	var a = YAHOO.DC.EventCalendar.prices[calendarId];
	var body_in = "";
	_dateString = function(d) {
			var a = [];
			cal = YAHOO.DC.EventCalendar.calendarArray[calendarId];
			a[cal.mCfg.MDY_MONTH_POSITION-1] = (d.getMonth() + 1);
			a[cal.mCfg.MDY_DAY_POSITION-1] = d.getDate();
			a[cal.mCfg.MDY_YEAR_POSITION-1] = d.getFullYear();
			var s = cal.mCfg.DATE_FIELD_DELIMITER;
			return a.join(s);
		}
	topc = a.length;  
	for (var i1=0;i1<=topc-2;i1++)   
		for (var i2=i1+1;i2<=topc-1;i2++)
		{   
			if (a[i1].l>a[i2].l)
			{
				tmp = a[i1];
				a[i1] = a[i2];
				a[i2] = tmp;
			}
		} 
	body_in += '<div style="text-align: right;">Search Box: <input type="text" id="searchTextBox'+targetDivId+'"/></div>';
	body_in += '<div><table id="tableSorter'+targetDivId+'" class="tablesorter" style="">';
	body_in += '<thead><tr><th width="110">Delete</th><th width="90">Edit</th><th width="220">Date Interval</th><th width="184">Price</th></tr></thead><tbody>';
			
	for (var i=0;i<a.length;i++)
	{
		
		for(var k in a)
		{
			var startDate = new Date(Date.parse(a[i].l)).format('d mmm yyyy');//new Date.parse();
			var endDate = new Date(Date.parse(a[i].u)).format('d mmm yyyy');//new Date.parse();
	
			line = "<tr id=\"EventId"+a[i].myid+"\"><td><input type=\"button\" value=\"Delete\" style=\"font-size:10px\" onclick=\"javascript:YAHOO.DC.EventCalendar.confirmAndDeletePrice("+a[i].myid+");\"/></td>";
		
			line += '<td><input type="button" value="Edit" class="ui-button button-action-white ui-button-edit" style="font-size:10px" onclick="javascript:YAHOO.DC.EventCalendar.showAddEditPrice(\''+calendarId+'\',\''+a[i].myid+'\');"/></td><td style=\"BACKGROUND-COLOR: '+a[i].colorSelected+'">'+startDate+' to '+endDate+'</td><td>'+YAHOO.DC.EventCalendar.currency[calendarId]+a[i].value+"</td></tr>";
		}
		if (type==1)
		{
			for( var j in YAHOO.DC.EventCalendar.calendarArray[calendarId].pages)
			{
				var current = YAHOO.DC.EventCalendar.calendarArray[calendarId].pages[j].cfg.getProperty("pagedate").getMonth();
				if ((current == a[i].l.getMonth()) || (current == a[i].u.getMonth()))
					body_in += line; 
			}
		}
		else
		    body_in += line;
	}
	body_in += '</tbody></table></div>';
	
	return body_in;
}

YAHOO.DC.EventCalendar.generateRoomInfo = function(targetDivId, calendarId) {
	var body_in = '';
	var body_extras = '';
	
	content = '<div class="BookingToolDialog">';
	content += '<div class="fl" style="" >';
	content += '<h1 id="titleRoom">'+YAHOO.DC.EventCalendar.roomName[calendarId]+'</h1>';
	content += '<table class="BookingInfo" cellspacing="0" cellpadding="0"><tr><td width="60%" valign="top" class="BookingInfoCellLeft">';
		content += '<div id="calendarDescription">'+YAHOO.DC.EventCalendar.roomDescription[calendarId]+'</div>';
		content += '</td><td width="40%" valign="top">';
		// If it's a multi-date calendar, then display the INFO dialog like this.
		if (YAHOO.DC.EventCalendar.roomType[calendarId]==2)
		{
				content += '<div class="calendarExtrasRooms ui-state-default ui-corner-all"><table class="BookingInfoExtrasPrice"><tr id="nrRoomsRow" style="'+(YAHOO.DC.EventCalendar.roomType[calendarId]==2?'':'display: none;')+'"><td class="NumberOfRooms"><h3 class="RightCellTitleNOR">Number of rooms:</h3></td><td class="NumberOfRooms"><h3 class="NumberOfRoomsAvailable">'+YAHOO.DC.EventCalendar.numberOfRooms[calendarId]+'</h3></td></tr></table></div>';
		}
		content += '<div class="calendarExtrasPrice ui-state-default ui-corner-all"><table class="BookingInfoExtrasPrice"><tr><td>';
		for(var i in YAHOO.DC.EventCalendar.extras[calendarId])
			{
				if(YAHOO.DC.EventCalendar.extras[calendarId][i].ExtrasInRoom)
					body_extras += '<li><span class="ListElementLeft">'+YAHOO.DC.EventCalendar.extras[calendarId][i].ExtrasName+'</span><span class="ListElementRight">'+YAHOO.DC.EventCalendar.currency[calendarId]+YAHOO.DC.EventCalendar.extras[calendarId][i].ExtrasPrice+'</span><div class="clear"></div></li>';
			}
			if(body_extras != ''){
				content += '</td></tr><tr><td colspan="2"><h3 class="RightCellTitle">List of available extras:</h3></td></tr>';
				content += '<ul id="AvailableExtras">'+body_extras+'</ul>';
			}
			content += '</table></div><div class="ShareThisPage"><table cellspacing="0" cellpadding="0"><tr><td class="ShareThisCell">Share '+YAHOO.DC.EventCalendar.roomName[calendarId]+':</td></tr><tr height="5"></tr><tr><td>';
			//Rewrite the Title of the dialog
				content += '<a href="http://www.facebook.com/sharer.php?u='+$("input.ThisPageURL").attr("thisURL")+'&t='+YAHOO.DC.EventCalendar.roomName[calendarId].replace(/\ /ig,"+")+'" target="_blank" title="Share '+YAHOO.DC.EventCalendar.roomName[calendarId].replace(/\ /ig,"+")+' on Facebook"><span class="SocialIcon FaceBookIcon"></span></a>';
				content += '<a href="http://www.bebo.com/c/share?Url='+$("input.ThisPageURL").attr("thisURL")+'&Title='+YAHOO.DC.EventCalendar.roomName[calendarId].replace(/\ /ig,"+")+'" target="_blank" title="Share '+YAHOO.DC.EventCalendar.roomName[calendarId].replace(/\ /ig,"+")+' on Bebo"><span class="SocialIcon BeboIcon"></span></a>';
				content += '<a href="http://www.twitter.com/home?status='+YAHOO.DC.EventCalendar.roomName[calendarId].replace(/\ /ig,"+")+'%20'+$("input.ThisPageURL").attr("thisURL")+'" target="_blank" title="Share '+YAHOO.DC.EventCalendar.roomName[calendarId].replace(/\ /ig,"+")+' on Twitter"><span class="SocialIcon TwitterIcon"></span></a>';
				content += '<a href="http://digg.com/submit?phase=2&title='+YAHOO.DC.EventCalendar.roomName[calendarId].replace(/\ /ig,"+")+'&url='+$("input.ThisPageURL").attr("thisURL")+'" target="_blank" title="Share '+YAHOO.DC.EventCalendar.roomName[calendarId].replace(/\ /ig,"+")+' on Digg"><span class="SocialIcon DiggIcon"></span></a>';
				content += '<a href="http://www.stumbleupon.com/submit?url='+$("input.ThisPageURL").attr("thisURL")+'&title='+YAHOO.DC.EventCalendar.roomName[calendarId].replace(/\ /ig,"+")+'" target="_blank" title="Share '+YAHOO.DC.EventCalendar.roomName[calendarId].replace(/\ /ig,"+")+' on Stumbleupon"><span class="SocialIcon StumbleIcon"></span></a>';
				content += '<a href="http://del.icio.us/post?url='+$("input.ThisPageURL").attr("thisURL")+'&title='+YAHOO.DC.EventCalendar.roomName[calendarId].replace(/\ /ig,"+")+'" target="_blank" title="Share '+YAHOO.DC.EventCalendar.roomName[calendarId].replace(/\ /ig,"+")+' on Delicious"><span class="SocialIcon DeliciousIcon"></span></a>';
				content += '<a href="http://reddit.com/submit?url='+$("input.ThisPageURL").attr("thisURL")+'&title='+YAHOO.DC.EventCalendar.roomName[calendarId].replace(/\ /ig,"+")+'" target="_blank" title="Share '+YAHOO.DC.EventCalendar.roomName[calendarId].replace(/\ /ig,"+")+' on Reddit"><span class="SocialIcon RedditIcon"></span></a>';
			content += '</td><td></td></tr></table></td></tr></table></div>';
	body_in = content;
	return body_in;
	content += '</div></div>';
}

YAHOO.DC.EventCalendar.refresh = function(calendarId) {
	
	
	// draw reserved days
	
	myCustomEvent = function(workingDate, cell) {
        var StopRender = true;
        var height = YAHOO.DC.EventCalendar.calendarArray[calendarId].height;
        var width = YAHOO.DC.EventCalendar.calendarArray[calendarId].width;
        var spacer = pathCalendar+"/spacer.gif";
        var strcell ='<div style="position:relative;"><div style="position:absolute;vertical-align:middle;height:'+height+'px;width:'+width+'px;">'+workingDate.getDate()+'</div><div style="position:absolute;height:'+height+'px;width:'+width+'px;">';
        strcell +='<map name="Map'+cell.id+'">';
		var numberOfColisions = 0;
		var selectedIndex = -1;
		var firstDay = false;
        var lastDay = false;
        var k = (workingDate.getMonth() + 1)+"/"+workingDate.getDate()+"/"+workingDate.getFullYear();
        c = _a[k].length;
		for(var o in _a[k])
		{	
			if(!YAHOO.DC.EventCalendar.admin[calendarId]){
				if(_a[k][o].confirmed==true){
					if(_a[k][o].firstDay)firstDay = true;
					if(_a[k][o].lastDay)lastDay = true;
					numberOfColisions++;
					selectedIndex = o;
				}
			}
			else{
				if(_a[k][o].firstDay)firstDay = true;
				if(_a[k][o].lastDay)lastDay = true;
				numberOfColisions++;
				selectedIndex = o;
			}
		}
		if(selectedIndex != -1)
		{
			var colorSelected = YAHOO.DC.EventCalendar.getEntryColor(_a[k][selectedIndex].entryTypeId, 1, _a[k][selectedIndex].confirmed).replace('#','');
			if((firstDay && lastDay || numberOfColisions == 1) && ( _a[k][selectedIndex].entryTypeId==6 || _a[k][selectedIndex].entryTypeId==3)){
			}else if(firstDay && numberOfColisions==1 && YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[1] != '1'){
				YAHOO.util.Dom.addClass(cell, "eventdate_first_"+colorSelected);
				StopRender = false;
			}
			else if(lastDay && numberOfColisions==1 && YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[1] != '1'){
				YAHOO.util.Dom.addClass(cell, "eventdate_last_"+colorSelected);
				StopRender = false;
			}
			else if(numberOfColisions>=1){
			}
			else
				StopRender = false;
		}
		else
			StopRender = false;
		strcell +='</map>';
		strcell +='</div>';
		if((numberOfColisions>=1 && !firstDay && !lastDay) || (firstDay && lastDay) || (numberOfColisions>=1 && ( _a[k][selectedIndex].entryTypeId==6 || _a[k][selectedIndex].entryTypeId==3 || YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[1] == '1'))){
			if(numberOfColisions > 1 && _a[k].length > 1){
				for(var o in _a[k]){
					strcell +='<div style="background-color:'+YAHOO.DC.EventCalendar.getEntryColor(_a[k][o].entryTypeId,parseInt(o)+1, _a[k][o].confirmed)+';height:'+Math.floor((height)/_a[k].length)+'px;top:'+(height+(Math.floor((height)/_a[k].length)*o))+'px;" class="sub" id="'+cell.id+'_'+selectedIndex+'"></div>';
				}
			}
			else
				strcell +='<div style="background-color:'+YAHOO.DC.EventCalendar.getEntryColor(_a[k][selectedIndex].entryTypeId, 1, _a[k][o].confirmed)+';height:'+(height)+'px;top:'+height+'px;" class="sub" id="'+cell.id+'_'+selectedIndex+'"></div>';
		}
		strcell +='</div>';
        cell.innerHTML = strcell;
		
		if(StopRender)
			return YAHOO.widget.Calendar.STOP_RENDER;
    }
	
	// draw prices
	myCustomPrices = function(workingDate, cell) {
        //YAHOO.util.Dom.addClass(cell, "eventdate");
        var StopRender = true;
        var height = YAHOO.DC.EventCalendar.calendarArray[calendarId].height;
        var width = YAHOO.DC.EventCalendar.calendarArray[calendarId].width;
        
        // if (YAHOO.DC.EventCalendar.typeCalendar[calendarId]==1)
            // var spacer = "../spacer.gif";
        // else
        var spacer = pathCalendar+"/spacer.gif";
        
        var strcell='<div style="position:relative;"><div style="position:absolute;vertical-align:middle;height:'+height+'px;width:'+width+'px;">'+workingDate.getDate()+'</div><div style="position:absolute;height:'+height+'px;width:'+width+'px;">';
        strcell +='<map name="Map'+cell.id+'">';
        var k = (workingDate.getMonth() + 1)+"/"+workingDate.getDate()+"/"+workingDate.getFullYear();
        c = _p[k].length;

        for (var i=0;i<c;i++)
		{
			if(_p[k][i].firstDay && c==1){
				YAHOO.util.Dom.addClass(cell, "eventdate_first_price pricetooltip");
				StopRender = false
			}
			else if(_p[k][i].lastDay && c==1){
				YAHOO.util.Dom.addClass(cell, "eventdate_last_price pricetooltip");
				StopRender = false
			}
			else{
				if(YAHOO.DC.EventCalendar.admin[calendarId]){
					strcell +='<area shape="rect" coords="0,0,'+width+','+height+'" href="javascript:YAHOO.DC.EventCalendar.showAddEditPrice(\''+calendarId+'\','+_p[k][i].myid+',\''+cell.id+'\','+i+',\''+k+'\')">';
					YAHOO.util.Dom.addClass(cell, "pricetooltip");
				}
				else{
					YAHOO.util.Dom.addClass(cell, "eventdate_price");
					strcell +='<area shape="rect" coords="0,0,'+width+','+height+'">';
					YAHOO.util.Dom.addClass(cell, "pricetooltip");
					StopRender = false;}
			}
		}
		strcell +='</map>';
        strcell +='</div>';
        for (var i=0;i<c;i++)
        {
			if(_p[k][i].firstDay && c==1)
			{}	//strcell +='<div style="background-color:'+_a[k][i].colorSelected+';height:'+Math.round(height/2)+'px;" class="sub" id="'+cell.id+'_'+i+'"><img src="'+spacer+'" height="'+Math.round(height/2)+'" width="100%"></div>';
			else if(_p[k][i].lastDay && c==1)
			{}	//strcell +='<div style="background-color:'+_a[k][i].colorSelected+';height:'+Math.round(height/2)+'px;top:0px;" class="sub" id="'+cell.id+'_'+i+'"><img src="'+spacer+'" height="'+Math.round(height/2)+'" width="100%"></div>';
			else 
				strcell +='<div style="background-color: Yellow ;height:'+Math.round(height/c)+'px;top:'+Math.round(height/c*i)+'px;" class="sub" id="'+cell.id+'_'+i+'"></div>';
			
		}
        strcell +='</div>';
        cell.innerHTML = strcell;
		if(StopRender)
			return YAHOO.widget.Calendar.STOP_RENDER;
    }

	YAHOO.DC.EventCalendar.calendarArray[calendarId].removeRenderers();
    var _a = YAHOO.DC.EventCalendar._events[calendarId];
	var _p = YAHOO.DC.EventCalendar._prices[calendarId];
	var _ha = YAHOO.DC.EventCalendar.ha[calendarId];
	
	if(YAHOO.DC.EventCalendar.typeCalendar[calendarId]==2){
		for (var k in _p)
		{
			if (_p[k].length>0)
				YAHOO.DC.EventCalendar.calendarArray[calendarId].addRenderer(k, myCustomPrices);
		}
	}
	if(YAHOO.DC.EventCalendar.typeCalendar[calendarId]==1){
		for (var k in _a)
		{
			if (_a[k].length>0)
				YAHOO.DC.EventCalendar.calendarArray[calendarId].addRenderer(k, myCustomEvent);
		}
	}
	
	YAHOO.DC.EventCalendar.calendarArray[calendarId].render();
	//YAHOO.DC.EventCalendar.showTootltips(calendarId,YAHOO.DC.EventCalendar.typeCalendar[calendarId],YAHOO.DC.EventCalendar.admin[calendarId]);
}



////////////////////////////////////////////////
YAHOO.DC.EventCalendar.getCloneOfObject = function(oldObject) {
	var tempClone = {};

	if (typeof(oldObject) == "object")
		for (prop in oldObject)
			// for array use private method getCloneOfArray
			if ((typeof(oldObject[prop]) == "object") && (oldObject[prop]).__isArray)
				tempClone[prop] = this.getCloneOfArray(oldObject[prop]);
			// for object make recursive call to getCloneOfObject
			else if (typeof(oldObject[prop]) == "object")
				tempClone[prop] = this.getCloneOfObject(oldObject[prop]);
			// normal (non-object type) members
			else
				tempClone[prop] = oldObject[prop];

	return tempClone;
}

    //private method (to copy array of objects) - getCloneOfObject will use this internally
YAHOO.DC.EventCalendar.getCloneOfArray = function(oldArray) {
	var tempClone = [];

	for (var arrIndex = 0; arrIndex <= oldArray.length; arrIndex++)
		if (typeof(oldArray[arrIndex]) == "object")
			tempClone.push(this.getCloneOfObject(oldArray[arrIndex]));
		else
			tempClone.push(oldArray[arrIndex]);

	return tempClone;
}

YAHOO.DC.EventCalendar.initData = function(calendarId ) {
	
    
	if(YAHOO.DC.EventCalendar.RoomId[calendarId] >=0)
	{
	
		var range = "";

		var a = new Array();
		var _a = new Array();
		var p = new Array();
		var _p = new Array();
		getRegFormId = function(response,id)
		{
			for(var i in response)
				{
					if(response[i].CalendarEntryId==id)
					{
						return i;
					}
				}
				return -1;
		}

		$.getJSON(pathServer+"/ajax_client.ashx?action=getEntries&jsoncallback=?",
			{ CalendarId: calendarId , RoomId: YAHOO.DC.EventCalendar.RoomId[calendarId]},
			function(response){
				if (response[0] == null || response[0] == "")
				{
					YAHOO.DC.EventCalendar.events[calendarId] = new Array();
					YAHOO.DC.EventCalendar._events[calendarId] = new Array();
				}else{
					for(var t in response[0])
					{
						days = [response[0][t].StartDate,response[0][t].EndDate];
						days[0] = days[0].split("/");
						days[1] = days[1].split("/");
						var range = days[0][1]+"/"+days[0][0]+"/"+days[0][2]+"-"+days[1][1]+"/"+days[1][0]+"/"+days[1][2];
						var ti = getRegFormId(response[1],response[0][t].MyId); //temporary index
						if (ti>=0)
							a[t] = {range: range,myid:response[0][t].MyId,l:YAHOO.widget.DateMath.getDate(days[0][2],days[0][1]-1,days[0][0]),
							u:YAHOO.widget.DateMath.getDate(days[1][2],days[1][1]-1,days[1][0]),title:response[0][t].Title,
							comment:response[0][t].Description,colorSelected:response[0][t].ColorSelected,target:response[0][t].Target,
							goUrl:response[0][t].URL, confirmed: response[0][t].Confirmed, entryTypeId: response[0][t].EntryTypeId, 
							vacancies: response[0][t].Vacancies, registered: response[0][t].Registered, firstName: response[1][ti].FirstName, 
							lastName: response[1][ti].LastName,address: response[1][ti].Address,city: response[1][ti].City,
							postCode: response[1][ti].PostCode,telephone: response[1][ti].Telephone,email: response[1][ti].Email, 
							regComments: response[1][ti].Comments,paidAmount: response[1][ti].PaidAmount,price: response[0][t].Price,roomId: response[0][t].RoomId?response[0][t].RoomId:-1,
							numberOfPeople: response[1][ti].NumberOfPeople, extrasInEntry: response[0][t].ExtrasInEntry, recurrence: response[0][t].Recurrence, parentId: response[0][t].ParentId};
						else
							a[t] = {range: range,myid:response[0][t].MyId,l:YAHOO.widget.DateMath.getDate(days[0][2],days[0][1]-1,days[0][0]),
							u:YAHOO.widget.DateMath.getDate(days[1][2],days[1][1]-1,days[1][0]),title:response[0][t].Title,
							comment:response[0][t].Description,colorSelected:response[0][t].ColorSelected,target:response[0][t].Target,
							goUrl:response[0][t].URL, confirmed: response[0][t].Confirmed, entryTypeId: response[0][t].EntryTypeId, 
							vacancies: response[0][t].Vacancies, registered: response[0][t].Registered,price: response[0][t].Price,
							roomId: response[0][t].RoomId?response[0][t].RoomId:-1, extrasInEntry: response[0][t].ExtrasInEntry, recurrence: response[0][t].Recurrence, parentId: response[0][t].ParentId};
					
					}
					var endDate = new Date(Date.parse(YAHOO.DC.EventCalendar.endDate[calendarId]));
					for (var i=0;i<a.length;i++)
					{
						for (var j=a[i].l;j<=a[i].u;j=YAHOO.widget.DateMath.add(j,YAHOO.widget.DateMath.DAY,1))
						{
							day = (j.getMonth() + 1)+"/"+j.getDate()+"/"+j.getFullYear()
							if(a[i].entryTypeId!=2){
							if (!_a[day]) _a[day]=new Array();
								_a[day][_a[day].length] = YAHOO.DC.EventCalendar.getCloneOfObject(a[i]);
								if (j == a[i].l)
									_a[day][_a[day].length-1].firstDay = true;
								if (j >= a[i].u)
									_a[day][_a[day].length-1].lastDay = true;
							}
						}
					}
					YAHOO.DC.EventCalendar.events[calendarId] = a;
					YAHOO.DC.EventCalendar._events[calendarId] = _a;
					// $.cookie('MrCalendarevents_'+YAHOO.DC.EventCalendar.RoomId[calendarId],$.toJSON(a),10);//update data to cookie
					// $.cookie('MrCalendar_events_'+YAHOO.DC.EventCalendar.RoomId[calendarId],$.toJSON(_a),10);//update data to cookie
				
				}
				//if(!YAHOO.DC.EventCalendar.pricesLoaded)
				if (response[2] == null || response[2] == "")
				{
					YAHOO.DC.EventCalendar.prices[calendarId] = new Array();
					YAHOO.DC.EventCalendar._prices[calendarId] = new Array();
				}else{
					for(var t in response[2])
					{
						days = [response[2][t].StartDate,response[2][t].EndDate];
						days[0] = days[0].split("/");
						days[1] = days[1].split("/");
						var range = days[0][2]+"/"+days[0][1]+"/"+days[0][0]+"-"+days[1][2]+"/"+days[1][1]+"/"+days[1][0];
						p[t] = {range: range,myid:response[2][t].MyId,l:YAHOO.widget.DateMath.getDate(days[0][2],days[0][1]-1,days[0][0]),
						u:YAHOO.widget.DateMath.getDate(days[1][2],days[1][1]-1,days[1][0]),value:response[2][t].Value};
					}
					for (var i=0;i<p.length;i++)
					{
						for (var j=p[i].l;j<=p[i].u;j=YAHOO.widget.DateMath.add(j,YAHOO.widget.DateMath.DAY,1))
						{
							day = (j.getMonth() + 1)+"/"+j.getDate()+"/"+j.getFullYear()
							if (!_p[day]) _p[day]=new Array();
							_p[day][_p[day].length] = YAHOO.DC.EventCalendar.getCloneOfObject(p[i]);
							if (j == p[i].l)
								_p[day][_p[day].length-1].firstDay = true;
							else if (j >= p[i].u)
								_p[day][_p[day].length-1].lastDay = true;
						}
					}
					YAHOO.DC.EventCalendar.prices[calendarId] = p;
					YAHOO.DC.EventCalendar._prices[calendarId] = _p;
					// $.cookie('MrCalendarprices_'+YAHOO.DC.EventCalendar.RoomId[calendarId],$.toJSON(p),10);//update data to cookie
					// $.cookie('MrCalendar_prices_'+YAHOO.DC.EventCalendar.RoomId[calendarId],$.toJSON(_p),10);//update data to cookie
				}
				if (response[3] == null || response[3] == "")
				{
					YAHOO.DC.EventCalendar.ha[calendarId] = new Array();
				}else{
					YAHOO.DC.EventCalendar.ha[calendarId] = new Array();
					for (var i = response[3].length-2;i>=0;i-- )
					{
						day = response[3][i].Date.split("/")[1].replace(/^[0]+/g,"")+"/"+response[3][i].Date.split("/")[0].replace(/^[0]+/g,"")+"/"+response[3][i].Date.split("/")[2];
						var prevDay = parseInt(response[3][i].Date.split("/")[1])+"/"+(parseInt(response[3][i].Date.split("/")[0])-1)+"/"+response[3][i].Date.split("/")[2];
						var nextDay = parseInt(response[3][i].Date.split("/")[1])+"/"+(parseInt(response[3][i].Date.split("/")[0])+1)+"/"+response[3][i].Date.split("/")[2];
						YAHOO.DC.EventCalendar.ha[calendarId][day] = new Object();
						YAHOO.DC.EventCalendar.ha[calendarId][day].ha = response[3][i].ha;
						var lastDay = false;
						var firstDay = false;
						var confirmed;
						if(response[3][i].ha <= 1){
							if(response[3][i].ha == 1 && (response[3][i+1].ha > 1 ))//|| (!YAHOO.DC.EventCalendar._events[calendarId][nextDay][0].lastDay && response[3][i+1].ha ==1)))
							{
								lastDay = true;
								firstDay = false;
							}
							else if(response[3][i].ha == 1){
								lastDay = false;
								firstDay = true;
							}
							
							var reservedTempObj = {range: day+"-"+day,myid: null,l:YAHOO.widget.DateMath.getDate(response[3][i].Date.split("/")[2],response[3][i].Date.split("/")[1]-1,response[3][i].Date.split("/")[0]),
									u:YAHOO.widget.DateMath.getDate(response[3][i].Date.split("/")[2],response[3][i].Date.split("/")[1]-1,response[3][i].Date.split("/")[0]),title:"",
									comment:"",colorSelected:"#ff0000",target:0,
									goUrl:"", confirmed: true, entryTypeId: 2, 
									vacancies: 0, registered: 0,price: 0, lastDay: lastDay, firstDay: firstDay};
							if(!(YAHOO.DC.EventCalendar._events[calendarId][day])){
								YAHOO.DC.EventCalendar._events[calendarId][day] = new Array();
								YAHOO.DC.EventCalendar._events[calendarId][day].push(reservedTempObj);
							}
							else 
								YAHOO.DC.EventCalendar._events[calendarId][day].unshift(reservedTempObj);
						}
						// $.cookie('MrCalendarha_'+YAHOO.DC.EventCalendar.RoomId[calendarId],$.toJSON(YAHOO.DC.EventCalendar.ha[calendarId]),10);//update data to cookie
						// $.cookie('MrCalendar_events_'+YAHOO.DC.EventCalendar.RoomId[calendarId],$.toJSON(YAHOO.DC.EventCalendar._events[calendarId]),10);//update data to cookie
					}
				}
				if(response[4] != null || response[4] != ""){
					YAHOO.DC.EventCalendar.roomType[calendarId] = response[4].RoomType;
					YAHOO.DC.EventCalendar.defaultPrice[calendarId] = response[4].DefaultPrice;
					YAHOO.DC.EventCalendar.priceType[calendarId] = response[4].PriceType;
					YAHOO.DC.EventCalendar.roomName[calendarId] = response[4].RoomName;
					YAHOO.DC.EventCalendar.folderName[calendarId] = response[4].FolderName;
					YAHOO.DC.EventCalendar.roomDescription[calendarId] = response[4].RoomDescription;
					YAHOO.DC.EventCalendar.numberOfRooms[calendarId] = response[4].NumberOfRooms;
					// $.cookie('MrCalendarroomType_'+YAHOO.DC.EventCalendar.RoomId[calendarId],$.toJSON(YAHOO.DC.EventCalendar.roomType[calendarId]),10);//update data to cookie
					// $.cookie('MrCalendardefaultPrice_'+YAHOO.DC.EventCalendar.RoomId[calendarId],$.toJSON(YAHOO.DC.EventCalendar.defaultPrice[calendarId]),10);//update data to cookie
					// $.cookie('MrCalendarroomName_'+YAHOO.DC.EventCalendar.RoomId[calendarId],$.toJSON(YAHOO.DC.EventCalendar.roomName[calendarId]),10);//update data to cookie
					// $.cookie('MrCalendarroomDescription_'+YAHOO.DC.EventCalendar.RoomId[calendarId],$.toJSON(YAHOO.DC.EventCalendar.roomDescription[calendarId]),10);//update data to cookie
					// $.cookie('MrCalendarnumberOfRooms_'+YAHOO.DC.EventCalendar.RoomId[calendarId],$.toJSON(YAHOO.DC.EventCalendar.numberOfRooms[calendarId]),10);//update data to cookie
					if(YAHOO.DC.EventCalendar.roomType[calendarId]==6){
						$('#add_booking').hide();
						$('#litab3').hide();
					}
					else{
						$('#add_booking').show();
						$('#litab3').show();
					}
					if(YAHOO.DC.EventCalendar.roomType[calendarId]==2)//if hotel booking calendar
						$('#litab6').show();
					else
						$('#litab6').hide();
				}
				//add extended settings reader
				if(response[5] != null || response[5] != "")
				{
					YAHOO.DC.EventCalendar.extras[calendarId] = new Array;
					for (var i in response[5])
					{
						extrasTemp = new Object();
						extrasTemp.ExtrasId = response[5][i].ExtrasId;
						extrasTemp.ExtrasName = response[5][i].ExtrasName;
						extrasTemp.ExtrasDescription = response[5][i].ExtrasDescription;
						extrasTemp.ExtrasPrice = response[5][i].ExtrasPrice;
						extrasTemp.ExtrasInRoom = response[5][i].ExtrasInRoom;
						YAHOO.DC.EventCalendar.extras[calendarId][i] = extrasTemp;
					}
					// $.cookie('MrCalendarextras_'+YAHOO.DC.EventCalendar.RoomId[calendarId],$.toJSON(YAHOO.DC.EventCalendar.extras[calendarId]),10);//update data to cookie
				}
				
				$('#add_booking').unbind('click').click(function(){
					YAHOO.DC.EventCalendar.showAddBooking(calendarId,-1, YAHOO.DC.EventCalendar.roomType[calendarId]);
				});	
				
				//Lets prettify this up a bit...
				$('#viewCalenfarInfoBtn').unbind('click').click(function(){
					YAHOO.DC.EventCalendar.showAddEventDialog($('.SelectCalendarHeader').html(),YAHOO.DC.EventCalendar.generateRoomInfo('tab5',calendarId), 800);
					return false;//
				});	
				
				//load ApplyRoomTitle and description
				YAHOO.DC.EventCalendar.ApplyRoomTitle();
				
				YAHOO.DC.EventCalendar.pricesLoaded = true;			
				
				YAHOO.DC.EventCalendar.refresh(calendarId);
				
				//Input hover function
				$('.int_button').mouseover(function(){
					$(this).addClass('hover_over');
				}).mouseout(function(){
					$(this).removeClass('hover_over');
					$(this).removeClass('click_it');
				});
				
				$('.int_button').mousedown(function(){
					$(this).addClass('click_it');
				}).mouseup(function(){
					$(this).removeClass('click_it');	
				});

				//-------------
				$.unblockUI();
				$('span.LoadingBookingToolTable').hide();
				}
		);
		
	}
}

//client form save

///////////////////////////////////
YAHOO.namespace("DC.addCalendar");

	
YAHOO.DC.EventCalendar.getEventId = function(calendarId,id)
{
	for(var i in YAHOO.DC.EventCalendar.events[calendarId])
	{
		if(YAHOO.DC.EventCalendar.events[calendarId][i].myid==id)
		{
			return i;
		}
	}
}

YAHOO.DC.EventCalendar.getApplicantId = function(calendarId, eventId, id)
{
	for(var i in YAHOO.DC.EventCalendar.applicantsList[calendarId][eventId])
	{
		if(YAHOO.DC.EventCalendar.applicantsList[calendarId][eventId][i].id==id)
		{
			return i;
		}
	}
	return null;
}

YAHOO.DC.EventCalendar.getEventIdInApplicantsList = function(calendarId, id)
{
	for(var i in YAHOO.DC.EventCalendar.applicantsList[calendarId])
	{
		if(YAHOO.DC.EventCalendar.applicantsList[calendarId][i].calendarEntryId==id)
		{
			return i;
		}
	}
	return null;
}

YAHOO.DC.EventCalendar.getPriceId = function(calendarId,id)
{
	for(var i in YAHOO.DC.EventCalendar.prices[calendarId])
	{
		if(YAHOO.DC.EventCalendar.prices[calendarId][i].myid==id)
		{
			return i;
		}
	}
}
YAHOO.DC.EventCalendar.getFinalPrice = function(calendarId,range,id,numberOfPeople,ExtrasIdName)
{
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
		if(YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[1] != '1')
			u=YAHOO.widget.DateMath.add(u,YAHOO.widget.DateMath.DAY,1);
	}
	var finalPrice = 0;
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
	}
	var extrasPrice = 0;
	$('.'+ExtrasIdName+id).each(function(){
		var extrasId = $(this).attr('extrasId');
		if($('#'+ExtrasIdName+extrasId+':checked').length > 0)
			extrasPrice += (YAHOO.DC.EventCalendar.extras[calendarId][extrasId].ExtrasPrice*YAHOO.DC.EventCalendar.getSelectedNights(rangeTemp)*numberOfPeople);	
	});
	if(YAHOO.DC.EventCalendar.priceType[calendarId] == '1'){
		finalPrice = finalPrice * numberOfPeople;
	}
	finalPrice += extrasPrice;
	return finalPrice.toFixed(2);
}

YAHOO.DC.EventCalendar.getSelectedNights = function(range)
{
	range = range.split("-");
	
	var l = new Date(Date.parse(range[0]));
	if(range[1])
		var u = new Date(Date.parse(range[1]));
	else{
		var u = new Date(Date.parse(range[0]));
		u = YAHOO.widget.DateMath.add(u,YAHOO.widget.DateMath.DAY,1);
	}
	var daysCount = 0;
	if(YAHOO.DC.EventCalendar.priceType[calendarId].split(',')[1] == '1')
		u=YAHOO.widget.DateMath.add(u,YAHOO.widget.DateMath.DAY,1);
	for (var j=l;j<u;j=YAHOO.widget.DateMath.add(j,YAHOO.widget.DateMath.DAY,1))
	{
		daysCount++;
	}
	return daysCount;
}

YAHOO.namespace("DC.panel");YAHOO.DC.panel.panels = [];YAHOO.DC.myEditor = [];

YAHOO.DC.EventCalendar.showAddEventDialog = function (title_in, body_in, width){
	$('#dialog').attr('title',title_in);
	$('#dialog').html(body_in);
	$('#dialog').dialog({position:'top',modal: true, width: width, resizable: false, draggable: false, zIndex:11000,
		close: function(event, ui) {
			$(this).dialog('destroy');
			$('.formError').remove();
		}
	}).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();;
	$('#dialog').dialog('open');
}

YAHOO.DC.EventCalendar.showAddEventSubDialog = function (title_in, body_in, width){
	$('#subDialog').attr('title',title_in);
	$('#subDialog').html(body_in);
	$('#subDialog').dialog({position:'top',modal: true, width: width, resizable: false, draggable: false, zIndex:11000,
		close: function(event, ui) {
			$(this).dialog('destroy');
			$('.formError').remove();
		}
	}).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();;
	$('#dialog').dialog('open');
}

YAHOO.DC.EventCalendar.showSubDialog = function (title_in, body_in, width){
	$('#subDialog').attr('title',title_in);
	$('#subDialog').html(body_in);
	$('#subDialog').dialog({position:'top',modal: true, width: width, resizable: false, draggable: false, zIndex:11000,
		close: function(event, ui) {
			$(this).dialog('destroy');
			$('.formError').remove();
		}
	}).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();;
	$('#subDialog').dialog('open');
}

YAHOO.DC.EventCalendar.showEventlist = function (calendarId,type){
	var id_in = "eventlist"+calendarId;
	title_in = "Event List";
	body_in = "";
	context_in = document.getElementById(calendarId+'Container');
	var a = YAHOO.DC.EventCalendar.events[calendarId];
		body_in += '<div  style="float:right"><a href="javascript:YAHOO.DC.EventCalendar.showEventlist(\''+calendarId+'\',1);"><div class="event-button">Visible months</div></a></div><div style="float:right"><a href="javascript:YAHOO.DC.EventCalendar.showEventlist(\''+calendarId+'\',0);"><div class="event-button">All Months</div></a></div><div style="clear:both"></div>';
		body_in += YAHOO.DC.EventCalendar.generateBookingList('req',calendarId, type)
	YAHOO.DC.EventCalendar.showAddEventDialog(title_in,body_in,700);
	$('#tableSorterreq').tablesorter({headers: {0: {sorter: false}, 1: {sorter: false}, 2: {sorter: false} }});
	$('#searchTextBoxreq').keyup(function(){
		 $.uiTableFilter( $('#tableSorterreq'), this.value );
	});
}

YAHOO.DC.EventCalendar.showPriceslist = function (calendarId,type){
	var title_in = "Prices List";
	var body_in = "";
	
    body_in += '<div style="float:right"><a href="javascript:YAHOO.DC.EventCalendar.showPriceslist(\''+calendarId+'\',1);"><div class="event-button">Visible months</div></a></div><div style="float:right"><a href="javascript:YAHOO.DC.EventCalendar.showPriceslist(\''+calendarId+'\',0);"><div class="event-button">All Months</div></a></div><div style="clear:both"></div>';    
    body_in += YAHOO.DC.EventCalendar.generatePriceList('reqpr',calendarId, type)
	YAHOO.DC.EventCalendar.showAddEventDialog(title_in,body_in,700);
	$('#tableSorterreqpr').tablesorter({headers: {0: {sorter: false}, 1: {sorter: false}, 2: {sorter: false} }});
	$('#searchTextBoxreqpr').keyup(function(){
		 $.uiTableFilter( $('#tableSorterreqpr'), this.value );
	});
}

// show all tootltips
YAHOO.DC.EventCalendar.showTootltips = function (calendarId, calendarType, admin){
	$('.calcell').tooltip({ 
		delay: 300, 
		showURL: false, 
		track: true,
		extraClass: 'tooltip',
		bodyHandler: function() { 
			var d = $(this).text();
			var m = $(this).parent().parent().attr('class').split(' ')[0].substring(1);
			var y = $(this).parent().parent().parent().attr('class').split(' ')[1].substring(1);
			var date = m+"/"+d+"/"+y;
			var niceDate = new Date(Date.parse(date)).format('d mmm yyyy');
			var dateToRangeLast = new Date(Date.parse(date)).format('m/d/yyyy');
			
			var niceDateSelected = "";
			var dateToRangeFirst = "";
			
			if($('.selected:first').text()){
				var dSelected = $('.selected:first').text();
				var mSelected = $('.selected:first').parent().parent().attr('class').split(' ')[0].substring(1);
				var ySelected = $('.selected:first').parent().parent().parent().attr('class').split(' ')[1].substring(1);;
				var dateSelected = mSelected+"/"+dSelected+"/"+ySelected;
				niceDateSelected = new Date(Date.parse(dateSelected)).format('d mmm yyyy')+"&nbsp;-&nbsp;";
				dateToRangeFirst = new Date(Date.parse(dateSelected)).format('m/d/yyyy');
			}
			
			var _a = YAHOO.DC.EventCalendar._events[calendarId];
			var _p = YAHOO.DC.EventCalendar._prices[calendarId];
			var params = new Object();
	
		//Context menu
		var str = '<div class="contextPopup ui-state-default ui-corner-all">';
			str += '<div class="contextPopupDate ui-widget-header ui-state-default">';
				str += '<table cellspacing="0" cellpadding="0" width="100%">';
					str += '<tr>';
						str += '<td width="22"><span class="ui-icon ui-icon-calendar"></span></td>';
						str += '<td>'+niceDateSelected+''+niceDate+'</td>';
					str += '</tr>';
				str += '</table>';
			str += '</div>';
			str += '<div class="contextPopupBody ui-state-active">';
							
							if(_a[date] && YAHOO.DC.EventCalendar.typeCalendar[calendarId]==1){
								if(!admin){//clients view tooltips
									if(_a[date][0].confirmed){
										if(_a[date][0].entryTypeId==1 || _a[date][0].entryTypeId==4){
											for(var o in _a[date]){
												if(o > 0)
													str += '';
												if(_a[date][o].entryTypeId==4)
													str += '<div class="contextPopupRow contextPopupRowMessage">'+_a[date][o].title+'</div>';
												else
													str += '<div class="contextPopupRow contextPopupRowMessage">Reserved</div>';
											}
										}
										else if(_a[date][0].entryTypeId==2){
											str += '<div class="contextPopupRow contextPopupRowMessage">Unavailable</div>';
											params.viewDetails=false;
										}
										else if(_a[date][0].entryTypeId==6){
											var k = 1;
											for(var o in _a[date]){
												if(o > 0)
													str += '';
												
												//Event details table
												str += '<div class="contextPopupRow">';
													str += '<div class="contextPopupInnerBody">';
														str += '<table class="contextPopupTable" cellspacing="0" cellpadding="0">';
															str += '<tr>';
																str += '<td class="contextPopupEventTitle">'+_a[date][o].title+'</td>';
																str += '<td><div class="EventColourPlaceholder"><span class="ThisEventColour ui-widget-header ui-corner-all" style="background:'+YAHOO.DC.EventCalendar.getEntryColor(_a[date][o].entryTypeId, (k++), _a[date][o].confirmed)+';"></span></div></td>';
															str += '</tr>';
															str += '<tr height="5"></tr>';
															str += '<tr>';
																str += '<td class="Table_LeftCol">Price:</td>';
															if(_a[date][o].price == 0)
																str += '<td class="Table_RightCol"><strong>Free</strong></td></tr>';
															else
																if(_a[date][o].vacancies>_a[date][o].registered){
																str += '<td class="Table_RightCol">'+YAHOO.DC.EventCalendar.currency[calendarId]+_a[date][o].price+'</td></tr>';
															
																str += '<tr><td class="Table_LeftCol"><strong>'+(_a[date][o].vacancies-_a[date][o].registered)+ '';
																if (_a[date][o].vacancies-_a[date][o].registered == 1) str += ' place left</strong>.</td></tr>';
																else str += ' places left.</strong></td></tr>';
															
																params.makeBooking=true;
																}
														str += '<tr height="8"></tr></table>';
													str += '</div>';
												str += '</div>';
												//End
											}
											if (_a[date].length >1){
												YAHOO.DC.EventCalendar.EventListContextMenu($(this).attr("id"),_a[date],calendarId);
												return str;
											}
											else{
												params.viewDetails=true;
												if(_a[date][0].goUrl!="")
													params.goUrl = true;
											}
											str += '';
										   // }
											
										}
										else if(_a[date][0].entryTypeId==3){
											str += '<div class="contextPopupRow contextPopupRowMessage">Bank holiday</div>';
											params.viewDetails = true;
										}
										if(_a[date][0].goUrl!=""){
											str += '<div class="contextPopupRow">Click for more details.</div>';
											params.goUrl = true;
											//YAHOO.DC.EventCalendar.ContextMenu($(this).attr("id"),{viewDetails:true},_a[date][0],calendarId);
										}
										if(params)
											YAHOO.DC.EventCalendar.ContextMenu($(this).attr("id"),params,_a[date][0],calendarId);
									}else{
										if(true){
											str += '<div class="contextPopupRow">';
												str += '<div class="contextPopupInnerBody">';
													str += '<table class="contextPopupTable" cellspacing="0" cellpadding="0">';
														str += '<tr>';
															str += '<td class="contextPopupEventTitle" colspan="2">Unconfirmed booking</td>';
														str += '</tr>';
														str += '<tr>';
															str += '<td class="Table_LeftCol">Price:</td>';
															str += '<td class="Table_RightCol"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+YAHOO.DC.EventCalendar.getFinalPrice(calendarId,date)+'</strong></td>';
														str += '</tr>';
													str += '<tr height="8"></tr></table>';
												str += '</div>';
											str += '</div>';
										}else{
											str += '<div class="contextPopupRow">';
												str += 'Not available for booking';
											str += '</div>';
										}
									}
								}
							}else if(YAHOO.DC.EventCalendar.roomType[calendarId] != 6){
								str += '<div class="contextPopupRow">';
									str += '<div class="contextPopupInnerBody">';
										str += '<table class="contextPopupTable" cellspacing="0" cellpadding="0">';
											str += '<tr>';
												str += '<td class="contextPopupEventTitle" colspan="2">Available to make a booking</td>';
											str += '</tr>';
											str += '<tr height="5"></tr>';
											str += '<tr>';
												str += '<td class="Table_LeftCol">Day price:</td>';
												str += '<td class="Table_RightCol"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+YAHOO.DC.EventCalendar.getFinalPrice(calendarId,date)+'</strong></td>';
											str += '</tr>';
											if(YAHOO.DC.EventCalendar.ha[calendarId][date])
												{
												str += '<tr>';
													str += '<td class="Table_LeftCol">Availability:</td>';
													str += '<td class="Table_RightCol"><strong>'+ Math.floor(YAHOO.DC.EventCalendar.ha[calendarId][date].ha/2)+'</strong></td>';
												str += '</tr>';
												}
											if($('.selected:first').text())
												{
												str += '<tr>';
													str += '<td class="Table_LeftCol">Total price:</td>';
													str += '<td class="Table_RightCol"><strong>'+YAHOO.DC.EventCalendar.currency[calendarId]+YAHOO.DC.EventCalendar.getFinalPrice(calendarId,dateToRangeFirst+'-'+dateToRangeLast)+'</strong></td>';
												str += '<tr height="8"></tr></tr>';
												}
											else
												str += '<tr height="5"></tr>';
												
										str += '</table>';
									str += '</div>';
								str += '</div>';
									
							}
		str += '</div></div>';
		//End of context menu
		return str;
		} 
	});
}


YAHOO.DC.EventCalendar.checkInterval = function(startDate, endDate, myid, recurrence){
	
	var i=0;
	var selectedIndex = -1;
	var numberOfColisions = 0;
	var startDayTemp = startDate.split("/");
	var endDayTemp = endDate.split("/");
	startDate = YAHOO.widget.DateMath.getDate(startDayTemp[2],startDayTemp[0]-1,startDayTemp[1]);
	endDate = YAHOO.widget.DateMath.getDate(endDayTemp[2],endDayTemp[0]-1,endDayTemp[1]);
	var found = new Array();
	var _a = YAHOO.DC.EventCalendar._events[calendarId];
	var calendarEndDate = new Date(Date.parse(YAHOO.DC.EventCalendar.endDate[calendarId]));
	switch(recurrence){
		case "1":
			var startDateTemp = startDate;
			var endDateTemp = endDate;
			for (;endDateTemp<=calendarEndDate;startDateTemp=YAHOO.widget.DateMath.add(startDateTemp,YAHOO.widget.DateMath.WEEK,1),endDateTemp=YAHOO.widget.DateMath.add(endDateTemp,YAHOO.widget.DateMath.WEEK,1)){
				for (var j=startDateTemp;j<=endDateTemp;j=YAHOO.widget.DateMath.add(j,YAHOO.widget.DateMath.DAY,1))
				{
					var day = (j.getMonth() + 1)+"/"+j.getDate()+"/"+j.getFullYear();
					if (_a[day])
					{
						d = day.split("/");
						md = YAHOO.widget.DateMath.getDate(d[2],d[0]-1,d[1]);
						if (md>=startDateTemp && md<=endDateTemp)
						{	
							selectedIndex = -1;
							for(var o in _a[day])
							{		
								if(_a[day][o].confirmed==true && _a[day][o].myid != myid)
									selectedIndex = o;
							}
							if(selectedIndex!=-1){
								if(_a[day][selectedIndex].firstDay)
									found[i++] = "firstDay";
								if(_a[day][selectedIndex].lastDay)
									found[i++] = "lastDay";
								numberOfColisions++;
							}
						}
					}
				}
			}
			break;
		case "2":
			var startDateTemp = startDate;
			var endDateTemp = endDate;
			for (;endDateTemp<=calendarEndDate;startDateTemp=YAHOO.widget.DateMath.add(startDateTemp,YAHOO.widget.DateMath.MONTH,1),endDateTemp=YAHOO.widget.DateMath.add(endDateTemp,YAHOO.widget.DateMath.MONTH,1)){
				for (var j=startDateTemp;j<=endDateTemp;j=YAHOO.widget.DateMath.add(j,YAHOO.widget.DateMath.DAY,1))
				{
					var day = (j.getMonth() + 1)+"/"+j.getDate()+"/"+j.getFullYear();
					if (_a[day])
					{
						d = day.split("/");
						md = YAHOO.widget.DateMath.getDate(d[2],d[0]-1,d[1]);
						if (md>=startDateTemp && md<=endDateTemp)
						{	
							selectedIndex = -1;
							for(var o in _a[day])
							{		
								if(_a[day][o].confirmed==true && _a[day][o].myid != myid)
									selectedIndex = o;
							}
							if(selectedIndex!=-1){
								if(_a[day][selectedIndex].firstDay)
									found[i++] = "firstDay";
								if(_a[day][selectedIndex].lastDay)
									found[i++] = "lastDay";
								numberOfColisions++;
							}
						}
					}
				}
			}
			break;
		default:
			for (var j=startDate;j<=endDate;j=YAHOO.widget.DateMath.add(j,YAHOO.widget.DateMath.DAY,1))
			{
				var day = (j.getMonth() + 1)+"/"+j.getDate()+"/"+j.getFullYear();
				if (_a[day])
				{
					d = day.split("/");
					md = YAHOO.widget.DateMath.getDate(d[2],d[0]-1,d[1]);
					if (md>=startDate && md<=endDate)
					{	
						selectedIndex = -1;
						for(var o in _a[day])
						{		
							if(_a[day][o].confirmed==true && _a[day][o].myid != myid)
								selectedIndex = o;
						}
						if(selectedIndex!=-1){
							if(_a[day][selectedIndex].firstDay)
								found[i++] = "firstDay";
							if(_a[day][selectedIndex].lastDay)
								found[i++] = "lastDay";
							numberOfColisions++;
						}
					}
				}
			}
			break;
	}
	if(numberOfColisions > 2 || (numberOfColisions == 2 && found[0] != "lastDay" &&  found[1] != "firstDay") || (numberOfColisions==1 && found[0] == "lastDay" &&  found[1] == "firstDay") || (numberOfColisions==1 && found[1] == "lastDay" &&  found[0] == "firstDay"))
	{
		return false;
	}
	else
	{
		return true;
	} 
}

YAHOO.DC.EventCalendar.checkDates = function(startDate, endDate){
	var startDayTemp = startDate.split("/");
	var endDayTemp = endDate.split("/");
	startDate = YAHOO.widget.DateMath.getDate(startDayTemp[2],startDayTemp[0]-1,startDayTemp[1]);
	endDate = YAHOO.widget.DateMath.getDate(endDayTemp[2],endDayTemp[0]-1,endDayTemp[1]);
	if (startDate <= endDate)
		return true;
	else
		return false;
}

YAHOO.DC.EventCalendar.getEntryColor = function(entryTypeId, iteration, confirmed){
	if((entryTypeId == 1 || entryTypeId == 2) && confirmed)
		return YAHOO.DC.EventCalendar.colors[calendarId]['ColorBookingConfirmed'];
	if((entryTypeId == 1 || entryTypeId == 2) && !confirmed)
		return YAHOO.DC.EventCalendar.colors[calendarId]['ColorBookingNotConfirmed'];
	if(entryTypeId == 3)
		return YAHOO.DC.EventCalendar.colors[calendarId]['ColorBankHoliday'];
	if(entryTypeId == 4)
		return YAHOO.DC.EventCalendar.colors[calendarId]['ColorCustomReservation'];
	if(entryTypeId == 6)
		return YAHOO.DC.EventCalendar.colors[calendarId]['ColorEvent'+iteration];
}
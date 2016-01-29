function IntervalCalendar(container, cfg) {
        /**
        * The interval state, which counts the number of interval endpoints that have
        * been selected (0 to 2).
        * 
        * @private
        * @type Number
        */
        this._iState = 0;

        // Must be a multi-select CalendarGroup
        cfg = cfg || {};
        cfg.multi_select = true;

        // Call parent constructor
        IntervalCalendar.superclass.constructor.call(this, container, cfg);

        // Subscribe internal event handlers
        this.beforeSelectEvent.subscribe(this._intervalOnBeforeSelect, this, true);
        this.selectEvent.subscribe(this._intervalOnSelect, this, true);
        this.beforeDeselectEvent.subscribe(this._intervalOnBeforeDeselect, this, true);
        this.deselectEvent.subscribe(this._intervalOnDeselect, this, true);
    }

    /**
    * Default configuration parameters.
    * 
    * @property IntervalCalendar._DEFAULT_CONFIG
    * @final
    * @static
    * @private
    * @type Object
    */
    IntervalCalendar._DEFAULT_CONFIG = YAHOO.widget.CalendarGroup._DEFAULT_CONFIG;

    YAHOO.lang.extend(IntervalCalendar, YAHOO.widget.CalendarGroup, {

        /**
        * Returns a string representation of a date which takes into account
        * relevant localization settings and is suitable for use with
        * YAHOO.widget.CalendarGroup and YAHOO.widget.Calendar methods.
        * 
        * @method _dateString
        * @private
        * @param {Date} d The JavaScript Date object of which to obtain a string representation.
        * @return {String} The string representation of the JavaScript Date object.
        */
        _dateString : function(d) {
            var a = [];
            a[this.cfg.getProperty(IntervalCalendar._DEFAULT_CONFIG.MDY_MONTH_POSITION.key)-1] = (d.getMonth() + 1);
            a[this.cfg.getProperty(IntervalCalendar._DEFAULT_CONFIG.MDY_DAY_POSITION.key)-1] = d.getDate();
            a[this.cfg.getProperty(IntervalCalendar._DEFAULT_CONFIG.MDY_YEAR_POSITION.key)-1] = d.getFullYear();
            var s = this.cfg.getProperty(IntervalCalendar._DEFAULT_CONFIG.DATE_FIELD_DELIMITER.key);
            return a.join(s);
        },

        /**
        * Given a lower and upper date, returns a string representing the interval
        * of dates between and including them, which takes into account relevant
        * localization settings and is suitable for use with
        * YAHOO.widget.CalendarGroup and YAHOO.widget.Calendar methods.
        * <p>
        * <b>Note:</b> No internal checking is done to ensure that the lower date
        * is in fact less than or equal to the upper date.
        * </p>
        * 
        * @method _dateIntervalString
        * @private
        * @param {Date} l The lower date of the interval, as a JavaScript Date object.
        * @param {Date} u The upper date of the interval, as a JavaScript Date object.
        * @return {String} The string representing the interval of dates between and
        *                   including the lower and upper dates.
        */
        _dateIntervalString : function(l, u) {
            var s = this.cfg.getProperty(IntervalCalendar._DEFAULT_CONFIG.DATE_RANGE_DELIMITER.key);
            return (this._dateString(l)
                    + s + this._dateString(u));
        },

        /**
        * Returns the lower and upper dates of the currently selected interval, if an
        * interval is selected.
        * 
        * @method getInterval
        * @return {Array} An empty array if no interval is selected; otherwise an array
        *                 consisting of two JavaScript Date objects, the first being the
        *                 lower date of the interval and the second being the upper date.
        */
        getInterval : function() {
            // Get selected dates
            var dates = this.getSelectedDates();
            if(dates.length > 0) {
                // Return lower and upper date in array
                var l = dates[0];
                var u = dates[dates.length - 1];
                return [l, u];
            }
            else {
                // No dates selected, return empty array
                return [];
            }
        },

        /**
        * Sets the currently selected interval by specifying the lower and upper
        * dates of the interval (in either order).
        * <p>
        * <b>Note:</b> The render method must be called after setting the interval
        * for any changes to be seen.
        * </p>
        * 
        * @method setInterval
        * @param {Date} d1 A JavaScript Date object.
        * @param {Date} d2 A JavaScript Date object.
        */
        setInterval : function(d1, d2) {
            // Determine lower and upper dates
            var b = (d1 <= d2);
            var l = b ? d1 : d2;
            var u = b ? d2 : d1;
            // Update configuration
            this.cfg.setProperty('selected', this._dateIntervalString(l, u), false);
            this._iState = 2;
        },

        /**
        * Resets the currently selected interval.
        * <p>
        * <b>Note:</b> The render method must be called after resetting the interval
        * for any changes to be seen.
        * </p>
        * 
        * @method resetInterval
        */
        resetInterval : function() {
            // Update configuration
            this.cfg.setProperty('selected', [], false);
            this._iState = 0;
        },

        /**
        * Handles beforeSelect event.
        * 
        * @method _intervalOnBeforeSelect
        * @private
        */
        _intervalOnBeforeSelect : function(t,a,o) {
            
            
            if (true)    // Update interval state
            {
                this._iState = (this._iState + 1) % 3;
                if(this._iState == 0) {
                    // If starting over with upcoming selection, first deselect all
                    this.deselectAll();
                    this._iState++;
                }
            }
        },

        /**
        * Handles selectEvent event.
        * 
        * @method _intervalOnSelect
        * @private
        */
        _intervalOnSelect : function(t,a,o) {
            // Get selected dates
			if((!YAHOO.DC.EventCalendar.admin[calendarId] && YAHOO.DC.EventCalendar.roomType[calendarId] != 6) || YAHOO.DC.EventCalendar.admin[calendarId]){
				var d = a[0][0];
				var date = YAHOO.widget.DateMath.getDate(d[0], d[1] - 1, d[2]);
			   
				found = new Array();
				var dates = this.getSelectedDates();
				if(dates.length > 1) {
					/* If more than one date is selected, ensure that the entire interval
						between and including them is selected */
					var l = dates[0];
					var u = dates[dates.length - 1];
					if (YAHOO.DC.EventCalendar.typeCalendar[calendarId]==1)
					{
						var i=0;
						var selectedIndex = -1;
						var numberOfColisions = 0;
						var _a = YAHOO.DC.EventCalendar._events[calendarId];
						for (var j=l;j<=u;j=YAHOO.widget.DateMath.add(j,YAHOO.widget.DateMath.DAY,1))
						{
							day = (j.getMonth() + 1)+"/"+j.getDate()+"/"+j.getFullYear();
							if (_a[day])
							{
								d = day.split("/");
								md = YAHOO.widget.DateMath.getDate(d[2],d[0]-1,d[1]);
								if (md>=l && md<=u)
								{	
									selectedIndex = -1;
									for(var o in _a[day])
									{		
										if(_a[day][o].confirmed==true)
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
						if(numberOfColisions > 2 || (numberOfColisions == 2 && found[0] != "lastDay" &&  found[1] != "firstDay") || (numberOfColisions==1 && found[0] == "lastDay" &&  found[1] == "firstDay") || (numberOfColisions==1 && found[1] == "lastDay" &&  found[0] == "firstDay"))
						{
							this._iState = 0;
							this.deselectAll();                        
							this.cfg.setProperty('selected', this._dateString(date), false);
						}    
						else 
						{
							this.cfg.setProperty('selected', this._dateIntervalString(l, u), false); 
						}

					}
					else
					{
						this.cfg.setProperty('selected', this._dateIntervalString(l, u), false);
					}    
				}
				// Render changes
				this.render();
				var dates = this.getSelectedDates();
				if(dates.length > 0) {
					// Return lower and upper date in array
					var l = dates[0];
					if(dates.length > 1)
					var u = dates[dates.length - 1];
					else
					var u = "";
					this._setinputfields(l,u);
				}
				YAHOO.DC.EventCalendar.showTootltips(calendarId,YAHOO.DC.EventCalendar.typeCalendar[calendarId],YAHOO.DC.EventCalendar.admin[calendarId]);
            }else {
				this.cfg.setProperty('selected', [], false);
				this._iState = 0;
				this.render();
			}
        },

        /**
        * Handles beforeDeselect event.
        * 
        * @method _intervalOnBeforeDeselect
        * @private
        */
        _intervalOnBeforeDeselect : function(t,a,o) {
            if(this._iState != 0) {
                /* If part of an interval is already selected, then swallow up
                    this event because it is superfluous (see _intervalOnDeselect) */
                return false;
            }
        },
        _setinputfields : function(l,u) {
        	if (l!="")
        	{
        	    obj = document.getElementById("selMonth_start"+calendarId);
        	    obj.value = (l.getMonth() + 1);
        	    obj = document.getElementById("selDay_start"+calendarId);
        	    obj.value = l.getDate();
        	    obj = document.getElementById("selYear_start"+calendarId);
        	    obj.value = l.getFullYear();
            }
            
        	{
        	    obj = document.getElementById("selMonth_end"+calendarId);
        	    obj.value = ((u=="")?"":(u.getMonth() + 1));
        	    obj = document.getElementById("selDay_end"+calendarId);
        	    obj.value = ((u=="")?"":u.getDate());
        	    obj = document.getElementById("selYear_end"+calendarId);
        	    obj.value = ((u=="")?"":u.getFullYear());
            }
            
        },
        /**
        * Handles deselectEvent event.
        *
        * @method _intervalOnDeselect
        * @private
        */
        _intervalOnDeselect : function(t,a,o) {
            if(this._iState != 0) {
                // If part of an interval is already selected, then first deselect all
                this._iState = 0;
                this.deselectAll();

                // Get individual date deselected and page containing it
                var d = a[0];
                
                var date = YAHOO.widget.DateMath.getDate(d[0], d[1] - 1, d[2]);
                
                var page = this.getCalendarPage(date);
                if(page) {
                    // Now (re)select the individual date
                    page.beforeSelectEvent.fire();
                    this.cfg.setProperty('selected', this._dateString(date), false);
                    page.selectEvent.fire([d]);
                }
                // Swallow up since we called deselectAll above
                return false;
            }
        }
        
    });

    //YAHOO.namespace("example.calendar");
	YAHOO.namespace("DC.EventCalendar");
    YAHOO.DC.EventCalendar.IntervalCalendar = IntervalCalendar;
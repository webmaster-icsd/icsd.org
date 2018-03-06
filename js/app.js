$(function () {
    'use strict'
    // var GOOGLE_CALENDAR_ID = 'sisni95sgv8ifcq5su0d8j4khs%40group.calendar.google.com';
    var GOOGLE_CALENDAR_ID = 'km189pj4a5bptkna3f5gta4rgk@group.calendar.google.com';
    var GOOGLE_API_KEY = 'AIzaSyDzV4tcu-80oWSp0MsR5r2CFD1i6PgSTys';
    var calendarEventTemplateHtml = $('#calender-event-template').html();
    var calendarEventHtml;
    $.ajax({
        // GET https://www.googleapis.com/calendar/v3/calendars/sisni95sgv8ifcq5su0d8j4khs%40group.calendar.google.com/events?maxResults=25&orderBy=startTime&singleEvents=true&timeMin=2018-02-16T10%3A00%3A00-07%3A00&fields=description%2Citems(description%2Cend%2Crecurrence%2Csource%2Cstart%2Cstatus%2Csummary)%2Csummary&key={YOUR_API_KEY}
        // url: "https://www.googleapis.com/calendar/v3/calendars/sisni95sgv8ifcq5su0d8j4khs@group.calendar.google.com/events?key=AIzaSyDzV4tcu-80oWSp0MsR5r2CFD1i6PgSTys",
        // url: "https://www.googleapis.com/calendar/v3/calendars/sisni95sgv8ifcq5su0d8j4khs%40group.calendar.google.com/events?maxResults=25&orderBy=startTime&singleEvents=true&timeMin=2018-02-16T10%3A00%3A00-07%3A00&fields=description%2Citems(colorId%2Ccreator(displayName%2Cself)%2Cdescription%2Cend%2FdateTime%2CendTimeUnspecified%2Cetag%2Cid%2Clocation%2Corganizer%2FdisplayName%2Crecurrence%2Csource%2Cstart%2FdateTime%2Cstatus%2Csummary)%2Csummary&key=AIzaSyDzV4tcu-80oWSp0MsR5r2CFD1i6PgSTys",
        url: "https://www.googleapis.com/calendar/v3/calendars/" + GOOGLE_CALENDAR_ID + "/events",
        data: {
            maxResults: 5,
            orderBy: 'startTime',
            singleEvents: true,
            timeMin: new Date().toISOString(),
            key: GOOGLE_API_KEY
        },
        success: function (result) {
            console.log(result)
            var dataArray = result.items;
            var eventStartDateTime, eventTime;
            for (var i = 0; i < dataArray.length; i++) {
                if(dataArray[i]["start"]["dateTime"]){
                    eventStartDateTime = moment(dataArray[i]["start"]["dateTime"]);
                    if(dataArray[i]["end"]["dateTime"]){
                        eventTime = eventStartDateTime.format('h:mma') + " - " + moment(dataArray[i]["end"]["dateTime"]).format('h:mma');
                    } else {
                        eventTime = eventStartDateTime.format('h:mma');
                    }
                } else {
                    eventStartDateTime = moment(dataArray[i]["start"]["date"]);
                }
                calendarEventHtml = calendarEventTemplateHtml.replace(/##event-day##/g, eventStartDateTime.format('DD') ||'')
                    .replace(/##event-month##/g, eventStartDateTime.format('MMM') ||'')
                    .replace(/##event-title##/g, dataArray[i]["summary"] ||'')
                    .replace(/##event-description##/g, dataArray[i]["description"] ||'')
                    .replace(/##event-weekday##/g, eventStartDateTime.format('ddd') ||'')
                    .replace(/##event-time##/g, eventTime  ||'')
                    .replace(/##event-location##/g, dataArray[i]["location"]||'Islamic Center Of San Diego');
                $('#upcoming-events').append(calendarEventHtml);
            }
        }
    });
});


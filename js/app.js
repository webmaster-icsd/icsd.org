var GOOGLE_CALENDAR_ID = 'icsd.org_p8flfo1mj6nftembusod09qj6s@group.calendar.google.com';
var GOOGLE_API_KEY = 'AIzaSyDzV4tcu-80oWSp0MsR5r2CFD1i6PgSTys';

$(function () {
    'use strict'
    var upcomingEvents = $('#upcoming-events');
    var eventsCalendar = $("#event-calendar");
    if (upcomingEvents.length) {
        loadUpcomingEvents();
    }
    if (eventsCalendar.length) {
        eventsCalendar.fullCalendar({
            googleCalendarApiKey: GOOGLE_API_KEY,
            events: {
                googleCalendarId: GOOGLE_CALENDAR_ID
            },
            eventRender: function(event, element) {
                element.popover({
                    html:true,
                    title:event.title,
                    placement:'right',
                    content: "<p>"+ event.description||"" +"</p>",
                    trigger: 'hover'}
                ).popover('show');
            },
            eventClick: function(event, jsEvent, view) {
                return false;
            },
            defaultView:'listMonth',
            themeSystem: 'bootstrap4',
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'listMonth,month,agendaWeek'
            },
            eventLimit: true, // allow "more" link when too many events
            buttonText : {
                today:    'Today',
                month:    'Month',
                week:     'Week',
                day:      'Day',
                list:     'List'
            },
            bootstrapFontAwesome:{
                prev: 'la la la-angle-left',
                next: 'la la la-angle-right'
            }

        })
    }
    $(".carousel").swipe({
        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
            if (direction == 'left') $(this).carousel('next');
            if (direction == 'right') $(this).carousel('prev');
        },
        allowPageScroll:"vertical"
    });
});

var loadUpcomingEvents = function () {
    var calendarEventTemplateHtml = $('#calender-event-template').html();
    var calendarEventHtml;
    $.ajax({
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
                if (dataArray[i]["start"]["dateTime"]) {
                    eventStartDateTime = moment(dataArray[i]["start"]["dateTime"]);
                    if (dataArray[i]["end"]["dateTime"]) {
                        eventTime = eventStartDateTime.format('h:mma') + " - " + moment(dataArray[i]["end"]["dateTime"]).format('h:mma');
                    } else {
                        eventTime = eventStartDateTime.format('h:mma');
                    }
                } else {
                    eventStartDateTime = moment(dataArray[i]["start"]["date"]);
                }
                calendarEventHtml = calendarEventTemplateHtml.replace(/##event-day##/g, eventStartDateTime.format('DD') || '')
                    .replace(/##event-month##/g, eventStartDateTime.format('MMM') || '')
                    .replace(/##event-title##/g, dataArray[i]["summary"] || '')
                    .replace(/##event-description##/g, dataArray[i]["description"] || '')
                    .replace(/##event-weekday##/g, eventStartDateTime.format('ddd') || '')
                    .replace(/##event-time##/g, eventTime || '')
                    .replace(/##event-location##/g, dataArray[i]["location"] || 'Islamic Center Of San Diego');
                $('#upcoming-events').append(calendarEventHtml);
            }
        }
    });
};


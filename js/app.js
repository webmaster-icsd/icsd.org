var GOOGLE_CALENDAR_ID = 'icsd.org_p8flfo1mj6nftembusod09qj6s@group.calendar.google.com';
var GOOGLE_API_KEY = 'AIzaSyDzV4tcu-80oWSp0MsR5r2CFD1i6PgSTys';
var UPCOMING_EVENT_COUNT = 7;

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
            eventRender: function (event, element) {
                element.popover({
                        html: true,
                        title: event.title,
                        placement: 'right',
                        content: "<p>" + event.description || "" + "</p>",
                        trigger: 'hover'
                    }
                ).popover('show');
            },
            eventClick: function (event, jsEvent, view) {
                return false;
            },
            defaultView: 'listMonth',
            themeSystem: 'bootstrap4',
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'listMonth,month,agendaWeek'
            },
            eventLimit: true, // allow "more" link when too many events
            buttonText: {
                today: 'Today',
                month: 'Month',
                week: 'Week',
                day: 'Day',
                list: 'List'
            },
            bootstrapFontAwesome: {
                prev: 'la la la-angle-left',
                next: 'la la la-angle-right'
            }

        })
    }
    $(".carousel").swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            if (direction == 'left') $(this).carousel('next');
            if (direction == 'right') $(this).carousel('prev');
        },
        allowPageScroll: "vertical"
    });

    $('form').submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: this.action, // the url where we want to POST
            data: $(this).serialize(), // our data object
            dataType: 'json' // what type of data do we expect back from the server
        });
        $(this)[0].reset();
        $(this).find(".form-submit-message").removeClass('d-none');
    });
    var classifiedsList = new List('classifieds-list',
        {
            valueNames: [
                'name',
                { name: 'posting-date', attr: 'data-timestamp' },
                'category'
            ],
            page: 20,
            pagination: true
        }
    );
    $('.filter li').click(function() {

        var selection = $(this).data('category').toLowerCase();
        classifiedsList.filter(function(item) {
            var toBeSplit = item.values().category.toLowerCase();
            var tryThis = toBeSplit.split(',');
            for (var i=0, j=tryThis.length; i<j; i++) {
                if (tryThis[i].trim() == selection) {
                    return true;
                }
            }
            if (selection == "none") {
                return false;
            } else {
                return false;
            }
        });
        return false;
    });

    $('#filter-none').click(function() {
        classifiedsList.filter();
        return false;
    });
});

var loadUpcomingEvents = function () {
    var calendarEventTemplateHtml = $('#calender-event-template').html();
    var calendarEventHtml='';
    $.ajax({
        url: "https://www.googleapis.com/calendar/v3/calendars/" + GOOGLE_CALENDAR_ID + "/events",
        data: {
            maxResults: UPCOMING_EVENT_COUNT,
            orderBy: 'startTime',
            singleEvents: true,
            timeMin: new Date().toISOString(),
            key: GOOGLE_API_KEY
        },
        success: function (result) {
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
                calendarEventHtml += calendarEventTemplateHtml.replace(/##event-day##/g, eventStartDateTime.format('DD') || '')
                    .replace(/##event-month##/g, eventStartDateTime.format('MMM') || '')
                    .replace(/##event-title##/g, dataArray[i]["summary"] || '')
                    .replace(/##event-description##/g, dataArray[i]["description"] || '')
                    .replace(/##event-weekday##/g, eventStartDateTime.format('ddd') || '')
                    .replace(/##event-time##/g, eventTime || '')
                    .replace(/##event-location##/g, dataArray[i]["location"] || 'Islamic Center Of San Diego')
                    .replace(", Public Calendar","");

            }
            $('#upcoming-events').html(calendarEventHtml);
        }
    });
};


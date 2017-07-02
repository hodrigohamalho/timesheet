'use strict';
var request = require('request');
var date = require('date-and-time');

exports.listEvents = function(req, res) {
  var token = req.header("Authorization").split(' ')[1]; // removes Bearer string

  var timeMin = req.query.timeMin || _oneWeekAgoDate();
  timeMin = new Date(timeMin);
  var maxResults = req.query.maxResults || 3;
 
  request({
    method: 'GET',
    url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    qs: {
      awaysIncludeEmail: true,
      timeMin: timeMin.toISOString(),
      timeMax: _tomorrowDate().toISOString(),
      maxResults: 250,
      singleEvents: true  
    },
    auth: {
      'bearer': token
    }
  }, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      
      if (response && response.statusCode == 401)
        return res.sendStatus(401);

      var calendarEvents = _filterResult(body, maxResults);
      var events = _formatJson(calendarEvents);
      res.send(events);
    });
};

// private functions

function _formatJson(calendarEvents){
  var events = [];

  for (var i=0; i<calendarEvents.length; i++){
    var event = calendarEvents[i];
    debugger;
    events.push({
      customer: event['summary'].substring(event['summary'].indexOf('-')+1, event['summary'].indexOf('|')).trim(),
      description: event['summary'].substring(event['summary'].indexOf('|')+1).trim(),
      duration: _durationCalculation(event['start']['dateTime'], event['end']['dateTime']),
      location: event['location'],
      remote: false // TODO
    });
  }

  return events;
}

// Let only the events that matches with Red Hat - Customer | Description
// Or events with text timesheet-export in description 
function _filterResult(body, maxResults){
  body = JSON.parse(body)['items'];
  
  var events = [];
  var pattern = /Red Hat - .* | .*/i;

  for (var i=0; i<body.length; i++){
    var item = body[i];
    if (pattern.test(item['summary']) || (item['description'] && item['description'].indexOf('timesheet-export') !== -1)) 
      events.push(item);
  }
  
  var sliceCount = events.length - maxResults;
  return events.slice(sliceCount);
}

function _tomorrowDate(){
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return tomorrow;
}

function _oneWeekAgoDate(){
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  return oneWeekAgo;
}

function _durationCalculation(start, end){
  start = new Date(start);
  end = new Date(end);

  var dateInMs = Math.abs(start - end);
  return _msToTime(dateInMs);
}

function _msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    return (hours + minutes * 0.016).toFixed(1);
}

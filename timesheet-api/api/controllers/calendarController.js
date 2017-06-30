'use strict';
var request = require('request');
var date = require('date-and-time');

exports.listEvents = function(req, res) {
  var token = req.header("Authorization").split(' ')[1]; // removes Bearer string

  // var timeMin = date.format(new Date(), 'YYYY-MM-DDTHH:mm:ssZ');
  date.locale('pt');
  console.log(date.parse('2015/01/02 23:14:05', 'YYYY/MM/DD HH:mm:ss'));

  request({
    method: 'GET',
    url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    qs: {
      awaysIncludeEmail: true,
      timeMin: '2017-03-01T10:00:00-07:00',
      timeMax: new Date().toISOString()
    },
    auth: {
      'bearer': token
    }
  }, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      res.send(body);
    });

};

//alwaysIncludeEmail=true&timeMin=2017-03-01T10%3A00%3A00-07%3A00&key={YOUR_API_KEY}
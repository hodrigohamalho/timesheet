'use strict';
module.exports = function(app) {
  var calendar = require('../controllers/calendarController');

  app.route('/calendars').get(calendar.listEvents);
};
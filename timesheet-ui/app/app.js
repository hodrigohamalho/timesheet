'use strict';

// Declare app level module which depends on views, and components
angular.module('timesheet', [
  'ngRoute',
  'timesheet.view1',
  'timesheet.view2',
  'timesheet.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

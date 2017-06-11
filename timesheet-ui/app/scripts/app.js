'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('timesheet', [
  'ngResource',
  'ngRoute',
  'ngCookies',
  'ngSanitize',
  'angular-google-gapi'
]);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    redirectTo: '/timesheet'
  })
  .when('/howitworks', {
    templateUrl: 'views/howitworks.html',
  })
  .when('/timesheet', {
    templateUrl: 'views/timesheet.html',
    controller: 'TimesheetCtrl',
    controllerAs: 'timesheet'
  })
  .otherwise({
      redirectTo: '/timesheet'
  });
});

app.constant('CONFIG', {
  AUTH_DOMAIN: 'redhat.com',
  API_KEY: 'APIKEY',
  CLIENT_ID: 'CLIENTID',
  SCOPES: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/spreadsheets.readonly',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.readonly'
  ]
});

app.run(function(CONFIG, GAuth, GApi, GData, $rootScope, $location, $cookies) {
  console.log('app.run()');
  $rootScope.gdata = GData;
  //console.debug(CONFIG);
  //console.debug($rootScope.gdata.getUserId());
  //console.debug($rootScope.gdata.isLogin());

  // GAuth.setDomain(CONFIG.AUTH_DOMAIN);
  GAuth.setClient(CONFIG.CLIENT_ID);
  GAuth.setScope(CONFIG.SCOPES.join(' '));
  GAuth.load();

  var currentUser = $cookies.get('userId');
  if(currentUser) {
    GData.setUserId(currentUser);
    GAuth.checkAuth().then(
        function (user) {
            $rootScope.user = user;
            GAuth.getToken().then(function(data){console.debug(data);});
        },
        function(data) {
          // authenticate user at startup of the application
          $location.path('/login');
        }
    );
  }

  $rootScope.isUserSignedIn = function(){
      return $rootScope.user;            
  }

  // Set a watch on the $routeChangeStart
  $rootScope.$on('$routeChangeStart', function(evt, next, curr) {
    console.debug("Roteando de "+curr +"para: "+next);
    if (!$rootScope.isUserSignedIn)
      $location.path('/howitworks');

  });
});


// Client ID: 483971248715-hva8n0p8q6d3qou8bftesds07do8h321.apps.googleusercontent.com
// Client Secret: qoifymW6Vwct61-yBnAVtkMH
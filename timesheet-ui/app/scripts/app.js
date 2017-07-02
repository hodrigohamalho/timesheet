'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('timesheet', [
  'ngResource',
  'ngRoute',
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
    controller: 'HowItWorksCtrl'
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

app.run(function(CONFIG, GAuth, GApi, GData, $rootScope, $location) {
  console.log('app.run()');
  $rootScope.gdata = GData;
  
  GAuth.setClient(CONFIG.CLIENT_ID);
  GAuth.setScope(CONFIG.SCOPES.join(' '));
  
  var currentUser = JSON.parse(localStorage.getItem('ts-user'));
  if(currentUser) {
    GData.setUserId(currentUser['id']);
    GAuth.checkAuth().then(
      function (user) {
          console.log(user.name + ' is logged in');
          $location.path('/#!/timesheet');
      },
      function() {
        console.log("User is not logged!");
        $location.path('/#!/howitworks');
      }
    );
  }

  $rootScope.isUserSignedIn = JSON.parse(localStorage.getItem('ts-user'));            
  $rootScope.user = JSON.parse(localStorage.getItem('ts-user'));

  // Set a watch on the $routeChangeStart
  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    if (!$rootScope.isUserSignedIn)
      $location.path('/#!/howitworks');
  })
});


app.service('authInterceptor', function($q) {
    var service = this;

    service.responseError = function(response) {
        if (response.status == 401){
            localStorage.removeItem('ts-user');
            window.location = "/howitworks";
        }
        return $q.reject(response);
    };
});

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);
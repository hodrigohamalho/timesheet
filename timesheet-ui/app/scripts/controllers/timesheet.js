angular.module('timesheet').controller('TimesheetCtrl', function ($rootScope, $scope, $http) {
    
    var token = localStorage.getItem('ts-user')['access_token'];

    $http({
        method: 'GET',
        url: 'http://localhost:8080/api/calendar',
        headers: {
            'Authorization': 'Bearer '+token
        }
    });

});

// https://www.googleapis.com/calendar/v3/calendars/rdasilva%40redhat.com/events?alwaysIncludeEmail=true&maxResults=250&orderBy=startTime&singleEvents=true&timeMin=2017-02-28T00%3A00%3A00Z&key=

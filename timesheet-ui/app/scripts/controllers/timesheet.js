angular.module('timesheet').controller('TimesheetCtrl', function ($rootScope, $scope, $http) {
    
    $scope.$on('userChecked', function(){
        $http({
            method: 'GET',
            url: 'http://localhost:8080/api/calendar',
            params: {"email": $rootScope.user.email, "access_token": $rootScope.user.access_token, "maxResults": 3}
        });
    });

});

// https://www.googleapis.com/calendar/v3/calendars/rdasilva%40redhat.com/events?alwaysIncludeEmail=true&maxResults=250&orderBy=startTime&singleEvents=true&timeMin=2017-02-28T00%3A00%3A00Z&key=

angular.module('timesheet').controller('TimesheetCtrl', function ($rootScope, $scope, $http) {
    $http({
        method: 'GET',
        url: 'http://localhost:3000/calendars',
        headers: {
            Authorization: 'Bearer '+$rootScope.user['access_token']
        }
    });

});
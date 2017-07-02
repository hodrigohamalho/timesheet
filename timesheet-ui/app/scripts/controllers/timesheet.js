angular.module('timesheet').controller('TimesheetCtrl', function ($rootScope, $scope, $http) {

  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  $http({
    method: 'GET',
    url: 'http://localhost:3000/calendars',
    params: {
      maxResults: 3,
      minDate: oneWeekAgo
    },
    headers: {
        Authorization: 'Bearer '+$rootScope.user['access_token']
    }
  }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log(response);
    $scope.calendarEvents = response.data;
  }, function errorCallback(response) {
    console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
});
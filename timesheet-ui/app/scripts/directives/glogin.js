'use strict';

var timesheet = angular.module('timesheet');

timesheet.directive('gLogin', function (CONFIG, GAuth, GData, $rootScope, $cookies, $location) {
    return {
      replace: true,
      restrict: 'E',
      scope: true,
      templateUrl: 'views/directives/gLogin.html',
      link: function ($scope, element, attrs) {

        $rootScope.userPicture = 'images/unknown.svg';
        // console.debug($scope.gdata);
        // console.debug($scope.gdata.getUserId());
        // console.debug($scope.gdata.isLogin());
        // console.debug($scope.gdata.getUser());

        GAuth.checkAuth().then(function (user) {
            console.log('\t ' + user.name + ' is already logged in!!!');
            $rootScope.user = user;
        });

        $scope.handleAuthClick = function () {
          GAuth.login()
            .then(function (user) {
              // console.debug('\t ' + user.name + ' is already logged in!!!');
              // console.debug($scope.gdata.getUser());

              // check if logged user is member of 'redhat.com' domain
              if (user.email.endsWith('@' + CONFIG.AUTH_DOMAIN)){
                $cookies.put('userId', GData.getUserId());
                // $rootScope.$broadcast('userLoggedIn');
              }
              else{
                // show a message on screen!
                console.log(user.email + ' only redhat.com users is allowed!');
              }
            }, function () {
              // authenticate user at startup of the application
              console.log('\t User not logged yet!');
            });
        };

        $scope.handleSignoutClick = function () {
          GAuth.logout()
            .then(function () {
              console.log('\t logout!');
              $cookies.remove('userId');

              // GAuth.getToken()
              //   .then(function (data) {
              //     console.log('handleSignoutClick.GAuth.getToken()');
              //     console.log(data);
              //   });

              console.log('GData.userId: ' + GData.getUserId());
              // $rootScope.$broadcast('userLoggedOut');
              $location.path('/');
            });
        };

      },
    };
  });

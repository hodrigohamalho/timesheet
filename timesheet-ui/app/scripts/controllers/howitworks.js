angular.module('timesheet').controller('HowItWorksCtrl', function (CONFIG, GAuth, GData, $rootScope, $location, $scope) {

    $scope.handleAuthClick = function () {
        GAuth.login().then(function (user) {
            // check if logged user is member of 'redhat.com' domain
            if (user.email.endsWith('@' + CONFIG.AUTH_DOMAIN)){
                console.log('GData.userId: ' + GData.getUserId());
                GAuth.getToken().then(
                    function(token){
                        user['access_token'] = token["access_token"];
                        localStorage.setItem('ts-user', JSON.stringify(user));
                    });
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
        GAuth.logout().then(function () {
            localStorage.removeItem('ts-user');
            $location.path('/');
        });
    };
});

// https://www.googleapis.com/calendar/v3/calendars/rdasilva%40redhat.com/events?alwaysIncludeEmail=true&maxResults=250&orderBy=startTime&singleEvents=true&timeMin=2017-02-28T00%3A00%3A00Z&key=
//   var currentUser = $cookies.get('userId');
//   if(currentUser) {
//     GData.setUserId(currentUser);
//     GAuth.checkAuth().then(
//         function (user) {
//             $rootScope.user = user;
//             GAuth.getToken().then(function(data){console.log(data);});
//         },
//         function(data) {
//           // authenticate user at startup of the application
//           $location.path('/login');
//         }
//     );
//   }


// GAuth.checkAuth().then(function (user) {
//     console.log('\t ' + user.name + ' is already logged in!!!');
// });
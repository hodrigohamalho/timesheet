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
                $rootScope.isUserSignedIn = JSON.parse(localStorage.getItem('ts-user'));
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

/**
 * Created by dharmendra on 8/8/16.
 */
app.controller('LoginCtrl', function($scope,$state) {

    // Form data for the login modal
    $scope.loginData = {};

    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
       $state.go('app.dashboard');
    };
    $scope.openRegistration= function () {
        $state.go('regCreateAccount');
    }
});

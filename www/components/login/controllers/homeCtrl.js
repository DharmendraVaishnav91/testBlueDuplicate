/**
 * Created by dharmendra on 9/8/16.
 */
app.controller('HomeCtrl', function($scope,$state) {

    // Form data for the login modal
    $scope.loginData = {};

    $scope.openRegistration= function () {
        $state.go('regCreateAccount');
    };
    $scope.openLogin = function() {

        $state.go('login');
    };
});

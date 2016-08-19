/**
 * Created by dharmendra on 9/8/16.
 */
app.controller('HomeCtrl', function($scope,$state,$rootScope) {

    // Form data for the login modal
    $scope.loginData = {};
    $rootScope.bgUrl="assets/img/logo_small.png";
    $rootScope.bgLargeUrl="assets/img/logo_big.png";
    $scope.openRegistration= function () {
        $state.go('regCreateAccount');
    };
    $scope.openLogin = function() {

        $state.go('login');
    };
});

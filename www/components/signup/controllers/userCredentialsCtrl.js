/**
 * Created by dharmendra on 1/3/17.
 */
app.controller('UserCredentialCtrl', function ($ionicNavBarDelegate, $scope, $state,$ionicHistory, $rootScope, signUpService, $cordovaToast,utilityService) {


    $scope.loginData = {
        user:{}
    };

    $ionicNavBarDelegate.align('center');


    $scope.goBack=function () {
        $ionicHistory.goBack();
    };

    $scope.goToConfirmAccount = function () {
        console.log("Add mobile screen ");
        console.log($scope.loginData);
        $state.go('verifyAccount');
    };
});

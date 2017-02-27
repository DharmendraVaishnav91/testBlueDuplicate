/**
 * Created by dharmendra on 22/02/17.
 */

app.controller('UserAgreementCtrl', function ($scope, $state, $rootScope, utilityService, $window, loginService, $localStorage, userSettingService, $timeout, menuService, $translate, $cordovaToast) {

    // Form data for the login modal

    //$cordovaToast.showShortBottom("app version=",$rootScope.appVersion);

    $scope.goToCreateUserInfo=function () {
      $state.go('regCreateProfile');
    };
    // $scope.openRegistration = function () {
    //     $state.go('userAgreement');
    // };
    $scope.goBack=function () {
      $state.go('home');
    };

});


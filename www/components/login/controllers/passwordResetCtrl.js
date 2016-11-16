app.controller('PasswordResetCtrl',function($timeout, $q, $scope, $state, $ionicPopup, utilityService, loginService, $rootScope, $cordovaToast,$filter,$ionicLoading){
    $scope.loginData = {};
    $scope.goToUpdatePassword = function(){
      console.log($scope.loginData);
      // TODO OTP is not received in above console.log
    }
});

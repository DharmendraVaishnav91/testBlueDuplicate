app.controller('accntCreateSuccessCtrl', function($timeout,$q,$scope,$state,$ionicPopup,utilityService,loginService,$rootScope,$cordovaToast) {
  $scope.goToHome =function(){
      $state.go('home');
  } ;
});

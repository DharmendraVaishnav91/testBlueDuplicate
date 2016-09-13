app.controller('accntCreateSuccessCtrl', function($timeout,$q,$scope,$state,$rootScope,$cordovaToast) {
  $scope.goToHome =function(){
      $state.go('home');
  } ;
});

app.controller('inviteFamilyCtrl', function($timeout,$q,$scope,$state,$ionicPopup,utilityService,$stateParams,signUpService,$rootScope,$cordovaToast) {
  console.log($stateParams.inviteFamilyData);
  $scope.data={};
  $scope.skipToSuccess = function () {
      $state.go('accntCreateSuccess');
  };
});

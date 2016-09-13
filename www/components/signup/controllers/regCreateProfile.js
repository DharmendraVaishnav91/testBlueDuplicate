app.controller('RegCreateProfileCtrl', function($timeout,$q,$scope,$state,$ionicPopup,utilityService,$stateParams,$rootScope,$cordovaToast) {
  console.log($stateParams.accountData);
  $scope.isFromSetting=false;
  $scope.data={};
  $scope.loginData=$stateParams.accountData;
  var updatedImage='';
  $rootScope.bgUrl="assets/img/logo_small.png";
  $scope.updateImageSrc = null;
  $scope.addPicIcon="assets/img/icon_addProfile.png";
  $scope.changeImage= function(){
      utilityService.getImage().then(function(src) {
          updatedImage = "data:image/png;base64," +src;
          $scope.updateImageSrc = updatedImage;

      },function(err) {
          console.log(JSON.stringify(err));
      })
  };
  $scope.goToSelectUserType = function () {
      $scope.loginData.profile.gender=$scope.data.gender;
      $scope.loginData.profile.image=updatedImage;
      console.log($scope.loginData);
      $state.go('selectUserType',{profileData:$scope.loginData});
  };
});

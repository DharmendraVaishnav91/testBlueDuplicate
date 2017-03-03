app.controller('PasswordResetCtrl',function($timeout, $ionicHistory,$q, $scope, $state, $stateParams, $ionicPopup, utilityService, loginService, $rootScope, $cordovaToast,$filter,$ionicLoading){
    $scope.loginData = {};
    $scope.token = $stateParams['token'];
    console.log("in 2nd js file the token is : "+$scope.token);

    $scope.goBack= function () {
        $ionicHistory.goBack();
    };
    $scope.goToUpdatePassword = function(){
      console.log($scope.loginData);
      // Todo
      var data = {
          data:$scope.loginData,
          token:$scope.token
      };
      loginService.resetPasswordWithOtp(data).then(function (response){
        console.log(response.success);
        $state.go('login');
        $cordovaToast.showLongBottom(response.success);
      }).catch(function (error){
          console.log(error);
      });
    }
});

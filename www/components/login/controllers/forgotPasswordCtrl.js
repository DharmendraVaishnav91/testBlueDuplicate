app.controller('ForgotPasswordCtrl', function($timeout, $q, $scope, $state, $ionicPopup, utilityService, loginService, $rootScope, $cordovaToast,$filter,$ionicLoading){

    $scope.countryCodeList = "";
    $scope.data = {};

    utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
        $scope.countryCodeList = response;
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });

    $scope.selectChange = function (item) {
        console.log("Selected item")
        console.log($scope.data.selectedCountry);
    }

    $scope.goToPasswordRecreation = function(){
      console.log($scope.data);
      // TODO
      $state.go('passwordReset');
    }
});

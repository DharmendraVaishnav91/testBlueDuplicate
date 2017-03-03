app.controller('ForgotPasswordCtrl', function($timeout, $q, $scope, $state, $stateParams, $ionicPopup, utilityService, loginService, $rootScope, $cordovaToast,$filter,$ionicLoading){

    $scope.countryCodeList = "";
    $scope.data = {};

    utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
        $scope.countryCodeList = response;
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    $scope.goBack= function () {
        $state.go('login');
    };
    $scope.selectChange = function (item) {
        console.log("Selected item");
        console.log($scope.data.selectedCountry);
    };

    $scope.getSearchedCountryList=function(query){
      return $filter('filter')($scope.countryCodeList,query);
    };

    $scope.goToPasswordRecreation = function(){
      console.log($scope.data);
      // Todo
      var dataToSend = {
        country_phone_code: $scope.data.selectedCountry.CountryPhoneCode,
        username: $scope.data.mobile.toString()
      };
      console.log(dataToSend);
      loginService.getOtpToResetPassword(dataToSend).then(function (response){
          //success part
          $scope.prToken = response.token;
          console.log("in 1st js file the token is : "+$scope.prToken);
          $state.go('passwordReset',{token: $scope.prToken});
      }).catch(function (error){
          console.log(error);
      });

    }
});

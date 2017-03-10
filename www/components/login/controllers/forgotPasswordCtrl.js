app.controller('ForgotPasswordCtrl', function($timeout, $q, $scope, $state, $stateParams, $ionicPopup, utilityService, loginService, $rootScope, $cordovaToast,$filter,$ionicLoading,$ionicModal){

    $scope.countryCodeList = "";
    $scope.data = {};

    $scope.data = {
        selectedCountry:{
            CountryPhoneCode:"1",
            CountryCode:"US",
            CountryName:"United States"
        }
    };

    utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
        $scope.countryCodeList = response;
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    $ionicModal.fromTemplateUrl('components/common/views/countrySearch.html'
        , {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
        $scope.countrySearchModal = modal;
    });

    // $scope.getSearchedCountryList=function(query){
    //   return $filter('filter')($scope.countryCodeList,query);
    // } ;
    $scope.showCountrySearch = function() {
        console.log("show country search");
        $scope.countrySearchModal.show();
    };
    $scope.hideCountrySearch = function() {
        $scope.countrySearchModal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.countrySearchModal.remove();
    });
    $scope.selectCountry = function (selectedCountry) {
        $scope.data.selectedCountry=selectedCountry;

        $scope.hideCountrySearch();
    };

    $scope.goBack= function () {
        $state.go('login');
    };
    // $scope.selectChange = function (item) {
    //     console.log("Selected item");
    //     console.log($scope.data.selectedCountry);
    // };

    // $scope.getSearchedCountryList=function(query){
    //   return $filter('filter')($scope.countryCodeList,query);
    // };

    $scope.goToPasswordRecreation = function(){
      console.log($scope.data);
      // Todo
      var dataToSend = {
        country_phone_code: $scope.data.selectedCountry.CountryPhoneCode,
        mobile: $scope.data.mobile.toString()
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

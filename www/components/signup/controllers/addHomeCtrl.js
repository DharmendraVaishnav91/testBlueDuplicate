app.controller('addHomeCtrl', function($timeout,$q,$scope,$state,$ionicPopup,utilityService,$stateParams,signUpService , $rootScope,$cordovaToast,$filter) {
    console.log($stateParams.homeData);
    console.log($stateParams.homeAddress);
    $scope.data = $stateParams.homeData;
    $scope.home = $stateParams.homeAddress;
    $scope.isFromSetting = false;
  //  $scope.countryCodeList = utilityService.countryList();
    $scope.locationWay = "";
    $scope.subDivList = "";
    $scope.a = "";
    console.log($scope.data.homeCountry);
    utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
        $scope.countryCodeList = response;
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    var fetchStates = function (countryCode) {
        signUpService.fetchStates(countryCode).then(function (response) {
            $scope.subDivList = response;
            $scope.a = response;
            console.log($scope.subDivList);
        }).catch(function (error) {
            console.log(error);
        })
    };
    //fetchStates($scope.data.homeCountry);

    $scope.changeSubdivision = function (countryCode) {
       console.log(countryCode);
        fetchStates(countryCode);
    };
    $scope.countrySelected= function (selectedCountry) {
        console.log("Selected country");
        console.log(selectedCountry);
    };
    $scope.getUpdatedCountryList=function(query){

      return $filter('filter')($scope.countryCodeList,query);
    };
    $scope.getUpdatedStateList=function(query){
      return $filter('filter')($scope.subDivList,query);
    };
    $scope.skipToWork = function () {
        $state.go('addWork', {workData: $scope.data})
    };
    //Change address fields according user choice
    $scope.updateLocationFields = function (locationWay) {
        $scope.enableAddressFields=true;
        console.log(locationWay);
        if (locationWay == "current") {
            $scope.home.address = angular.copy($rootScope.addressDataFromCoordinate.address);
            $scope.home.city = angular.copy($rootScope.addressDataFromCoordinate.city);
            $scope.home.postalcode=angular.copy($rootScope.addressDataFromCoordinate.postalcode);
            console.log($rootScope.addressDataFromCoordinate);
            $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

            //$scope.home.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
            //$scope.home.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
            console.log($scope.subDivList);
            //$scope.data.state = $filter('getById')($scope.subDivList,"SubdivisionCode",$rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
            $scope.data.homeCountry = $filter('getById')($scope.countryCodeList,"CountryCode",$rootScope.addressDataFromCoordinate.userCountry.CountryCode); //angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

        } else {
            $scope.home.address = "";
            $scope.home.city = "";
            $scope.home.postalcode="";
            //$scope.home.latitude = "";
            //$scope.home.longitude = "";
            $scope.data.state = "";
            $scope.data.homeCountry = "";
        }
    };
    $scope.goToWork = function () {
        if ($scope.data.state != undefined && $scope.data.state != null) {
            //$scope.loginData.home.subdivision_code = $scope.data.state.SubdivisionCode;
            $scope.home.subdivision_code = $scope.data.state.SubdivisionCode;
        } else {
            $scope.home.subdivision_code = "";
        }
        //$scope.loginData.home.country_code=$scope.data.homeCountry.CountryCode;
        $scope.home.country_code = $scope.data.homeCountry.CountryCode;
        $scope.home.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
        $scope.home.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
        $scope.home.name = 'Home';
        console.log("Add home data");
        console.log($scope.home);

        signUpService.saveUserHome($scope.home).then(function (response) {
            console.log("User created successfully");
            $state.go('addWork', {workData: $scope.data});
            $cordovaToast.showLongBottom($filter('translate')('HOME_ADDED_SUCCESSFULLY'));

        }).catch(function (error) {
            var errorMessage =$filter('translate')('SOMETHING_WENT_WRONG');
                $cordovaToast.showLongBottom(errorMessage);
                console.log(errorMessage);
        });
    };
});

app.controller('addHomeCtrl', function($timeout,$q,$scope,$state,$ionicPopup,utilityService,$stateParams,signUpService ,
$rootScope,$cordovaToast,$filter) {
    console.log($stateParams.homeData);
    console.log($stateParams.homeAddress);
    $scope.data = $stateParams.homeData;
    $scope.home = $stateParams.homeAddress;
    $scope.isFromSetting = false;
    $scope.countryCodeList = utilityService.countryList();
    $scope.locationWay = "";
    var fetchStates = function (countryCode) {
        signUpService.fetchStates(countryCode).then(function (response) {
            $scope.subDivList = response;
        }).catch(function (error) {
            console.log(error);
        })
    };
    fetchStates($scope.data.homeCountry);

    $scope.changeSubdivision = function (countryCode) {
        fetchStates(countryCode);
    };

    $scope.skipToWork = function () {
        $state.go('addWork', {workData: $scope.data})
    };
    //Change address fields according user choice
    $scope.updateLocationFields = function (locationWay) {
        $scope.enableAddressFields=true;
        if (locationWay == "current") {
            $scope.home.address = angular.copy($rootScope.addressDataFromCoordinate.address);
            $scope.home.city = angular.copy($rootScope.addressDataFromCoordinate.city);
            $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

            //$scope.home.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
            //$scope.home.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
            $scope.data.state = angular.copy($rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
            $scope.data.homeCountry = angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
        } else {
            $scope.home.address = "";
            $scope.home.city = "";

            //$scope.home.latitude = "";
            //$scope.home.longitude = "";
            $scope.data.state = "";
            $scope.data.homeCountry = "";
        }
    };
    $scope.goToWork = function () {
        if ($scope.data.state != undefined && $scope.data.state != null) {
            //$scope.loginData.home.subdivision_code = $scope.data.state.SubdivisionCode;
            $scope.home.subdivision_code = $scope.data.state;
        } else {
            $scope.home.subdivision_code = "";
        }
        //$scope.loginData.home.country_code=$scope.data.homeCountry.CountryCode;
        $scope.home.country_code = $scope.data.homeCountry;
        $scope.home.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
        $scope.home.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
        $scope.home.name = 'Home';
        console.log("Add home data");
        console.log($scope.home);

        signUpService.saveUserHome($scope.home).then(function (response) {
            console.log("User created successfully");
            $cordovaToast.showLongBottom($filter('translate')('HOME_ADDED_SUCCESSFULLY'));
            $state.go('addWork', {workData: $scope.data})

        }).catch(function (error) {
            var errorMessage = "";
            if (error.error_status) {
                errorMessage = error.country_code != null ? error.country_code.error : "";
                errorMessage += error.home_location != null ? error.home_location.error : "";
                errorMessage += error.user != null ? error.user.error : "";
            } else {
                errorMessage = "Something went wrong on server. Please try after some time."
            }
            if (errorMessage != "") {
                $cordovaToast.showLongBottom(errorMessage);
                console.log(errorMessage);
            }
        });
    };
});

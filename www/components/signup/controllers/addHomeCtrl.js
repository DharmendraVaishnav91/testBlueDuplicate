app.controller('addHomeCtrl', function ($timeout, $q, $scope, $state, $ionicPopup, utilityService, $stateParams, signUpService, $ionicLoading, $rootScope, $cordovaToast, $filter) {
    // console.log($stateParams.homeData);
    // console.log($stateParams.homeAddress);
    // $scope.data = $stateParams.homeData;
    // $rootScope.home = $stateParams.homeAddress;
    // $scope.isFromSetting = false;
    //  $scope.countryCodeList = utilityService.countryList();
    //   $scope.locationWay = "";
    $scope.subDivList = "";
    $rootScope.position = null;
    $rootScope.addressDataFromCoordinate = {};
    $scope.data = {};
    $rootScope.home = {};
    $rootScope.loginData.registration_location = {};
   // $rootScope.loginData.home_location = {};
    // console.log($scope.data.homeCountry);

    utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
        $scope.countryCodeList = response;
        console.log(response);
        isLocationEnabled();


        fetchUserCoords();
    }).catch(function (error) {
        console.log(error);
    });
    var fetchStates = function (countryCode) {
        signUpService.fetchStates(countryCode).then(function (response) {
            $scope.subDivList = response;
        }).catch(function (error) {
            console.log(error);
        })
    };
    var setRegistrationLocation = function () {
        $rootScope.loginData.registration_location.postalcode = angular.copy($rootScope.addressDataFromCoordinate.postalcode);
        $rootScope.loginData.registration_location.subdivision_code = angular.copy($rootScope.addressDataFromCoordinate.userState.SubdivisionCode);

        //$rootScope.loginData.home.country_code=$scope.data.homeCountry.CountryCode;
        $rootScope.loginData.registration_location.address = angular.copy($rootScope.addressDataFromCoordinate.address);
        $rootScope.loginData.registration_location.country_code = angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
        $rootScope.loginData.registration_location.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
        $rootScope.loginData.registration_location.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
        //$rootScope.loginData.registration_location.name='Home';
    };
    var setHomeLocation = function () {
        $rootScope.home.address = angular.copy($rootScope.addressDataFromCoordinate.address);
        $rootScope.home.city = angular.copy($rootScope.addressDataFromCoordinate.city);
        $rootScope.home.postalcode = angular.copy($rootScope.addressDataFromCoordinate.postalcode);

        if ($scope.countryCodeList.length != 0) {
            $scope.data.homeCountry = $filter('getById')($scope.countryCodeList,
                "CountryCode",
                $rootScope.addressDataFromCoordinate.userCountry.CountryCode);
            signUpService.fetchStates($rootScope.addressDataFromCoordinate.userCountry.CountryCode).then(function (response) {
                $scope.subDivList = response;
                $scope.data.state = $filter('getById')($scope.subDivList,
                    "SubdivisionCode",
                    $rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
            }).catch(function (error) {
                console.log(error);
            });
        }
    };
    var fetchUserCoords = function () {
        $ionicLoading.show("Loading");
        utilityService.getPosition().then(function (position) {
            $rootScope.position = position;
            $ionicLoading.hide();

            if ($rootScope.position != null) {
                utilityService.fetchAddressFromCoords($rootScope.position.coords).then(function (addr) {

                    $rootScope.addressDataFromCoordinate.userCountry = {
                        CountryName: addr.country != null ? addr.country : "",
                        CountryCode: addr.country_code != null ? addr.country_code : "",
                        CountryPhoneCode: addr.country_phone_code != null ? addr.country_phone_code : ""
                    };
                    $rootScope.addressDataFromCoordinate.userState = {
                        SubdivisionID: "",
                        SubdivisionCode: addr.subdivision_code != null ? addr.subdivision_code : "",
                        SubdivisionName: addr.state != null ? addr.state : "",
                        CountryCode: $rootScope.addressDataFromCoordinate.userCountry.CountryCode,
                        CountryName: $rootScope.addressDataFromCoordinate.userCountry.CountryName
                    };
                    $rootScope.addressDataFromCoordinate.city = angular.copy(addr.sub_state != null ? addr.sub_state : "");
                    $rootScope.addressDataFromCoordinate.address = angular.copy(addr.street_address != null ? addr.street_address : "");
                    $rootScope.addressDataFromCoordinate.postalcode = parseInt(angular.copy(addr.postal_code));
                    setRegistrationLocation();
                    setHomeLocation();

                });
            } else {
                fetchUserCoords();
            }
            console.log("position in scope");
            console.log($rootScope.position);
        }).catch(function (error) {
            console.log(error);
            $ionicLoading.hide();
        });
    };

    //fetchStates($scope.data.homeCountry);
    var isLocationEnabled = function () {
        //var deferred=$q.defer();
        if (window.cordova) {
            cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
                if (enabled == false) {
                    $scope.isLocationOn = false;
                    $scope.showPopup();
                    /// deferred.reject();
                } else {
                    $scope.isLocationOn = true;
                    fetchUserCoords();
                    //deferred.resolve();
                }
            }, function (error) {
                alert("Error in getting location: " + error);
            });
        }
        return $scope.isLocationOn;
        //return deferred.promise;
    };


    $scope.changeSubdivision = function (countryCode) {
        console.log(countryCode);
        $scope.data.state = null;
        fetchStates(countryCode);
    };
    $scope.countrySelected = function (selectedCountry) {
        console.log("Selected country");
        console.log(selectedCountry);
    };
    $scope.goBack = function () {
        $state.go('regMobile');
    };
    $scope.getUpdatedCountryList = function (query) {

        return $filter('filter')($scope.countryCodeList, query);
    };
    $scope.getUpdatedStateList = function (query) {
        return $filter('filter')($scope.subDivList, query);
    };
    //$scope.goToSelectUserOccupation = function () {
    //    $state.go('selectUserType');
    //};
    // $scope.skipToWork = function () {
    //     $state.go('addWork', {workData: $scope.data})
    // };
    //Change address fields according user choice
    // $scope.updateLocationFields = function (locationWay) {
    //     $scope.enableAddressFields = true;
    //     console.log(locationWay);
    //     if (locationWay == "current") {
    //         $rootScope.home.address = angular.copy($rootScope.addressDataFromCoordinate.address);
    //         $rootScope.home.city = angular.copy($rootScope.addressDataFromCoordinate.city);
    //         $rootScope.home.postalcode = angular.copy($rootScope.addressDataFromCoordinate.postalcode);
    //         console.log($rootScope.addressDataFromCoordinate);
    //         // $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
    //         signUpService.fetchStates($rootScope.addressDataFromCoordinate.userCountry.CountryCode).then(function (response) {
    //             $scope.subDivList = response;
    //             $scope.data.state = $filter('getById')($scope.subDivList, "SubdivisionCode", $rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
    //         }).catch(function (error) {
    //             console.log(error);
    //         });
    //         //$rootScope.home.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
    //         //$rootScope.home.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
    //         //$scope.data.state = $filter('getById')($scope.subDivList,"SubdivisionCode",$rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
    //         $scope.data.homeCountry = $filter('getById')($scope.countryCodeList, "CountryCode", $rootScope.addressDataFromCoordinate.userCountry.CountryCode); //angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
    //
    //     } else {
    //         $rootScope.home.address = "";
    //         $rootScope.home.city = "";
    //         $rootScope.home.postalcode = "";
    //         //$rootScope.home.latitude = "";
    //         //$rootScope.home.longitude = "";
    //         $scope.data.state = "";
    //         $scope.data.homeCountry = "";
    //     }
    // };
     $scope.goToSelectUserOccupation = function () {
         if ($scope.data.state != undefined && $scope.data.state != null) {
             //$scope.loginData.home.subdivision_code = $scope.data.state.SubdivisionCode;
             $rootScope.home.subdivision_code = $scope.data.state.SubdivisionCode;
         } else {
             $rootScope.home.subdivision_code = "";
         }
         //$scope.loginData.home.country_code=$scope.data.homeCountry.CountryCode;
         $rootScope.home.country_code = $scope.data.homeCountry.CountryCode;
         //$rootScope.home.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
         //$rootScope.home.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
         $rootScope.home.name = 'Home';

         console.log("Home Location");
         console.log($rootScope.home);
         console.log("Login data");
         console.log($rootScope.loginData);
     //    signUpService.saveUserHome($rootScope.home).then(function (response) {
     //
     //        $cordovaToast.showLongBottom($filter('translate')('HOME_ADDED_SUCCESSFULLY'));
     //
     //    }).catch(function (error) {
     //        var errorMessage = $filter('translate')('SOMETHING_WENT_WRONG');
     //        $cordovaToast.showLongBottom(errorMessage);
     //        console.log(errorMessage);
     //    });
     };
});

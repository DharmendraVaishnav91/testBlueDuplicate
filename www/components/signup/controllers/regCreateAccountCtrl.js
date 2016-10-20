/**
 * Created by dharmendra on 10/8/16.
 */
app.controller('RegCreateAccountCtrl', function ($timeout, $q, $scope, $state, $ionicPopup, utilityService, signUpService, $rootScope, $cordovaToast,$filter,$ionicLoading) {

    $scope.loginData = {
        user: {},
        profile: {},
        user_type: '',
        registration_location: {}
    };
    $scope.home = {};
    var updatedImage = '';
    var isLocationEnabled = null;
    var myPopup = null;
    var isPopupOpen = false;
    $rootScope.bgUrl = "assets/img/logo_small.png";
    $rootScope.position = null;

    $scope.isLocationOn = false;

    $scope.isFromSetting = false;
    $rootScope.position = null;
    $scope.addPicIcon = "assets/img/icon_addProfile.png";
    $scope.enableCrop = false;
    $scope.data = {};
    $scope.data.selectedCountry = null;
    $scope.countryCodeList = [];
    $scope.work = {};
    $scope.workLocations = [];

    utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
        $scope.countryCodeList = response;
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    var fetchUserCoords= function () {
        $ionicLoading.show("Loading");
        utilityService.getPosition().then(function (position) {
            $rootScope.position = position;
            if(position==null){
                fetchUserCoords();
            }
            $ionicLoading.hide();
            console.log("position in scope");
            console.log($rootScope.position);
        }).catch(function (error) {
            console.log(error);
            //if(position==null){
                fetchUserCoords();
        //    }
            $ionicLoading.hide();
            //$cordovaToast.showShortBottom("Unable to fetch your current location. Ensure that your GPS is enabled and working.");
        });
    };
    $scope.isLocationShared = false;
    $rootScope.addressDataFromCoordinate = {};
    $scope.showPopup = function (position) {
        $scope.data = {};
        isPopupOpen = true;
        // An elaborate, custom popup
        myPopup = $ionicPopup.show({
            title: $filter('translate')('WARNING'),
            template: "<span style='font-size: 18px;'>{{'ENABLE_LOCATION_IN_SETTING' | translate}}</span>",
            scope: $scope,
            cssClass: 'custom-title',
            buttons: [
                {
                    text: $filter('translate')('CANCEL'),
                    onTap: function () {
                        ionic.Platform.exitApp();
                    }
                },
                {
                    text: $filter('translate')('GO_TO_SETTING'),
                    type: 'button-positive',
                    onTap: function (e) {
                        isPopupOpen = false;
                        if (typeof cordova.plugins.settings.openSetting != undefined) {
                            cordova.plugins.settings.open(function () {
                                    console.log("opened settings");
                                },
                                function () {
                                });
                        }
                    }
                }
            ]
        });
    };
    isLocationEnabled = function () {
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
    $scope.selectChange = function (item) {
        console.log("Selected item")
        console.log($scope.data.selectedCountry);
    }
    $scope.showConfirm = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: $filter('translate')('CONFIRM_SHARE'),
            template:'<span>{{"LOCATION_CONFIRMATION"| translate}}</span>',
            cancelText: $filter('translate')('DENY'),
            okText:$filter('translate')('ALLOW')
        });
        confirmPopup.then(function (res) {
            if (res) {
                $scope.isLocationShared = true;
                if ($rootScope.position!=null) {
                    if($rootScope.addressDataFromCoordinate.userCountry==undefined){
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

                            $scope.data.selectedCountry =$filter('getById')($scope.countryCodeList,"CountryCode",$rootScope.addressDataFromCoordinate.userCountry.CountryCode);

                        }).catch(function (error) {
                            console.log(error);
                        });
                    }else{
                        $scope.data.selectedCountry =$filter('getById')($scope.countryCodeList,"CountryCode",$rootScope.addressDataFromCoordinate.userCountry.CountryCode);
                        //$scope.data.selectedCountry =$rootScope.addressDataFromCoordinate.userCountry;
                    }

                }else{
                    fetchUserCoords();
                }

                console.log('You are sure');
            } else {
                $scope.isLocationShared = false;
                console.log('Location must be shared to continue with registration.');
                $cordovaToast.showLongBottom($filter('translate')('LOCATION_MUST_BE_SHARED'))
            }
        });
    };
    isLocationEnabled();


    fetchUserCoords();

    $scope.changeSubdivision = function (countryCode) {
        fetchStates(countryCode);
    };

    var fetchStates = function (countryCode) {
        loginService.fetchStates(countryCode).then(function (response) {
            $scope.subDivList = response;
        }).catch(function (error) {
            console.log(error);
        })
    };

    $scope.shareLocation = function () {
        $scope.showConfirm();
    };

    $scope.goToProfileCreation = function () {
        if ($scope.isLocationShared) {
            if($rootScope.position!=null){
                // if(isLocationEnabled()){
                // $scope.openModal(openModalType.addWork);
                //$scope.loginData.user.country_code = $scope.data.selectedCountry.CountryCode;
                $scope.loginData.user.country_phone_code = $scope.data.selectedCountry.CountryPhoneCode;
                //$scope.loginData.user.mobile_country_code=$scope.data.selectedCountry.CountryPhoneCode;
                signUpService.checkUserNameAvailability($scope.loginData).then(function (response) {
                    console.log("Username available");
                    //$cordovaToast.showLongBottom("Username available");
                    console.log($scope.loginData.user);
                    $rootScope.userMobDetail = angular.copy($scope.loginData.user);
                    $state.go('regCreateProfile', {accountData: $scope.loginData})

                }).catch(function (error) {
                    console.log(error.error);
                    $cordovaToast.showLongBottom(error.error);
                    console.log("Username already taken. Try another.")
                });
            }else{
                fetchUserCoords();
            }

            //}
        } else {
            $cordovaToast.showLongBottom($filter('translate')('LOCATION_MUST_BE_SHARED'));
        }


    };
});

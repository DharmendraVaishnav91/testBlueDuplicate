/**
 * Created by dharmendra on 24/8/16.
 */
userSetting.controller('WorkPlacesCtrl', function ($scope, $state, $ionicModal, userSettingService, utilityService, loginService, $rootScope, signUpService, $cordovaToast, $filter) {

    $scope.isFromSetting = true;
    $scope.isWorkPlace = false;
    $scope.showNoDataAlert = false;
    var fetchCropList = function () {
        signUpService.fetchProductsList().then(function (response) {
            $scope.productList = response;
        }).catch(function (error) {
            console.log(error);
        });
    };
    fetchCropList();
    $scope.getUpdatedProductList=function(query){
      return $filter('filter')($scope.productList,query);
    }
    //$scope.work.name="My Work Place 1";
    $ionicModal.fromTemplateUrl('components/login/views/addWorkModal.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.editWork = modal;
    });
    $scope.backToAccount = function () {
        $state.go('app.setting');
    };
    $ionicModal.fromTemplateUrl('components/setting/views/workDetail.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.workDetailModal = modal;
    });

    var fetchAllLocations = function () {
        userSettingService.fetchAllLocations().then(function (response) {
            $scope.userLocations = response;
            console.log("User locations");
            console.log(response);
            $scope.isWorkPlace = $scope.userLocations.length != 0;
            $scope.showNoDataAlert = $scope.userLocations.length == 0;

        }).catch(function (error) {
            console.log(error);
            $scope.isWorkPlace = false;
        })
    };
    fetchAllLocations();


    $scope.countryCodeList = [];
    $scope.data = {};
    $scope.work = {};
    $scope.invitedMember = {};
    var fetchWorkTypes = function () {
        signUpService.fetchWorkTypes().then(function (response) {
            console.log("Work types are :");
            console.log(response);
            $scope.workTypes = response;

        }).catch(function (error) {
            console.log(error);
        });
    };
    $scope.countryCodeList = utilityService.countryList();
    $scope.addWork = function () {

        fetchWorkTypes();
        fetchCropList();
        $scope.work = {};
        $scope.enableAddressFields = false;
        $scope.work.name = "My Work Place 1";
        $scope.editWork.show();
    };

    $scope.hideWorkAddModal = function () {
        $scope.editWork.hide();
    };

    $scope.hideEditAccount = function () {
        $scope.editAccountModal.hide();
    };
    $scope.hideWorkDetailModal = function () {

        $scope.workDetailModal.hide();
        //$scope.selectedWork={};
    };

    $scope.showWorkDetailModal = function (selectedWork) {
        $scope.selectedWork = selectedWork;
        $scope.workDetailModal.show();
    };

    $scope.changeSubdivision = function (countryCode) {
        fetchStates(countryCode);
    };
    $scope.getUpdatedCountryList = function(query){
      return $filter('filter')($scope.countryCodeList,query);
    }
    $scope.getUpdatedStateList=function(query){
      return $filter('filter')($scope.subDivList,query);
    }
    var fetchStates = function (countryCode) {
        loginService.fetchStates(countryCode).then(function (response) {
            $scope.subDivList = response;
        }).catch(function (error) {
            console.log(error);
        })
    };

    $scope.updateLocationFields = function (locationWay) {
        $scope.enableAddressFields = true;
        if (locationWay == "current") {
            $scope.work.address = angular.copy($rootScope.addressDataFromCoordinate.address);
            $scope.work.city = angular.copy($rootScope.addressDataFromCoordinate.city);
            $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
            loginService.fetchStates($rootScope.addressDataFromCoordinate.userCountry.CountryCode).then(function (response) {
                $scope.subDivList = response;
                $scope.work.state = $filter('getById')($scope.subDivList,"SubdivisionCode",$rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
            }).catch(function (error) {
                console.log(error);
            })

            $scope.work.postalcode = angular.copy($rootScope.addressDataFromCoordinate.postalcode);
            // $scope.work.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
            //$scope.work.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');

            $scope.work.country = $filter('getById')($scope.countryCodeList,"CountryCode",$rootScope.addressDataFromCoordinate.userCountry.CountryCode);
        } else if (locationWay == "manual") {
            $scope.work.address = "";
            $scope.work.city = "";
            //$scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
            $scope.work.postalcode = "";
            //$scope.work.latitude = "";
            // $scope.work.longitude = "";
            $scope.work.state = "";
            $scope.work.country = "";
        } else {
            $scope.enableAddressFields = false;
        }
    };
    var saveWorkData = function (workData) {
        loginService.saveWorkData(workData).then(function (response) {
            fetchAllLocations();
            $scope.hideWorkAddModal();
            $cordovaToast.showShortBottom($filter('translate')('WORK_ADDED_SUCCESSFULLY'));
            console.log("Work added successfully.");
        }).catch(function (error) {
            console.log(error);
            $cordovaToast.showLongBottom($filter('translate')('SOMETHING_WENT_WRONG'));
        });
    };

    $scope.saveWork = function () {
        console.log($scope.data);
        var works = [];
        var location = {};
        var workTypeToSend=$filter('getByNameInMap')($scope.workTypes,'work');
        if ($scope.work.where == "manual" || $scope.work.where == "current") {
            location = {
                name: $scope.work.where == "manual" ? "Enter Address" : "My Current Location",
                //name:"My Current Location",
                latitude: angular.copy($rootScope.position ? $rootScope.position.coords.latitude : ''),
                longitude: angular.copy($rootScope.position ? $rootScope.position.coords.longitude : ''),
                address: $scope.work.address,
                city: $scope.work.city,
                subdivision_code: $scope.work.state ? $scope.work.state : '',
                country_code: $scope.work.country.countryCode,
                locationtype: "Registration Worksite",
                postalcode: $scope.work.postalcode
            };
        } else {
            //thing1.location=JSON.parse($scope.data.equipWhere);
            location = {
                name: (JSON.parse($scope.work.where)).LocationID
            }
        }
        var work = {
            //type: $scope.work.type,
           // type: "Work",
            work_type_id: workTypeToSend.value.id,
            relationship: "Owner",
            location: location
        };
        console.log(work);
        if ($scope.work.crop) {
            work.crop = $scope.work.crop;
            work.hectares = 0;
        }
        works.push(work);
        var workData = {
            works: works
        };
        console.log("work data");
        console.log(workData);
        saveWorkData(workData);

    };
});

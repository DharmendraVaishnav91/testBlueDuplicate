app.controller('addGroupCtrl', function ($timeout, $q, $scope, $state, $ionicPopup, utilityService, $stateParams, signUpService, $rootScope, $cordovaToast,$filter) {
    console.log($stateParams.groupData);
    $scope.data = $stateParams.groupData;
    $scope.isFromSetting = false;
    $scope.location = {};
    $scope.countryCodeList = utilityService.countryList();
    $scope.group={};
    var fetchGroupsType = function () {
        signUpService.fetchGroupsType().then(function (response) {
            $scope.groupsType=response;
        }).catch(function (error) {

        });
    };

    fetchGroupsType();
    //var fetchLocation = function () {
    //    signUpService.fetchAllLocation().then(function (response) {
    //        $scope.myLocations = response;
    //    }).catch(function (error) {
    //        console.log(error);
    //    });
    //};
    //fetchLocation();
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

    var saveGroupData = function (groupsData) {
        console.log(groupsData);
        signUpService.saveGroupsData(groupsData).then(function (response) {
            console.log("Group added successfully.");
            $state.go('inviteFamily');
            $cordovaToast.showShortBottom($filter('translate')('GROUP_ADDED_SUCCESSFULLY')) ;
        }).catch(function (error) {
            console.log(error);
           $cordovaToast.showLongBottom($filter('translate')('SOMETHING_WENT_WRONG'));
        });
    };

    //$scope.updateLocationFields = function (locationWay) {
    //    if (locationWay == "current") {
    //        $scope.enableAddressFields = true;
    //        $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
    //        $scope.location = {
    //            name: "My Current Location",
    //            latitude: angular.copy($rootScope.position ? $rootScope.position.coords.latitude : ''),
    //            longitude: angular.copy($rootScope.position ? $rootScope.position.coords.longitude : ''),
    //            address: angular.copy($rootScope.addressDataFromCoordinate.address),
    //            city: angular.copy($rootScope.addressDataFromCoordinate.city),
    //            subdivision_code: angular.copy($rootScope.addressDataFromCoordinate.userState.SubdivisionCode),
    //            country_code: angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode) ,
    //            postalcode: angular.copy($rootScope.addressDataFromCoordinate.userCountry.postalcode)
    //        }
    //    } else if (locationWay != "manual") {
    //        $scope.enableAddressFields = false;
    //        $scope.location = {
    //            name: (JSON.parse($scope.data.groupLocation)).LocationID
    //        };
    //    } else {
    //        $scope.enableAddressFields = true;
    //        $scope.location = {
    //            name: "Enter Address",
    //            latitude: "",
    //            longitude: "",
    //            address: "",
    //            city: "",
    //            subdivision_code:"",
    //            country_code: "",
    //            postalcode:""
    //        }
    //    }
    //};

    $scope.skipToInviteFamily = function () {
        $state.go('inviteFamily');
    };

    $scope.goToInviteFamily = function () {
        var groups = [];
        var group1 = {
            ///type: $scope.data.groupType,
            group_type_id: $scope.data.groupType,
            //relationship: $scope.data.groupRelationship,
            relationship: "Owner",
            name: $scope.data.groupName ,
            description:$scope.group.description?$scope.group.description:""
            //location:$scope.data.groupLocation
        };

        //$scope.location = {
        //    name: (JSON.parse($scope.data.groupLocation)).LocationID
        //};
        $scope.location = {
            name: "My Current Location",
            latitude: angular.copy($rootScope.position ? $rootScope.position.coords.latitude : ''),
            longitude: angular.copy($rootScope.position ? $rootScope.position.coords.longitude : ''),
            address: angular.copy($rootScope.addressDataFromCoordinate.address),
            city: angular.copy($rootScope.addressDataFromCoordinate.city),
            subdivision_code: angular.copy($rootScope.addressDataFromCoordinate.userState.SubdivisionCode),
            country_code: angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode),
            postalcode: angular.copy($rootScope.addressDataFromCoordinate.userCountry.postalcode)
        };
        group1.location = $scope.location;
        groups.push(group1);
        var groupsData = {
            groups: groups
        };

        saveGroupData(groupsData);
        console.log(groupsData);
    };
});

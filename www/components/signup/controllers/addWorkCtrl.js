app.controller('addWorkCtrl', function ($timeout, $q, $scope, $state, $ionicPopup, utilityService, $stateParams, signUpService, $rootScope, $cordovaToast) {
    console.log($stateParams.workData);
    $scope.enableCrop = false;
    $scope.isFromSetting = false;
    $scope.data = $stateParams.workData;
    $scope.work = {};
    $scope.workLocations = [];
    $scope.countryCodeList = utilityService.countryList();
    var fetchLocation = function () {
        signUpService.fetchAllLocation().then(function (response) {
            $scope.myLocations = response;
        }).catch(function (error) {
            console.log(error);
        });
    };
    fetchLocation();
    var fetchStates = function (countryCode) {
        signUpService.fetchStates(countryCode).then(function (response) {
            $scope.subDivList = response;
        }).catch(function (error) {
            console.log(error);
        })
    };
    //fetchStates($scope.data.homeCountry)
    $scope.changeSubdivision = function (countryCode) {
        fetchStates(countryCode);
    };


    var saveWorkData = function (workData) {
        signUpService.saveWorkData(workData).then(function (response) {
            console.log("Work added successfully.");
            $cordovaToast.showShortBottom("Work added successfully.");
            // $cordovaToast.showLongBottom("Work data saved successfully");
            //$scope.closeModal(openModalType.addWork);
            $state.go('addThing', {thingData: $scope.data});

        }).catch(function (error) {
            console.log(error);
            $cordovaToast.showLongBottom("Something went wrong. Please try again");
            //Remove this after demo
            //$scope.openModal(openModalType.addThing);
        });

    };
    $scope.skipToThing = function () {
        $state.go('addThing', {thingData: $scope.data});
    };
    //Change address fields according user choice
    $scope.updateLocationFields = function (locationWay) {
        $scope.enableAddressFields = true;
        if (locationWay == "current") {
            $scope.work.address = angular.copy($rootScope.addressDataFromCoordinate.address);
            $scope.work.city = angular.copy($rootScope.addressDataFromCoordinate.city);
            $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

            $scope.work.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
            $scope.work.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
            $scope.data.workState = angular.copy($rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
            $scope.data.workCountry = angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
        } else if(locationWay=="manual") {
            $scope.work.address = "";
            $scope.work.city = "";
            //$scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

            $scope.work.latitude = "";
            $scope.work.longitude = "";
            $scope.data.workState = "";
            $scope.data.workCountry = "";
        }else{
            $scope.enableAddressFields=false;
        }
    };
    $scope.goToThing = function () {
        console.log($scope.data);
        var works = [];
        var location ={};
        if($scope.work.where=="manual"||$scope.work.where=="current") {
            location={
                name:$scope.work.where=="manual"?"Enter Address":"My Current Location",
                latitude: $scope.work.latitude,
                longitude: $scope.work.longitude,
                address: $scope.work.address,
                city: $scope.work.city,
                subdivision_code: $scope.data.workState ? $scope.data.workState : '',
                country_code: $scope.data.workCountry
            }
        }else{
            //thing1.location=JSON.parse($scope.data.equipWhere);
            location = {
                name: (JSON.parse($scope.work.where)).LocationID
            }
        }
        var work = {
            type: $scope.data.type,
            relationship: $scope.data.relationship,
            location: location
        };
        works.push(work);
        var workData = {
            works: works
        };
        console.log("work data");
        console.log(workData);
        //$scope.workLocations.push(location1);
        saveWorkData(workData);
        console.log(workData);
    };
});

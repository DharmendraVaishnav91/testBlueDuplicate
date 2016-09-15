app.controller('addThingCtrl', function($timeout,$q,$scope,$state,$ionicPopup,utilityService,$stateParams,signUpService,$rootScope,$cordovaToast) {

    console.log($stateParams.thingData);
    $scope.data = $stateParams.thingData;
    $scope.isFromSetting = false;
    $scope.countryCodeList = utilityService.countryList();
    $scope.thing={};
    var fetchThingsType = function () {
        signUpService.fetchThingsType().then(function (response) {
            $scope.thingsType=response;
        }).catch(function (error) {

        });
    };

    fetchThingsType();
    var fetchCropList = function(){
        signUpService.fetchProductsList().then(function(response){
            $scope.productList=response;
        }).catch(function(error){
            console.log(error);
        });
    };
    fetchCropList();
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
    fetchStates($scope.data.homeCountry);
    $scope.changeSubdivision = function (countryCode) {
        fetchStates(countryCode);
    };

    $scope.workTypeChange =function(){
        $scope.enableCrop=$scope.thing.equipType=='Agricultural & forest machinery (tractors)';
    };
    var saveThingsData = function (thingsData) {
        signUpService.saveThingsData(thingsData).then(function (response) {
            $state.go('addGroup', {groupData: $scope.data});
            console.log("Equipment added successfully.");
           $cordovaToast.showShortBottom("Equipment added successfully.");
        }).catch(function (error) {
            console.log(error);
            $cordovaToast.showLongBottom("Something went wrong. Please try again");
        });
    };

    $scope.skipToGroup = function () {
        $state.go('addGroup', {groupData: $scope.data});
    };

    //Change address fields according user choice
    $scope.updateLocationFields = function (locationWay) {
        $scope.enableAddressFields = true;
        if (locationWay == "current") {
            $scope.thing.address = angular.copy($rootScope.addressDataFromCoordinate.address);
            $scope.thing.city = angular.copy($rootScope.addressDataFromCoordinate.city);
            $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

            $scope.thing.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
            $scope.thing.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
            $scope.thing.state = angular.copy($rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
            $scope.thing.country = angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
        } else if(locationWay == "manual") {
            $scope.thing.address ="";
            $scope.thing.city = "";
            //$scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

            $scope.thing.latitude = "";
            $scope.thing.longitude = "";
            $scope.thing.state = "";
            $scope.thing.country = "";
        } else{
            $scope.enableAddressFields=false;
        }
    };
    $scope.goToGroup = function () {
        var things = [];
        var thing1 = {
            equipment_type: $scope.thing.equipType,
            relationship: $scope.thing.equipRelationship
            //location:$scope.data.equipWhere
        };
        if($scope.thing.haveThingId="have"){
            thing1.thing_identification="has_thing_id";
            thing1.thing_id= $scope.thing.thingId;
            thing1.thing_id_type=$scope.thing.thingIdType
        }else{
            thing1.thing_identification="";
        }
        if($scope.thing.equipType=='Agricultural & forest machinery (tractors)'){
            thing1.crop=$scope.thing.crop.H3Code;
            thing1.hectares=$scope.thing.hectare;
        }
        if($scope.thing.where=="manual"||$scope.thing.where=="current") {
            thing1.location={
                name:$scope.thing.where=="manual"?"Enter Address":"My Current Location",
                latitude: $scope.thing.latitude,
                longitude: $scope.thing.longitude,
                address: $scope.thing.address,
                city: $scope.thing.city,
                subdivision_code: $scope.thing.state ? $scope.thing.state : '',
                country_code: $scope.thing.country
            }
        }else{
            //thing1.location=JSON.parse($scope.data.equipWhere);
            thing1.location = {
                name: (JSON.parse($scope.thing.where)).LocationID
            }
        }
        ////Equipment have location other than existing one
        //if ($scope.thing.equipWhere == 'OtherThingLocation') {
        //    thing1.location = {
        //        name: "Thing1",
        //        latitude: $rootScope.position ? $rootScope.position.coords.latitude : '',
        //        longitude: $rootScope.position ? $rootScope.position.coords.longitude : '',
        //        address: $scope.data.otherThingAddress,
        //        city: $scope.data.otherThingCity,
        //        subdivision_code: $scope.data.otherThingState ? $scope.data.otherThingState.SubdivisionCode : '',
        //        country_code: $scope.data.otherThingCountry.CountryCode
        //
        //    };
        //
        //} else {
        //    //thing1.location=JSON.parse($scope.data.equipWhere);
        //    thing1.location = {
        //        name: (JSON.parse($scope.data.equipWhere)).LocationID
        //    }
        //}

        things.push(thing1);
        var thingsData = {
            things: things
        };
        saveThingsData(thingsData);
    };
});

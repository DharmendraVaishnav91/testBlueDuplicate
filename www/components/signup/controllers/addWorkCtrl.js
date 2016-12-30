app.controller('addWorkCtrl', function ($timeout, $q, $scope, $state, $ionicPopup, utilityService, $stateParams, signUpService, $rootScope, $cordovaToast,$filter) {
    console.log($stateParams.workData);
    $scope.enableCrop = false;
    $scope.isFromSetting = false;
    $scope.data = $stateParams.workData;
    $scope.work = {};
    $scope.work.name=$filter('translate')("MY_WORK_PLACE_1");
    $scope.workLocations = [];
    // $scope.countryCodeList = utilityService.countryList();
    utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
        $scope.countryCodeList = response;
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    var fetchWorkTypes= function () {
        signUpService.fetchWorkTypes().then(function (response) {
            console.log("Work types are :");
            console.log(response);
            $scope.workTypes=response;
        }).catch(function (error) {
           console.log(error);
        });
    };
    $scope.getSearchedCountryList=function(query){
      return $filter('filter')($scope.countryCodeList,query);
    } ;

    fetchWorkTypes();
    var fetchCropList = function(){
        signUpService.fetchProductsList().then(function(response){
            $scope.productList=response;
        }).catch(function(error){
            console.log(error);
        });
    };
    fetchCropList();
    $scope.getUpdatedProductList=function(query){
      return $filter('filter')($scope.productList,query);
    };

    //var fetchLocation = function () {
    //    signUpService.fetchAllLocation().then(function (response) {
    //        $scope.myLocations = response;
    //        angular.forEach(response, function (location) {
    //            if(location.LocationName=='Home'){
    //                $scope.home=angular.copy(location);
    //                console.log("HOme");
    //                console.log($scope.home);
    //            }
    //        });
    //    }).catch(function (error) {
    //        console.log(error);
    //    });
    //};
    //fetchLocation();
    var fetchStates = function (countryCode) {
        signUpService.fetchStates(countryCode).then(function (response) {
            $scope.data.workState=null;
            $scope.subDivList = response;
        }).catch(function (error) {
            console.log(error);
        })
    };
    //fetchStates($scope.data.homeCountry)
    $scope.changeSubdivision = function (callback) {
      console.log(callback);
        fetchStates(callback);
    };

    var saveWorkData = function (workData) {
        signUpService.saveWorkData(workData).then(function (response) {
            console.log("Work added successfully.");
            $state.go('addThing', {thingData: $scope.data});
            $cordovaToast.showShortBottom($filter('translate')('WORK_ADDED_SUCCESSFULLY'));

        }).catch(function (error) {
            console.log(error);
            $cordovaToast.showShortBottom($filter('translate')('SOMETHING_WENT_WRONG'));
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
            $scope.work.postalcode=angular.copy($rootScope.addressDataFromCoordinate.postalcode);
            //$scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
            signUpService.fetchStates($rootScope.addressDataFromCoordinate.userCountry.CountryCode).then(function (response) {
                $scope.subDivList = response;
                $scope.data.workState = $filter('getById')($scope.subDivList,"SubdivisionCode",$rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
            }).catch(function (error) {
                console.log(error);
            });
            //$scope.work.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
            //$scope.work.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');

            $scope.data.workCountry = $filter('getById')($scope.countryCodeList,"CountryCode",$rootScope.addressDataFromCoordinate.userCountry.CountryCode); //angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
        } else if(locationWay=="manual") {
            $scope.work.address = "";
            $scope.work.city = "";
            //$scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
            $scope.work.postalcode="";
            //$scope.work.latitude = "";
            //$scope.work.longitude = "";
            $scope.data.workState = "";
            $scope.data.workCountry = "";
        }else{
            $scope.enableAddressFields=false;
        }
    };
    $scope.getUpdatedStateList=function(query){
      return $filter('filter')($scope.subDivList,query);
    };
    $scope.goToThing = function () {
        console.log($scope.data);
        var works = [];
        var location ={};
        var workTypeToSend=$filter('getByNameInMap')($scope.workTypes,'work');
        if($scope.work.where=="manual"||$scope.work.where=="current") {
            location={
                name:$scope.work.where=="manual"?"Enter Address":"My Current Location",
                latitude: angular.copy($rootScope.position ? $rootScope.position.coords.latitude : ''),
                longitude: angular.copy($rootScope.position ? $rootScope.position.coords.longitude : ''),
                address: $scope.work.address,
                city: $scope.work.city,
                subdivision_code: $scope.data.workState ? $scope.data.workState.SubdivisionCode : '',
                country_code: $scope.data.workCountry.CountryCode,
                locationtype:"Registration Worksite",
                postalcode:$scope.work.postalcode
            }
        }else{
            //thing1.location=JSON.parse($scope.data.equipWhere);

            location = {
                name: (JSON.parse($scope.work.where)).LocationID
            };
        }
        var work = {
            //type: $scope.data.type,
            name:$scope.work.name?$scope.work.name:"",
           // type: "Work",
            work_type_id: workTypeToSend.value.id,
            relationship:"Owner",
            location: location
        };
        if($scope.work.crop){
            work.crop=$scope.work.crop.H3Code;
            work.hectares=0;
        }
        works.push(work);
        var workData = {
            works: works
        };
        work.name=$scope.work.name;
        console.log("work data");
        console.log(workData);
        saveWorkData(workData);
    };
});

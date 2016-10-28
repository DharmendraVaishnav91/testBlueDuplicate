/**
 * Created by dharmendra on 26/8/16.
 */
userSetting.controller('WorkEquipmentsCtrl', function($scope,$state,$ionicModal,userSettingService,loginService,utilityService,$rootScope,$cordovaToast,signUpService,$filter) {


    $scope.isFromSetting=true;
    $scope.data={};
    $scope.thingFind = true;
    $scope.backToAccount= function () {
        $state.go('app.setting');
    };
    var fetchLocation= function () {
        loginService.fetchAllLocation().then(function(response){
            $scope.myLocations=response;
        }).catch(function(error){
            console.log(error);
        });
    };
    var fetchThingsType = function () {
        signUpService.fetchThingsType().then(function (response) {
            $scope.thingsType=response;
        }).catch(function (error) {

        });
    };
    var fetchCropList = function(){
        signUpService.fetchProductsList().then(function(response){
            $scope.productList=response;
        }).catch(function(error){
            console.log(error);
        });
    };

    fetchThingsType();
    $ionicModal.fromTemplateUrl('components/login/views/addThingModal.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.addThingModal= modal;
    });
    $ionicModal.fromTemplateUrl('components/setting/views/thingDetail.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.thingDetailModal= modal;
    });
    $scope.workTypeChange =function(){
        $scope.enableCrop=$scope.thing.equipType=='Agricultural & forest machinery (tractors)';
    };
    $scope.countryCodeList=utilityService.countryList();

    var fetchThings= function () {
        userSettingService.fetchAllThings().then(function (response) {
            console.log("User all groups");
            console.log(response);
            $scope.things=response;
            $scope.thingFind =$scope.things.length != 0;
        }).catch(function (error) {
            console.log(error);
        })
    };
    fetchThings();

    var fetchThingInfo= function (assetId) {
        userSettingService.fetchThingInfo(assetId).then(function (response) {
            console.log("Group details");
            console.log(response);
            $scope.curSelThingFullDetail=response;
        }).catch(function (error) {
            console.log(error);
        })
    };
    $scope.showThingInfo= function (thing) {
        var assetId=thing.AssetID;
        fetchThingInfo(assetId);
        $scope.curSelThing=thing;
        $scope.thingDetailModal.show();
    };
    $scope.hideThingsDetails = function () {
        $scope.thingDetailModal.hide();
    };
    $scope.hideThingAddModal = function () {
        $scope.addThingModal.hide();
    };
    $scope.addNewThing = function () {
        fetchLocation();
        fetchCropList();
        //$scope.data={};
        $scope.thing={};
        $scope.enableAddressFields=false;
        $scope.enableCrop=false;
        $scope.addThingModal.show();
    };
    //Change address fields according user choice
    $scope.updateLocationFields = function (locationWay) {
        $scope.enableAddressFields = true;
        if (locationWay == "current") {
            $scope.thing.address = angular.copy($rootScope.addressDataFromCoordinate.address);
            $scope.thing.city = angular.copy($rootScope.addressDataFromCoordinate.city);
            $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
            //$scope.thing.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
            //$scope.thing.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
            $scope.thing.state = angular.copy($rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
            $scope.thing.country = angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
        } else if(locationWay == "manual") {
            $scope.thing.address ="";
            $scope.thing.city = "";
            //$scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

            //$scope.thing.latitude = "";
            //$scope.thing.longitude = "";
            $scope.thing.state = "";
            $scope.thing.country = "";
        } else{
            $scope.enableAddressFields=false;
        }
    };
     $scope.thing={};
     $scope.createThing = function () {
         var asset_details=[];
         $scope.thing.address = angular.copy($rootScope.addressDataFromCoordinate.address);
         $scope.thing.city = angular.copy($rootScope.addressDataFromCoordinate.city);
         $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
         //$scope.thing.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
         //$scope.thing.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
         $scope.thing.state = angular.copy($rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
         $scope.thing.country = angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
         var thing1={
             //type:$scope.thing.equipType,
             //asset_relationship:$scope.thing.equipRelationship,
             equipment_id:$scope.thing.equipType,
             asset_relationship:"Owner",
             asset_name:$scope.thing.assetName
         };
         //Equipment have location other than existing one
         //if($scope.thing.where=="manual"||$scope.thing.where=="current") {
             thing1.location={
                // location_name:$scope.thing.where=="manual"?"Enter Address":"My Current Location",
                 location_name:"My Current Location",
                 latitude:$rootScope.position?$rootScope.position.coords.latitude:'',
                 longitude:$rootScope.position?$rootScope.position.coords.longitude:'',
                 address:$scope.thing.address,
                 city:$scope.thing.city,
                 subdivision_code:$scope.thing.state,
                 country_code:$scope.thing.country,
                 locationtype:"Registration Thing"
             };

         //}else{
         //    //thing1.location=JSON.parse($scope.data.equipWhere);
         //    thing1.location={
         //        location_name:(JSON.parse($scope.thing.where)).LocationID
         //    }
         //}
         //if($scope.thing.equipType=='Agricultural & forest machinery (tractors)'){
         //    thing1.type_details={0:{
         //        crop:""+$scope.thing.crop.H3Code,
         //        hectare:$scope.thing.hectare
         //    }};
         //    //thing1.type_details.0.crop=$scope.thing.crop.H3Code;
         //    //thing1.type_details.hectare=$scope.thing.hectare;
         //    thing1.hectares=$scope.thing.hectare;
         //}
         asset_details.push(thing1);
         var assetData={
             actorid:$rootScope.user.ActorID,
             bluenumberid:$rootScope.userInfo.person.actor_bluenumber,
             asset_details:asset_details
         };
         userSettingService.saveAsset(assetData).then(function (response) {
               console.log("Asset create success.");
               console.log(response);
             fetchThings();
           //  $scope.data={};
           //  $scope.thing={};
           //  $scope.enableAddressFields=false;
           //  $scope.enableCrop=false;
             $scope.hideThingAddModal();
             $cordovaToast.showLongBottom($filter('translate')('ASSET_CREATE_SUCCESSFULLY'));


         }).catch(function (error) {
            console.log(error);
             $cordovaToast.showLongBottom($filter('translate')('SOMETHING_WENT_WRONG'));
         })
     } ;
    $scope.changeSubdivision=function(selectedCountry){
        fetchStates(selectedCountry);
    };

    var fetchStates= function (countryCode) {
        loginService.fetchStates(countryCode).then(function (response) {
            $scope.subDivList=response;
        }).catch(function(error){
            console.log(error);
        })
    };

});

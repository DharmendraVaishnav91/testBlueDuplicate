/**
 * Created by dharmendra on 26/8/16.
 */
userSetting.controller('WorkEquipmentsCtrl', function($scope,$state,$ionicModal,userSettingService,loginService,utilityService,$rootScope,$cordovaToast,signUpService) {


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
        $scope.enableCrop=$scope.data.equipType=='Agricultural & forest machinery (tractors)';
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
        $scope.addThingModal.show();
    };
     $scope.thing={};
     $scope.createThing = function () {
         var asset_details=[];
         var thing1={
             type:$scope.data.equipType,
             asset_relationship:$scope.data.equipRelationship,
             asset_name:$scope.data.assetName
         };
         //Equipment have location other than existing one
         if($scope.data.equipWhere=='OtherThingLocation') {
             thing1.location={
                 location_name:"Enter Address",
                 locationtype:"",
                 latitude:$rootScope.position?$rootScope.position.coords.latitude:'',
                 longitude:$rootScope.position?$rootScope.position.coords.longitude:'',
                 address:$scope.data.otherThingAddress,
                 city:$scope.data.otherThingCity,
                 subdivision_code:$scope.data.otherThingState?$scope.data.otherThingState.SubdivisionCode:'',
                 country_code:$scope.data.otherThingCountry.CountryCode

             };

         }else{
             //thing1.location=JSON.parse($scope.data.equipWhere);
             thing1.location={
                 location_name:(JSON.parse($scope.data.equipWhere)).LocationID
             }
         }
         if($scope.data.equipType=='Agricultural & forest machinery (tractors)'){
             thing1.type_details={0:{
                 crop:""+$scope.thing.crop.H3Code,
                 hectare:$scope.thing.hectare
             }};
             //thing1.type_details.0.crop=$scope.thing.crop.H3Code;
             //thing1.type_details.hectare=$scope.thing.hectare;
             thing1.hectares=$scope.thing.hectare;
         }
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
             $cordovaToast.showLongBottom("Asset created successfully.");
             $scope.hideThingAddModal();


         }).catch(function (error) {
            console.log(error);
             $cordovaToast.showLongBottom("Something went wrong, please try after some time.");
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

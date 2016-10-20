/**
 * Created by dharmendra on 12/8/16.
 */

var appUtilityServices = angular.module("app.utility.services", []);

appUtilityServices.factory('utilityService',function($http,$localStorage,$ionicPopup,$q,$rootScope,$cordovaCamera,$cordovaGeolocation,$filter,$ionicLoading) {

    var utilityService = {};
    utilityService.sendAppInviteToFriend = function (inviteData) {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.inviteFriend,
            method:HttpRequestType.POST,
            data:inviteData,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    utilityService.sendBulkInviteToFriend = function (inviteData) {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.bulkInvite,
            method:HttpRequestType.POST,
            data:inviteData,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    utilityService.fetchAddressFromCoords = function (coords) {
       var coordData={
           latitude:coords.latitude,
           longitude:coords.longitude
       } ;
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchAddressFromCoordinates,
            method:HttpRequestType.POST,
            data:coordData,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    } ;
    utilityService.countryList= function (selectedLanguage) {
        if($localStorage[STORAGE.COUNTRIES]==null || $localStorage[STORAGE.COUNTRIES]==undefined){
            var deferred = $q.defer();
            var req={
                url:HttpRoutes.fetchCountryCode,
                method:HttpRequestType.GET
            };
            if(selectedLanguage!=null){
                req.url+="?locale="+selectedLanguage;
            }
            utilityService.makeHTTPRequest(req,deferred).then(function (countryList) {
                $localStorage[STORAGE.COUNTRIES]=countryList;
                return  $localStorage[STORAGE.COUNTRIES];
            });

        }else{
            return $localStorage[STORAGE.COUNTRIES];
        }

    };
    utilityService.getCountryList= function (selectedLanguage) {
        var deferred = $q.defer();
        //if($localStorage[STORAGE.COUNTRIES]==null || $localStorage[STORAGE.COUNTRIES]==undefined){

            var req={
                url:HttpRoutes.fetchCountryCode,
                method:HttpRequestType.GET
            };
            if(selectedLanguage!=null){
                req.url+="?locale="+selectedLanguage;
            }
            utilityService.makeHTTPRequest(req,deferred).then(function (countryList) {
                $localStorage[STORAGE.COUNTRIES]=countryList;
                deferred.resolve($localStorage[STORAGE.COUNTRIES]);
            });

        //}else{
        //     deferred.resolve($localStorage[STORAGE.COUNTRIES]);
        //}
        return deferred.promise;
    };

    utilityService.getPosition= function () {
        var posOptions = {timeout: 60000, enableHighAccuracy: true};
        var coordinates = null;
        var deferred= $q.defer();
       // $ionicLoading.show("Loading");
        $cordovaGeolocation.getCurrentPosition(posOptions)
            .then(function (position) {
                coordinates=position;
                deferred.resolve(coordinates);
                //$ionicLoading.hide();
            }, function(err) {
                console.log("Unable to fetch location "+err);
                deferred.reject(err);
                //$ionicLoading.hide();
            });
        return deferred.promise;
    };

    utilityService.makeHTTPRequest=function(req,deferred){

        $http(req).then(function(response){
            console.log("Response Data");
            console.log(response);
            deferred.resolve(response.data);
        }).catch(function(error) {
            deferred.reject(error.data);
        });
        return deferred.promise;
    };
    utilityService.fetchLanguageStrings=function(langName){
        var deferred = $q.defer();
        var req={
            url:'assets/locale/'+langName+".json",
            method:HttpRequestType.GET
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    function goToNextStep(obj){
        angular.forEach(obj, function(value1, key1) {
          if(typeof value1 === 'string'){
           $scope.error += value1 + ",\n";
           $scope.value = value1;
          }
          else if(Array.isArray(value1)){
             value = value1;
             for(var i=0; i<value1.length; i++){
                 errorMessage += (key1 + " " + value1[i] + ",\n");
             }
          }
          else{
              key = key1;
              value = value1;
          }
       });
    }
    utilityService.getErrorMessage = function(error){
      var errorMessage = "";
      var value;
      var key;
      if(typeof error === 'object'){
     	   if(error.error_status){
              delete error['error_status']
              while(!Array.isArray(error) && (typeof error !== 'string')){
                 goToNextStep(error);
                 error = value;
              }
            }
      }
      return errorMessage;
    }
    utilityService.getImage = function(cameraOptions) {
        var deferred = $q.defer();
        var scope = $rootScope.$new();
        var imageOptions = $ionicPopup.show({
            templateUrl:'components/common/views/imageSelectOptions.html',
            title:$filter('translate')('CHOOSE_IMAGE_SOURCE'),
            scope:scope,
            buttons: [
                { text: $filter('translate')('CANCEL') }
            ]
        });

        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation:true
        };
        //var options = cameraOptions || {
        //        quality: 100,
        //        destinationType: Camera.DestinationType.DATA_URL,
        //        sourceType: Camera.PictureSourceType.CAMERA,
        //        allowEdit: true,
        //        encodingType: Camera.EncodingType.JPEG,
        //        saveToPhotoAlbum: false,
        //        correctOrientation:true
        //    };

        function getPic() {
            ionic.Platform.ready(function() {
                $cordovaCamera.getPicture(options).then(function(imageData) {
                    deferred.resolve(imageData);
                }, function(err) {
                    // error
                    deferred.reject(err);
                });
            })
        }

        scope.uploadImage = function(source) {
            imageOptions.close();
            if(source == 'Camera') {
                //Code to open Camera
                getPic();
                //deferred.resolve('Image from Camera');
            } else if(source == 'Gallery') {
                //Code to open Gallery
                options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
                getPic();
            }
        };

        return deferred.promise;
    };
    return utilityService;
});

/**
 * Created by dharmendra on 12/8/16.
 */

var appUtilityServices = angular.module("app.utility.services", []);

appUtilityServices.factory('utilityService',function($http,$localStorage,$ionicPopup,$q,$rootScope,$cordovaCamera,$cordovaGeolocation) {

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

    utilityService.countryList= function () {
        if($localStorage[STORAGE.COUNTRIES]==null || $localStorage[STORAGE.COUNTRIES]==undefined){
            var deferred = $q.defer();
            var req={
                url:HttpRoutes.fetchCountryCode,
                method:HttpRequestType.GET
            };
            utilityService.makeHTTPRequest(req,deferred).then(function (countryList) {
                $localStorage[STORAGE.COUNTRIES]=countryList;
                return  $localStorage[STORAGE.COUNTRIES];
            });

        }else{
            return $localStorage[STORAGE.COUNTRIES];
        }

    };

    utilityService.getPosition= function () {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        var coordinates = null;
        var deferred= $q.defer();
        $cordovaGeolocation.getCurrentPosition(posOptions)
            .then(function (position) {
                coordinates=position;
                deferred.resolve(coordinates);
            }, function(err) {
                
                console.log("Unable to fetch location "+err);
                deferred.resolve(null);
            });
        return deferred.promise;
    };

    utilityService.makeHTTPRequest=function(req,deferred){

        $http(req).then(function(response){
            console.log("Response Data");
            console.log(response);
            deferred.resolve(response.data);
        }).catch(function(error) {
            deferred.reject(error);
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
    utilityService.getImage = function(cameraOptions) {
        var deferred = $q.defer();
        var scope = $rootScope.$new();
        var imageOptions = $ionicPopup.show({
            templateUrl:'components/common/views/imageSelectOptions.html',
            title: 'Choose Image Source',
            scope:scope,
            buttons: [
                { text: 'Cancel' }
            ]
        });

        //var options = {
        //    quality: 50,
        //    destinationType: Camera.DestinationType.DATA_URL,
        //    sourceType: Camera.PictureSourceType.CAMERA,
        //    allowEdit: true,
        //    encodingType: Camera.EncodingType.JPEG,
        //    targetWidth: 100,
        //    targetHeight: 100,
        //    popoverOptions: CameraPopoverOptions,
        //    saveToPhotoAlbum: false,
        //    correctOrientation:true
        //};
        var options = cameraOptions || {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };

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
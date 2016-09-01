/**
 * Created by dharmendra on 12/8/16.
 */

var appUtilityServices = angular.module("app.utility.services", []);

appUtilityServices.factory('utilityService',function($http,$ionicPopup,$q,$rootScope,$cordovaCamera) {

    var utilityService = {};

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
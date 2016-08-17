/**
 * Created by dharmendra on 12/8/16.
 */

var appUtilityServices = angular.module("app.utility.services", []);

appUtilityServices.factory('utilityService',function($http,$ionicPopup,$q,$rootScope) {

    var utilityService = {};

    utilityService.makeHTTPRequest=function(req,deferred){

        $http(req).then(function(response){
            deferred.resolve(response.data);
        }).catch(function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
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

        var options = cameraOptions || {
                quality: 100,
                destinationType: Camera.DestinationType.NATIVE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                saveToPhotoAlbum: true,
                mediaType:Camera.MediaType.PICTURE
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
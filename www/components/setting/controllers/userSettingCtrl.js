/**
 * Created by dharmendra on 23/8/16.
 */
var userSetting = angular.module('app.userSetting',[]);
userSetting.controller('UserSettingCtrl', function($rootScope,$scope,$state,$ionicModal,$localStorage,utilityService,userSettingService) {

    $scope.isFromSetting=true;
    var updatedImage='';
    $ionicModal.fromTemplateUrl('components/setting/views/editAccount.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.editAccountModal= modal;

    });
    var myPopup=null;
    $scope.showPopup = function(position) {
        $scope.data = {};
        // An elaborate, custom popup
        myPopup = $ionicPopup.show({
            title: 'Warning',
            template: '<span style="font-size: 18px;">Location must be enabled to continue, please go to setting to enable this.</span>',
            scope: $scope,
            cssClass:'custom-title',
            buttons: [
                {
                    text: 'Cancel',
                    onTap: function(){
                        ionic.Platform.exitApp();
                    }
                },
                {
                    text: '<b>Go to settings</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if(typeof cordova.plugins.settings.openSetting != undefined){
                            cordova.plugins.settings.open(function(){
                                    console.log("opened settings")  ;

                                },
                                function(){

                                });
                        }
                    }
                }
            ]
        });
    };
    var isLocationEnabled= function () {
        //var deferred=$q.defer();
        if (window.cordova) {
            cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
                if (enabled == false) {
                    $scope.isLocationOn = false;
                    $scope.showPopup();
                } else {
                    $scope.isLocationOn = true;
                    utilityService.getPosition().then(function (position) {
                        $rootScope.position = position;
                        utilityService.fetchAddressFromCoords($rootScope.position.coords).then(function (addr) {

                            $rootScope.addressDataFromCoordinate.userCountry={
                                CountryName:addr.country!=null?addr.country:"",
                                CountryCode:addr.country_code!=null?addr.country_code:"",
                                CountryPhoneCode:""
                            };
                            $rootScope.addressDataFromCoordinate.userState={
                                SubdivisionID:"",
                                SubdivisionCode:addr.province_code!=null?addr.province_code:"",
                                SubdivisionName:addr.state!=null?addr.state:"" ,
                                CountryCode:$rootScope.addressDataFromCoordinate.userCountry.CountryCode,
                                CountryName:$rootScope.addressDataFromCoordinate.userCountry.CountryName
                            };

                            $rootScope.addressDataFromCoordinate.city=angular.copy(addr.sub_state!=null?addr.sub_state:"");
                            $rootScope.addressDataFromCoordinate.address= angular.copy(addr.street_number!=null?addr.street_number:"");
                            $rootScope.addressDataFromCoordinate.address+=angular.copy(addr.street_address!=null?addr.street_address:"");
                        }).catch(function (error) {
                            console.log(error);
                        });
                    });
                }
            }, function (error) {
                console.log("Error in getting location: " + error);
            });
        }
        return $scope.isLocationOn;
    };
    isLocationEnabled();
    //if($rootScope.position==null||$rootScope.position==undefined){
    //    utilityService.getPosition().then(function (position) {
    //        $rootScope.position=position;
    //        console.log("position in scope");
    //        console.log($rootScope.position);
    //    });
    //}

    $scope.goToEditAccount= function(){
        userSettingService.fetchUserInfo($rootScope.user.ActorID).then(function(response){
            console.log("User personal details");
            console.log(response);
            $scope.userPersonalInfo=response;
            $scope.person= angular.copy($scope.userPersonalInfo.person);
            $scope.editAccountModal.show();
        });
    };
    $scope.changeImage= function(){
        utilityService.getImage().then(function(src) {
            updatedImage = "data:image/png;base64," +src;
            $scope.updateImageSrc = updatedImage;

        },function(err) {
            console.log(JSON.stringify(err));
        })
    };
    $scope.updateProfile = function () {
        if(updatedImage!=''){
            $scope.person.image=updatedImage;
        }
        userSettingService.updateUserInfo($scope.person).then(function(response){
            console.log("User personal details updated successfully");
            console.log(response);
            $scope.person= angular.copy($scope.userPersonalInfo.person);
            if(response.image!=null){
                $rootScope.profileUrl=response.image;
            }
            $scope.editAccountModal.hide();
        });
    };
    $scope.hideEditAccount =function(){
        $scope.editAccountModal.hide();
    };

    $scope.goToWorkPlaces=function(){
        $state.go('app.workPlaces');
    };

    $scope.goToThings=function(){
        $state.go('app.workEquipments');
    };
    $scope.goToManageFamily=function(){
        $state.go('app.manageFamily');
    };
    $scope.goToManageGroup=function(){
        $state.go('app.manageGroups');
    };
    var removeUser= function () {
        $localStorage[STORAGE.LOGIN_KEY]=null;
    };
    // Open the login modal
    $scope.logout = function(){
        loginService.doLogout().then(function(response) {
            removeUser();
            $state.go('login');
        }).catch(function(error){
            console.log(error);
        });
    };
});

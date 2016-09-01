/**
 * Created by dharmendra on 23/8/16.
 */
var userSetting = angular.module('app.userSetting',[]);
userSetting.controller('UserSettingCtrl', function($rootScope,$scope,$state,$ionicModal,$localStorage,utilityService,userSettingService) {

    $scope.isFromSetting=true;
    $ionicModal.fromTemplateUrl('components/setting/views/editAccount.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.editAccountModal= modal;

    });
    if($rootScope.position==null||$rootScope.position==undefined){
        utilityService.getPosition().then(function (position) {
            $rootScope.position=position;
            console.log("position in scope");
            console.log($rootScope.position);
        });
    }

    $scope.goToEditAccount= function(){
        userSettingService.fetchUserInfo($rootScope.user.ActorID).then(function(response){
            console.log("User personal details");
            console.log(response);
            $scope.userPersonalInfo=response;
            $scope.person= angular.copy($scope.userPersonalInfo.person);
            $scope.editAccountModal.show();
        });
    };
    $scope.updateProfile = function () {
        userSettingService.updateUserInfo($scope.person).then(function(response){
            console.log("User personal details updated successfully");
            console.log(response);
            $scope.person= angular.copy($scope.userPersonalInfo.person);
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

/**
 * Created by dharmendra on 23/8/16.
 */
var userSetting = angular.module('app.userSetting',[]);
userSetting.controller('UserSettingCtrl', function($scope,$state,$ionicModal,$localStorage) {

    $scope.isFromSetting=true;
    $ionicModal.fromTemplateUrl('components/setting/views/editAccount.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.editAccountModal= modal;

    });


    $scope.goToEditAccount= function(){
       $scope.editAccountModal.show();
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

/**
 * Created by dharmendra on 26/8/16.
 */
userSetting.controller('WorkEquipmentsCtrl', function($scope,$state,$ionicModal) {


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
    }

});

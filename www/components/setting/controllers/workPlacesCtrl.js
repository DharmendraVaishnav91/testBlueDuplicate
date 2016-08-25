/**
 * Created by dharmendra on 24/8/16.
 */
userSetting.controller('WorkPlacesCtrl', function($scope,$state,$ionicModal) {


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

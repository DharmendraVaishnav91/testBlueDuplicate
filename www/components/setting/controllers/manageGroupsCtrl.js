/**
 * Created by dharmendra on 26/8/16.
 */
userSetting.controller('ManageGroupsCtrl', function($scope,$state,$ionicModal) {


    $ionicModal.fromTemplateUrl('components/login/views/addGroup.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.editGroup= modal;
    });
    $scope.showEditGroup= function () {
      $scope.editGroup.show();
    };
    $scope.goToEditAccount= function(){
        $scope.editAccountModal.show();
    };
    $scope.hideEditAccount =function(){
        $scope.editAccountModal.hide();
    }

});

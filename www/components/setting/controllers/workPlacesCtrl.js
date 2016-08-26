/**
 * Created by dharmendra on 24/8/16.
 */
userSetting.controller('WorkPlacesCtrl', function($scope,$state,$ionicModal) {


    $ionicModal.fromTemplateUrl('components/login/views/addWork.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.editWork= modal;
    });

    $scope.showEditWork= function(){
      $scope.editWork.show();
    };
    $scope.goToEditAccount= function(){
        $scope.editAccountModal.show();
    };
    $scope.hideEditAccount =function(){
        $scope.editAccountModal.hide();
    }
});

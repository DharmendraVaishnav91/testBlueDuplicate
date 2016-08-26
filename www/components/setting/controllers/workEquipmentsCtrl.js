/**
 * Created by dharmendra on 26/8/16.
 */
userSetting.controller('WorkEquipmentsCtrl', function($scope,$state,$ionicModal) {


    $ionicModal.fromTemplateUrl('components/login/views/addThing.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.editThing= modal;
    });
    $scope.showEditThing= function () {
        $scope.editThing.show();
    };
    $scope.goToEditAccount= function(){
        $scope.editAccountModal.show();
    };
    $scope.hideEditAccount =function(){
        $scope.editAccountModal.hide();
    }

});

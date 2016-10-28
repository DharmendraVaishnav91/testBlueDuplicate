/**
 * Created by dharmendra on 24/8/16.
 */
userSetting.controller('InviteCtrl', function($scope,$state,$ionicModal) {

	$scope.goToInviteFriend=function(){
            $state.go('app.inviteFriend');
        };
    $scope.goToBulkInvite=function(){
        $state.go('app.bulkInvite');
    };

});

/**
 * Created by dharmendra on 15/9/16.
 */
userSetting.controller('GroupInvitationsCtrl', function(inviteService,$scope,$state,$ionicModal,utilityService,$cordovaToast) {
    $scope.areInvitationsAvailable=true;
    var fetchAllGroupInvitations= function () {
        inviteService.fetchAllGroupInvitations().then(function (response) {
            console.log("All pending invitations");
            console.log(response);
            $scope.invitations=response;
            //if($scope.invitations.length==0){
                $scope.areInvitationsAvailable=!($scope.invitations.length==0);
            //}
        }).catch(function (error) {
            console.log(error);
        })
    };
    fetchAllGroupInvitations();
    $scope.acceptOrRejectInvitation = function (acceptOrRejectStr,inviteId) {
        inviteService.acceptOrRejectInvitation(acceptOrRejectStr,inviteId).then(function (response) {
            console.log("Invitation accepted successfully");
            fetchAllGroupInvitations();
        }).catch(function (error) {
            console.log(error);
            console.log("Something went wrong while accepting invitation");
        })
    };

});

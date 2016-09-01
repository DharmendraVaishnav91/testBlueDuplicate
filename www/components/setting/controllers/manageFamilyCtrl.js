/**
 * Created by dharmendra on 26/8/16.
 */
userSetting.controller('ManageFamilyCtrl', function($scope,$state,$ionicModal,userSettingService,$cordovaToast) {


    $scope.isFromSetting=true;
    $scope.family={};
    $ionicModal.fromTemplateUrl('components/login/views/inviteFamily.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.inviteFamilyModal= modal;
    });
    var fetchInvitedFamilyMembers= function () {
        userSettingService.fetchAllFamilyInvitedMembers().then(function (response) {
            console.log("User all invited members");
            console.log(response);
            $scope.invitedMemebers=response;
        }).catch(function (error) {
            console.log(error);
        })
    };
    fetchInvitedFamilyMembers();
    $scope.showInviteFamilyModal= function(){
        $scope.inviteFamilyModal.show();
    };
    $scope.hideInviteFamilyModal =function(){
        $scope.inviteFamilyModal.hide();
    };
    $scope.sendInviteToFamily  = function () {
        var members=[];
        members.push($scope.family);
        var inviteData={
            members:members
        };
        userSettingService.sendInviteToFamilyMembers(inviteData).then(function (response) {
              console.log("Family invite success");
              console.log(response);
             fetchInvitedFamilyMembers();
            $cordovaToast.showLongBottom("Invitation sent successfully");
            $scope.hideInviteFamilyModal();
        }).catch(function (error) {
              console.log(error);
            $cordovaToast.showLongBottom("Something went wrong, please try after some time.");
        })
    }
});

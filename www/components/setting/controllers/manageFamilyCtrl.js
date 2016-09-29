/**
 * Created by dharmendra on 26/8/16.
 */
userSetting.controller('ManageFamilyCtrl', function($scope,$state,$ionicModal,userSettingService,$filter,$cordovaToast,utilityService) {


    $scope.isFromSetting=true;
    $scope.invitedFind=false;
    $scope.family={};
    $ionicModal.fromTemplateUrl('components/login/views/inviteFamilyModal.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.inviteFamilyModal= modal;
    });
    $scope.backToAccount= function () {
        $state.go('app.setting');
    };
    var fetchInvitedFamilyMembers= function () {
        userSettingService.fetchAllFamilyInvitedMembers().then(function (response) {
            console.log("User all invited members");
            console.log(response);
            $scope.invitedMembers=response;
            $scope.invitedFind=$scope.invitedMembers.members.length != 0 ;
            //if($scope.invitedMemebers.length == 0){
            //    invitedFind = false;
            //}
        }).catch(function (error) {
            console.log(error);
        })
    };

    fetchInvitedFamilyMembers();
    $scope.showInviteFamilyModal= function(){
        utilityService.getCountryList().then(function (response) {
            $scope.countryCodeList = response;
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
        $scope.family={};
        $scope.inviteFamilyModal.show();
    };
    $scope.hideInviteFamilyModal =function(){
        $scope.inviteFamilyModal.hide();
    };
    $scope.sendInviteToFamily  = function () {
        var members=[];
        var data={
            name:$scope.family.name,
           // mobile:$scope.family.phoneCode+""+$scope.family.mobile,
            relationship:$scope.family.relationship
        };
        members.push(data);
        var inviteData={
            members:members
        };
        userSettingService.sendInviteToFamilyMembers(inviteData).then(function (response) {
              console.log("Family invite success");
              console.log(response);
             fetchInvitedFamilyMembers();
            $scope.hideInviteFamilyModal();
            $cordovaToast.showLongBottom($filter('translate')('INVITATION_SENT_SUCCESSFULLY'));

        }).catch(function (error) {
              console.log(error);
           $cordovaToast.showLongBottom($filter('translate')('SOMETHING_WENT_WRONG'));
        })
    }
});

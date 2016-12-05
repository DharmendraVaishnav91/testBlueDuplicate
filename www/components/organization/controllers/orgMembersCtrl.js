/**
 * Created by dharmendra on 30/11/16.
 */
org.controller('OrganizationMembersCtrl', function ($scope,$actionButton,$ionicModal,$state) {
    console.log("welcome to org tab view controller");
    //$ionicModal.fromTemplateUrl('components/organization/views/inviteOrgMember.html', {
    //    scope: $scope,
    //    animation: 'slide-in-right'
    //}).then(function (modal) {
    //    $scope.inviteInOrgModal= modal;
    //
    //});
    $scope.searchMember="";
    var actionButton = $actionButton.create({
        mainAction: {
            icon: 'ion-android-add',
            backgroundColor: '#4E5C6E',
            textColor: ' white',
            onClick: function() {
                console.log('clicked main BUTTON');
                $scope.showMemberList();
            }
        }
    });
    $scope.showMemberList = function () {
      $state.go('app.inviteMemberInOrg') ;
      //  $scope.inviteInOrgModal.show();
    };

});

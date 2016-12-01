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
    $scope.memberList=[
        {
            name:"Dharmendra vaishnav",
            id:"1",
            role:"admin"
        },
        {
            name:"Amit Swami",
            id:"2",
            role:"Member"
        },
        {
            name:"Kapil sachdev",
            id:"3",
            role:"Member"
        },

        {
            name:"sachin singh",
            id:"4",
            role:"Member"
        },
        {
            name:"Manish sharma",
            id:"5",
            role:"Member"
        },
        {
            name:"Abha Bansal",
            id:"6",
            role:"Member"
        },
        {
            name:"Prateek Dhingra",
            id:"7",
            role:"Member"
        },
        {
            name:"Deepak Sharma",
            id:"8",
            role:"Member"
        },
        {
            name:"Parag Mangal",
            id:"9",
            role:"Member"
        },
        {
            name:"amit natani",
            id:"10",
            role:"Member"
        },
        {
            name:"Aahutosh shukla",
            id:"11",
            role:"Member"
        },
        {
            name:"poonam dasani",
            id:"12",
            role:"Member"
        },
        {
            name:"Sameer sharma",
            id:"13",
            role:"Member"
        }
    ];
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
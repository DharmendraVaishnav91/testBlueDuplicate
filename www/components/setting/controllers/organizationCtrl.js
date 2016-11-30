menu.controller('OrganizationCtrl', function($scope, $filter, $state, utilityService, $translate, $window, $cordovaToast,$ionicModal){

    // $state
    $scope.orgExist = true;
    $ionicModal.fromTemplateUrl('components/organization/views/orgMemberListModal.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.memberListModal= modal;

    });
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
    $scope.imgUrl="http://lorempixel.com/30/30/people/";
    $scope.navTitle='<img class="title-image" src="/home/parag/Downloads/leisa_christmas_false_color.png" />';
    $scope.createNewOrganization = function(){
        $state.go('app.createOrg');
    };
    $scope.showMemberList = function () {
        $scope.memberListModal.show();
    };
    $scope.hideOrgMemberList = function () {
        $scope.memberListModal.hide();
    }
});

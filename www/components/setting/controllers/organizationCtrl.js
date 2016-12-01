// menu.controller('OrganizationCtrl', function($scope, $filter, $state, utilityService, $translate, $window, $cordovaToast,$ionicModal){
menu.controller('OrganizationCtrl', function($scope, $filter, $state, $stateParams, loginService, $localStorage, $rootScope, menuService, utilityService, $translate, $window, $cordovaToast){

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
    console.log($rootScope.orgExist);
    console.log($rootScope.org);
    console.log($rootScope.orgLoc);
    $scope.navTitle='<img class="title-image" src="/home/parag/Downloads/leisa_christmas_false_color.png" />';
    $scope.npFound = function(){
        var user_role = $rootScope.user.user_role_names;
        for (var i = 0; i < user_role.length; i++) {
            if(user_role[i] == "national_partner"){
              return true;
            }
        }
        return false;
    };
    $scope.createNewOrganization = function(){
        $state.go('app.createOrg');
    };
    $scope.showMemberList = function () {
        $scope.memberListModal.show();
    };
    $scope.hideOrgMemberList = function () {
        $scope.memberListModal.hide();
    };
});

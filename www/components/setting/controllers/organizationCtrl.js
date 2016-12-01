menu.controller('OrganizationCtrl', function($scope, $filter, $state, $stateParams, loginService, $localStorage, $rootScope, menuService, utilityService, $translate, $window, $cordovaToast){

    // $state
    $scope.orgExist = true;
    $ionicModal.fromTemplateUrl('components/organization/views/orgMemberListModal.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.memberListModal= modal;

    });

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
    }
});

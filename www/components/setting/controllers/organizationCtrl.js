menu.controller('OrganizationCtrl', function($scope, $filter, $state, loginService, $localStorage, $rootScope, menuService, utilityService, $translate, $window, $cordovaToast){

    // $state
    $scope.orgExist = true;
    $scope.navTitle='<img class="title-image" src="/home/parag/Downloads/leisa_christmas_false_color.png" />';
    $scope.createNewOrganization = function(){
        $state.go('app.createOrg');
    };

});

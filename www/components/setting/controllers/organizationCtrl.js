menu.controller('OrganizationCtrl', function($scope, $filter, $state, $stateParams, loginService, $localStorage, $rootScope, menuService, utilityService, $translate, $window, $cordovaToast){

    // $state
    $scope.orgExist = true;


    $scope.imgUrl="http://lorempixel.com/30/30/people/";
    console.log($rootScope.orgExist);
    console.log($rootScope.org);
    console.log($rootScope.orgLoc);
    $scope.navTitle='<img class="title-image" src="/home/parag/Downloads/leisa_christmas_false_color.png" />';

    $scope.createNewOrganization = function(){
        $state.go('app.createOrg');
    };

});

menu.controller('CreateOrgCtrl',function($scope, $filter, $state, loginService, $localStorage, $rootScope, menuService, utilityService, $translate, $window, $cordovaToast){

  $scope.org = {};
  $scope.loc = {};

  utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
      $scope.countryCodeList = response;
      console.log(response);
  }).catch(function (error) {
      console.log(error);
  });

  $scope.changeSubdivision = function (countryCode) {
      fetchStates(countryCode);
  };

  var fetchStates = function (countryCode) {
      loginService.fetchStates(countryCode).then(function (response) {
          $scope.subDivList = response;
      }).catch(function (error) {
          console.log(error);
      })
  };

  $scope.getUpdatedCountryList = function(query){
    return $filter('filter')($scope.countryCodeList,query);
  } ;
  $scope.getUpdatedStateList=function(query){
    return $filter('filter')($scope.subDivList,query);
  } ;

  $scope.hideCreateOrg = function(){
      $state.go('app.organization');
  };

  $scope.createOrg = function(){
      console.log($scope.org);
      console.log($scope.loc);
      $state.go('app.organization',{orgExist: true, org: $scope.org, loc: $scope.loc});
  };
});

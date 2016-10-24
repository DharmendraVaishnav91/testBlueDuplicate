menu.controller('SettingCtrl', function($scope, $filter, $state, loginService, $localStorage, $rootScope, menuService, utilityService, $translate, $window, $cordovaToast) {
  console.log("inside SettingCtrl");
  console.log("selected language");
  console.log($rootScope.language);
  $scope.local={
    language:angular.copy($rootScope.language)
  };
  $scope.abcabc = ['aa','bb','cc','dd','ee','ffr','ccr','ddr','eer'];
  utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
      $scope.items = response;
      console.log(response);
  }).catch(function (error) {
      console.log(error);
  });
  //items-clicked-method
  $scope.clickedMethod = function (callback) {
      // print out the selected item
      console.log(callback.item);

      // print out the component id
      console.log(callback.componentId);

      // print out the selected items if the multiple select flag is set to true and multiple elements are selected
      console.log(callback.selectedItems);
  }
  $scope.getSearchedCountryList=function(query){
    return $filter('filter')($scope.items,query);
  }
  $scope.changeLanguage = function(selectedLang) {

    menuService.selectLanguage(selectedLang).then(function(response) {
      console.log($rootScope.language);
      $translate.use(selectedLang);
      $rootScope.language = selectedLang;
      $cordovaToast.showLongBottom("Language preference updated successfully");
    }).catch(function(error) {

    })
  };
});

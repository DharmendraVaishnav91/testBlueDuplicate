menu.controller('SettingCtrl', function($scope, $state, loginService, $localStorage, $rootScope, menuService, $translate, $window, $cordovaToast) {
  console.log("inside SettingCtrl");
  console.log("selected language");
  console.log($rootScope.language);
  $scope.local={
    language:angular.copy($rootScope.language)
  };
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

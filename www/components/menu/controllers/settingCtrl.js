menu.controller('SettingCtrl', function($scope, $state, loginService, $localStorage, $rootScope, menuService, $translate, $window, $cordovaToast) {
  $scope.changeLanguage = function(selectedLang) {
    console.log("inside SettingCtrl");
    menuService.selectLanguage(selectedLang).then(function(response) {
      console.log($rootScope.language);
      $translate.use(selectedLang);
      $rootScope.language = selectedLang;
      $cordovaToast.showLongBottom("Language preference updated successfully");
    }).catch(function(error) {

    })
  };
});

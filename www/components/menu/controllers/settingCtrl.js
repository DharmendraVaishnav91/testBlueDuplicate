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
      $cordovaToast.showLongBottom("Language preference updated successfully.");
    }).catch(function(error) {

    })
  };
   $scope.arr = { prop: [{id:1,name:"Saab"}, {id:2,name:"Volvo"},{id:3,name:"BMW"},{id:4,name:"Saab1"}, {id:5,name:"Volvo1"},{id:6,name:"BMW1"}] };
});

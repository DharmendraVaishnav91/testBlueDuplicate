menu.controller('SettingCtrl', function($scope,$state,loginService,$localStorage,$rootScope,menuService,$translate,$cordovaToast) {
    $scope.chooseLanguage = function () {
          console.log("inside SettingCtrl\n")
           $state.go('app.chooseLanguage');
    } ;
});

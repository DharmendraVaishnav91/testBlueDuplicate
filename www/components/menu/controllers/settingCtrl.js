
menu.controller('SettingCtrl', function($scope,$state,loginService,$localStorage,$rootScope,menuService,$translate,$cordovaToast) {
    $scope.changeLanguage= function (selectedLang) {
       menuService.selectLanguage(selectedLang).then(function (response) {
           $translate.use(selectedLang);
           $cordovaToast.showLongBottom("Language preference updated successfully");
       }).catch(function (error) {

       })
    } ;
});


/**
 * Created by dharmendra on 9/8/16.
 */
app.controller('HomeCtrl', function($scope,$state,$rootScope,utilityService) {

    // Form data for the login modal
    $scope.loginData = {};
    var languageData=utilityService.fetchLanguageStrings(languages.ENGLISH);

    console.log("Language JSON data");
    console.log(languageData);
    $rootScope.bgUrl="assets/img/logo_small.png";
    $rootScope.bgLargeUrl="assets/img/logo_big.png";
    $scope.openRegistration= function () {
        $state.go('regCreateAccount');
    };
    $scope.openLogin = function() {

        $state.go('login');
    };
});

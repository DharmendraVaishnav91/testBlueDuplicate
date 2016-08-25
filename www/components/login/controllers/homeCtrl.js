/**
 * Created by dharmendra on 9/8/16.
 */
app.controller('HomeCtrl', function($scope,$state,$rootScope,utilityService) {

    // Form data for the login modal
    $scope.loginData = {};
    var languageData={};
    //var selectedLanguage=languages.ENGLISH;
    //utilityService.fetchLanguageStrings(selectedLanguage).then(function(response){
    //    languageData=response.value;
    //    console.log("Language JSON data");
    //    console.log(languageData);
    //    $translateProvider.translations(selectedLanguage,languageData);
    //    $translateProvider.preferredLanguage(selectedLanguage);
    //});


    $rootScope.bgUrl="assets/img/logo_small.png";
    $rootScope.bgLargeUrl="assets/img/logo_big.png";
    $scope.openRegistration= function () {
        $state.go('regCreateAccount');
    };
    $scope.openLogin = function() {

        $state.go('login');
    };
});

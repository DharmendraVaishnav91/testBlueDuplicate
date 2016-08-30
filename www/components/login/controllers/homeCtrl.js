/**
 * Created by dharmendra on 9/8/16.
 */
app.controller('HomeCtrl', function($scope,$state,$rootScope,utilityService,$window,loginService,$localStorage) {

    // Form data for the login modal
    $rootScope.deviceHeight = $window.innerHeight;
    $rootScope.deviceWidth = $window.innerWidth;
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

    var validateUser=function(){
        //$localStorage[STORAGE.LOGIN_KEY]=null;;
        var user=loginService.validateLogin();
        console.log("User details");
        console.log(user);
        if(user!=null){
            $rootScope.user=user;
            $state.go('app.dashboard');
        }
    };
    validateUser();
    $scope.openRegistration= function () {
        $state.go('regCreateAccount');
    };
    $scope.openLogin = function() {

        $state.go('login');
    };
});

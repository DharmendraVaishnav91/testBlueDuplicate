/**
 * Created by dharmendra on 9/8/16.
 */
app.controller('HomeCtrl', function($scope,$state,$rootScope,utilityService,$window,loginService,$localStorage,userSettingService,$timeout,menuService,$translate,$cordovaToast) {

    // Form data for the login modal
    $rootScope.deviceHeight = $window.innerHeight;
    $rootScope.deviceWidth = $window.innerWidth;
    $scope.loginData = {};
    var languageData={};
    $rootScope.selectedLanguage="en";
    $scope.lang={
        selected:"en"
    };
    $rootScope.bgUrl="assets/img/logo_small.png";
    $rootScope.bgLargeUrl="assets/img/logo_big.png";
    //$cordovaToast.showShortBottom("app version=",$rootScope.appVersion);

    var checkCordovaPlugin= function () {
        if (window.cordova&& window.cordova.plugins&&window.cordova.plugins.diagnostics) {
            cordova.plugins.diagnostics.isCameraAuthorized(function(authorized){
                console.log("App is " + (authorized ? "authorized" : "denied") + " access to the camera");
            }, function(error){
                console.error("The following error occurred: "+error);
            });
        }
    };
     $timeout(checkCordovaPlugin,500);
    var validateUser=function(){
        //$localStorage[STORAGE.LOGIN_KEY]=null;
        var user=loginService.validateLogin();
        console.log("User details");
        console.log(user);
        if(user!=null){
            $rootScope.user=user;
            console.log("Auth token="+user.auth_token)       ;
            $rootScope.auth_token=user.auth_token ;
            userSettingService.fetchUserInfo($rootScope.user.ActorID).then(function(response){
                console.log("User personal details");
                console.log(response);
                $rootScope.userInfo=response;
                if($rootScope.userInfo.image==DEFAULT_PROFILE_PATH){
                    $rootScope.profileUrl=DEFAULT_AVATAR_PATH;
                }else{
                    $rootScope.profileUrl=$rootScope.userInfo.image;
                }

            });
            menuService.fetchPreferredLanguage().then(function (response) {
                $translate.use(response.language);
                $rootScope.language = response.language;
            }).catch(function (response) {

            });
            $state.go('app.dashboard');
        }
    };
    validateUser();
    $scope.changeLanguage= function () {

        $translate.use($scope.lang.selected);
        $rootScope.selectedLanguage=$scope.lang.selected;
            //$cordovaToast.showLongBottom("Language preference updated successfully");
    } ;
    $scope.openRegistration= function () {
        $state.go('regCreateAccount');
    };
    $scope.openLogin = function() {

        $state.go('login');
    };
});

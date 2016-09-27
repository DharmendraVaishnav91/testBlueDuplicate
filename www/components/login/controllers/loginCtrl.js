/**
 * Created by dharmendra on 8/8/16.
 */
app.controller('LoginCtrl', function($scope,$state,$translate,loginService,$rootScope,$localStorage,userSettingService,$cordovaToast,utilityService) {

    // Form data for the login modal
    $scope.loginData = {};

    var saveUser=function(user){
        $localStorage[STORAGE.LOGIN_KEY]=user;
    };
    utilityService.getCountryList().then(function (response) {
        $scope.countryCodeList = response;
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    $scope.doLogin= function () {
        console.log("Doing login");
        var data={
            username:$scope.loginData.phoneCode+""+$scope.loginData.mobile,
            password:$scope.loginData.password
        };
        loginService.doLogin(data).then(function (user){
            $rootScope.user=user;
            $rootScope.auth_token=user.auth_token;
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
            saveUser(user);
            $state.go('app.dashboard');
        }).catch(function (error) {
            console.log(error.errors);
            var errorMessage=error.errors?error.errors:"Invalid Credentials";
            $cordovaToast.showLongBottom(errorMessage)
        });
       // $state.go('app.dashboard');
    };


    $scope.openRegistration= function () {
        $state.go('regCreateAccount');
    }
});

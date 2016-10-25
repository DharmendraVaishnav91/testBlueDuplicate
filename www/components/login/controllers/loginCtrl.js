/**
 * Created by dharmendra on 8/8/16.
 */
app.controller('LoginCtrl', function($scope,$state,loginService,$rootScope,$localStorage,userSettingService,$cordovaToast,utilityService,$filter,menuService,$translate,signUpService) {

    // Form data for the login modal
    $scope.loginData = {};
    $rootScope.userMobDetail={};
    var saveUser=function(user){
        $localStorage[STORAGE.LOGIN_KEY]=user;
    };
    utilityService.getCountryList().then(function (response) {
        $scope.countryCodeList = response;
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    $scope.getSearchedCountryList=function(query){
      return $filter('filter')($scope.countryCodeList,query);
    }
    $scope.doLogin= function () {
        console.log("Doing login");
        var data={
            username:$scope.loginData.phoneCode.CountryPhoneCode+""+$scope.loginData.mobile,
            password:$scope.loginData.password
        };
        console.log(data);
        $rootScope.userMobDetail.country_phone_code=$scope.loginData.phoneCode;
            $rootScope.userMobDetail.mobile=$scope.loginData.mobile;
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
            menuService.fetchPreferredLanguage().then(function (response) {
                $translate.use(response.language);
                $rootScope.language = response.language;
            }).catch(function (response) {

            });
            saveUser(user);
            $state.go('app.dashboard');
        }).catch(function (error) {
            var errorMessage=error.error?error.error:$filter('translate')('INVALID_CREDENTIALS');
            console.log(errorMessage);
            if(errorMessage=="Please confirm your account."){
                requestOTP();

            }
            $cordovaToast.showLongBottom(errorMessage)
        });
       // $state.go('app.dashboard');
    };
    var requestOTP = function () {
        var requestData = {
                country_phone_code: $rootScope.userMobDetail.country_phone_code,
                username: $rootScope.userMobDetail.mobile
            };

        signUpService.requestOTP(requestData).then(function (response) {
            console.log("OTP requested successfully");
            console.log(response);
            $state.go('verifyAccount',{isFromLogin:true,indirect:false});
            //  $cordovaToast.showLongBottom("An OTP has been sent to your mobile.");
        }).catch(function (error) {
            console.log(error);
        })
    };
    $scope.confirmUserAccount = function () {
       $state.go('verifyAccount',{isFromLogin:true,indirect:true})
    };
    $scope.openRegistration= function () {
        $state.go('regCreateAccount');
    }
});

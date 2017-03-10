/**
 * Created by dharmendra on 8/8/16.
 */
app.controller('LoginCtrl', function($ionicModal,$scope,$state,loginService,$rootScope,$localStorage,userSettingService,$cordovaToast,utilityService,$filter,menuService,$translate,signUpService) {

    // Form data for the login modal
    $scope.loginData = {};
    $rootScope.userMobDetail={};
    $rootScope.bgUrl="assets/img/logo_big.png";
    var saveUser=function(user){
        $localStorage[STORAGE.LOGIN_KEY]=user;
    };
    $scope.goBack= function () {
        $state.go('home')
    };

    $scope.loginData = {
        selectedCountry:{
            CountryPhoneCode:"1",
            CountryCode:"US",
            CountryName:"United States"
        }
    };
    utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
        $scope.countryCodeList = response;
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    $ionicModal.fromTemplateUrl('components/common/views/countrySearch.html'
        , {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
        $scope.countrySearchModal = modal;
    });

    // $scope.getSearchedCountryList=function(query){
    //   return $filter('filter')($scope.countryCodeList,query);
    // } ;
    $scope.showCountrySearch = function() {
        console.log("show country search");
        $scope.countrySearchModal.show();
    };
    $scope.hideCountrySearch = function() {
        $scope.countrySearchModal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.countrySearchModal.remove();
    });
    $scope.selectCountry = function (selectedCountry) {
        $scope.loginData.selectedCountry=selectedCountry;

        $scope.hideCountrySearch();
    };


    $scope.doLogin= function () {
        console.log("Doing login");
        var data={
            username:$scope.loginData.selectedCountry.CountryPhoneCode+""+$scope.loginData.mobile,
            password:$scope.loginData.password
        };
        console.log(data);
        //Setting user mobile and country phone code to chec
        $rootScope.userMobDetail.country_phone_code=$scope.loginData.selectedCountry.CountryPhoneCode;
        $rootScope.userMobDetail.mobile=$scope.loginData.mobile;

        loginService.doLogin(data).then(function (user){

            $rootScope.user=user;
            $rootScope.auth_token=user.auth_token;

            //Fetching user information
            userSettingService.fetchUserInfo($rootScope.user.ActorID).then(function(response){
                console.log("User personal details");
                console.log(response);
                $rootScope.userInfo=response;
                if($rootScope.userInfo.image==DEFAULT_PROFILE_PATH){
                    $rootScope.profileUrl=DEFAULT_AVATAR_PATH;
                }else{
                    $rootScope.profileUrl=$rootScope.userInfo.image;
                }
            }).catch(function (errorMessage) {
                console.log(errorMessage);
            });
            
            //Fetching user preferred language if selected
            menuService.fetchPreferredLanguage().then(function (response) {
                $translate.use(response.language);
                $rootScope.language = response.language;
            }).catch(function (errorMessage) {
                console.log(errorMessage);
            });
            saveUser(user);
            $state.go('app.dashboard');
        }).catch(function (error) {
            var errorMessage=error.error?error.error:$filter('translate')('INVALID_CREDENTIALS');
            console.log(errorMessage);
            if(errorMessage=="Please confirm your account."){
                requestOTP(data);

            }
            $cordovaToast.showLongBottom(errorMessage)
        });
       // $state.go('app.dashboard');
    };
    var requestOTP = function (userCredential) {
        var requestData = {
                country_phone_code: $rootScope.userMobDetail.country_phone_code,
                username: $rootScope.userMobDetail.mobile
            };

        signUpService.requestOTP(requestData).then(function (response) {
            console.log("OTP requested successfully");
            console.log(response);
            $state.go('verifyAccount',{isFromLogin:true});
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
    };
    $scope.forgotPassword = function(){
        $state.go('forgotPassword');
    }
});

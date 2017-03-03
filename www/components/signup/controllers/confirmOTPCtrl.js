/**
 * Created by dharmendra on 22/9/16.
 */
app.controller('ConfirmOTPCtrl', function ($stateParams,$timeout, $q, $scope, $state, $rootScope, $cordovaToast,utilityService, signUpService,$filter) {
    $scope.confirm = {};
    // $scope.goToHome = function () {
    //     $state.go('home');
    // };

    $scope.isFromLogin=$stateParams['isFromLogin'] ;
    $scope.indirect=$stateParams['indirect'] ;
    $scope.isNewCodeRequested=false;

    //Fetching country list
    if($scope.isFromLogin){
        utilityService.getCountryList().then(function(response){
            $scope.countryCodeList=response;
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }


    $scope.requestOTP = function () {
        //$scope.isNewCodeRequested=true;
        var requestData={};
        if($scope.isFromLogin && $scope.indirect){
            requestData = {
                country_phone_code: $scope.confirm.country,
                username: ""+$scope.confirm.mobile
            };
        }else{
            requestData = {
                country_phone_code:angular.copy($rootScope.loginData.user.selectedCountry.CountryPhoneCode),
                username: ""+angular.copy($rootScope.loginData.user.mobile)
            };
        }
        signUpService.requestOTP(requestData).then(function (response) {
            console.log("OTP requested successfully");
            console.log(response);
            //  $cordovaToast.showLongBottom("An OTP has been sent to your mobile.");
        }).catch(function (error) {
            console.log(error);
        })
    };

    // $scope.skipToAddHome= function () {
    //     $state.go('addHome');
    // };

    $scope.confirmOTP = function (){
        var requestData={};
        if($scope.isFromLogin && $scope.indirect){
            requestData={
                country_phone_code: $scope.confirm.country,
                otp_code: $scope.confirm.code+"",
                username:""+$scope.confirm.mobile
            };
        }else{

            requestData = {
                country_phone_code:angular.copy($rootScope.loginData.user.selectedCountry.CountryPhoneCode),
                username: ""+angular.copy($rootScope.loginData.user.mobile),
                otp_code: $scope.confirm.code+""
            };
        }

        signUpService.confirmOTP(requestData).then(function (response) {
            console.log("OTP confirmed successfully");
            $state.go('login');


            //$cordovaToast.showShortBottom($filter('translate')('OTP_VERIFIED_SUCCESSFULLY'));

            console.log(response);
        }).catch(function (error) {
            console.log(error);
            $cordovaToast.showShortBottom(error.error);
        })
    };
});

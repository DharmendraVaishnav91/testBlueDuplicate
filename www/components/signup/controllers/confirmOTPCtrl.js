/**
 * Created by dharmendra on 22/9/16.
 */
app.controller('ConfirmOTPCtrl', function ($timeout, $q, $scope, $state, $rootScope, $cordovaToast,utilityService, signUpService,$filter) {
    $scope.confirm = {};
    $scope.goToHome = function () {
        $state.go('home');
    };
    utilityService.getCountryList().then(function(response){
        $scope.countryCodeList=response;
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    $scope.requestOTP = function () {
        var requestData = {
            country_phone_code: $rootScope.userMobDetail.country_phone_code,
            username: $rootScope.userMobDetail.mobile
        };
        //var requestData = {
        //    country_phone_code: $scope.confirm.country,
        //    username: $scope.confirm.mobile
        //};
        signUpService.requestOTP(requestData).then(function (response) {
            console.log("OTP requested successfully");
            console.log(response);
            //  $cordovaToast.showLongBottom("An OTP has been sent to your mobile.");
        }).catch(function (error) {
            console.log(error);
        })
    };
    $scope.confirmOTP = function (){
        var requestData = {
            country_phone_code: $rootScope.userMobDetail.country_phone_code,
            otp_code: $scope.confirm.code+"",
            username: $rootScope.userMobDetail.mobile
        };
        //var requestData={
        //    country_phone_code: $scope.confirm.country,
        //
        //    username:$scope.confirm.mobile
        //};
        signUpService.confirmOTP(requestData).then(function (response) {
            console.log("OTP confirmed successfully");
            $state.go('home');
            $cordovaToast.showShortBottom($filter('translate')('OTP_VERIFIED_SUCCESSFULLY'));

            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    };
});

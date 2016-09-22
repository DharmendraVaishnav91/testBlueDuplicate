/**
 * Created by dharmendra on 22/9/16.
 */
app.controller('ConfirmOTPCtrl', function ($timeout, $q, $scope, $state, $rootScope, $cordovaToast,utilityService, signUpService) {
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
            country_phone_code: $scope.confirm.country,
            username: $scope.confirm.mobile
        };
        signUpService.requestOTP(requestData).then(function (response) {
            console.log("OTP requested successfully");
            console.log(response);
            //  $cordovaToast.showLongBottom("An OTP has been sent to your mobile.");
        }).catch(function (error) {
            console.log(error);
        })
    };
    $scope.confirmOTP = function () {
        var requestData={
            country_phone_code: $scope.confirm.country,
            otp_code: $scope.confirm.code,
            username:$scope.confirm.mobile
        };
        signUpService.confirmOTP(requestData).then(function (response) {
            console.log("OTP confirmed successfully");
            //$cordovaToast.showShortBottom("OTP verified successfully");
            $state.go('home');
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    };
});

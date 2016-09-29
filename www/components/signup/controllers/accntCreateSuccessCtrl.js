app.controller('accntCreateSuccessCtrl', function ($timeout, $q, $scope, $state, $rootScope, $cordovaToast,utilityService, signUpService,$filter) {
    $scope.confirm = {};
    $scope.goToVerifyAccount = function () {
        $state.go('verifyAccount');
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
            $cordovaToast.showLongBottom($filter('translate')('OTP_SENT_SUCCESSFULLY'));
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
            $cordovaToast.showShortBottom($filter('translate')('OTP_VERIFIED_SUCCESSFULLY'));
            $state.go('home');
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    };
});

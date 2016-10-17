app.controller('accntCreateSuccessCtrl', function ($timeout, $q, $scope, $state, $rootScope, $cordovaToast,utilityService, signUpService,$filter) {
    $scope.confirm = {};
    $scope.goToVerifyAccount = function () {
        $state.go('verifyAccount',{isFromLogin:false});
    };
    //utilityService.getCountryList().then(function(response){
    //    $scope.countryCodeList=response;
    //    console.log(response);
    //}).catch(function (error) {
    //    console.log(error);
    //});
    //$scope.requestOTP = function () {
    //    var requestData = {
    //        country_phone_code: $scope.confirm.country,
    //        username: $scope.confirm.mobile
    //    };
    //    signUpService.requestOTP(requestData).then(function (response) {
    //        console.log("OTP requested successfully");
    //        console.log(response);
    //        $cordovaToast.showLongBottom($filter('translate')('OTP_SENT_SUCCESSFULLY'));
    //    }).catch(function (error) {
    //        console.log(error);
    //    })
    //};
});

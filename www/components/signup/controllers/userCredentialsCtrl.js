/**
 * Created by dharmendra on 1/3/17.
 */
app.controller('UserCredentialCtrl', function ($ionicNavBarDelegate, $scope, $state, $ionicHistory, $rootScope, signUpService, $cordovaToast, utilityService) {


    $ionicNavBarDelegate.align('center');

    $scope.username = $rootScope.loginData.user.selectedCountry.CountryPhoneCode + "" + $rootScope.loginData.user.mobile;
    //$scope.username = "918233772276";
    $scope.goBack = function () {
        $ionicHistory.goBack();
    };
    $scope.goToConfirmAccount = function () {
        console.log("User Credential view ");
        console.log($rootScope.loginData);
        console.log(JSON.stringify($rootScope.loginData));
        var dataToSend = {

            user: {
                country_phone_code:angular.copy($rootScope.loginData.user.selectedCountry.CountryPhoneCode),
                mobile:  angular.copy($rootScope.loginData.user.mobile),
                password: angular.copy($rootScope.loginData.user.password),
                language_preference:angular.copy($rootScope.loginData.profile.language),
                email:angular.copy($rootScope.loginData.user.email)
            },
            //product_code_ids: [300100, 300210],
            person: {
                given_name: angular.copy($rootScope.loginData.profile.given_name),
                family_name: angular.copy($rootScope.loginData.profile.family_name),
                occupation:  angular.copy($rootScope.loginData.profile.occupation),
                gender:  angular.copy($rootScope.loginData.profile.gender)

            },
            location: {
                latitude: angular.copy($rootScope.loginData.registration_location.latitude),
                longitude: angular.copy($rootScope.loginData.registration_location.longitude),
                address: angular.copy($rootScope.loginData.registration_location.address),
                name: null,
                country_code: angular.copy($rootScope.loginData.registration_location.country_code),
                subdivision_code: angular.copy($rootScope.loginData.registration_location.subdivision_code),
                city: angular.copy($rootScope.loginData.registration_location.city),
                postal_code: angular.copy($rootScope.loginData.registration_location.postalcode),
            }

        };
        var product_ids=[];
        angular.forEach($rootScope.loginData.selectedProducts, function (currentProduct) {
             product_ids.push(currentProduct.H3Code);
        });
        dataToSend.product_code_ids=product_ids;
        console.log("User Credential: Sign Up data");
        console.log(dataToSend);
        // $state.go('verifyAccount');
    };
});

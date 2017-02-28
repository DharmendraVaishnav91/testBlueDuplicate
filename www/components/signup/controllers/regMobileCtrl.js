/**
 * Created by dharmendra on 28/02/17.
 */
app.controller('RegMobileCtrl', function ($ionicNavBarDelegate, $scope, $state, $rootScope, signUpService, $cordovaToast,utilityService,$ionicModal) {

    $scope.isFromSetting = false;

    $scope.loginData = {
        user:{}
    };

    $ionicNavBarDelegate.align('center');

    $ionicModal.fromTemplateUrl('components/common/views/countrySearch.html'
        , {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.countrySearchModal = modal;
    });


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

    utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
        $scope.countryCodeList = response;
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });

    $scope.goBack=function () {
        $state.go('regCreateProfile');
    };

    $scope.goToAddHome = function () {
        console.log("Add mobile screen ");
        console.log($scope.loginData);
      //  $state.go('');


    };
});

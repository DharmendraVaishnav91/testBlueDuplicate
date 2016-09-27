app.controller('InviteFamilyCtrl', function ($timeout, $q, $scope, $state, $ionicPopup, utilityService, $stateParams, signUpService, $rootScope, $cordovaToast,userSettingService) {
    console.log($stateParams.inviteFamilyData);
    $scope.data = {};
    $scope.skipToSuccess = function () {
        $state.go('accntCreateSuccess');
    };
    utilityService.getCountryList().then(function (response) {
        $scope.countryCodeList = response;
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    $scope.family={};
    $scope.sendInviteToFamily = function () {
        var members = [];
        var data={
            name:$scope.family.name,
            mobile:$scope.family.phoneCode+""+$scope.family.mobile,
            relationship:$scope.family.relationship
        };
        members.push(data);
        var inviteData = {
            members: members
        };
        userSettingService.sendInviteToFamilyMembers(inviteData).then(function (response) {
            console.log("Family invite success");
            console.log(response);
            $cordovaToast.showLongBottom("Member added successfully");
            $scope.hideInviteFamilyModal();
        }).catch(function (error) {
            console.log(error);
            $cordovaToast.showLongBottom("Something went wrong, please try after some time.");
        })
    };

});
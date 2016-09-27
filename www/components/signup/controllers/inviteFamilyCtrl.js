app.controller('InviteFamilyCtrl', function ($timeout, $q, $scope, $state, $ionicPopup, utilityService, $stateParams, signUpService, $rootScope, $cordovaToast,userSettingService) {
    console.log($stateParams.inviteFamilyData);
    $scope.data = {};
    $scope.skipToSuccess = function () {
        $state.go('accntCreateSuccess');
    };
    $scope.family={};
    $scope.sendInviteToFamily = function () {
        var members = [];
        members.push($scope.family);
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
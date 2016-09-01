/**
 * Created by dharmendra on 1/9/16.
 */
userSetting.controller('BulkInviteCtrl', function(loginService,$scope,$state,$ionicModal,utilityService,$cordovaToast) {
    $scope.friend ={};

    $scope.countryCodeList=utilityService.countryList();
    $scope.inviteFriend = function () {
        console.log("Friend details");

        var inviteFriendData={
            friend:parseInt($scope.friend.friendCountry.CountryPhoneCode+$scope.friend.friendMobile)
        } ;
        console.log(inviteFriendData);
        utilityService.sendAppInviteToFriend(inviteFriendData).then(function () {
            console.log("Friend invited successfully.");
            $scope.friend={};
            $cordovaToast.showLongBottom("Friend Invited Successfully.");
        }).catch(function (error) {
            console.log(error);
            $cordovaToast.showLongBottom("Something went wrong while inviting your friend.");
        })
    };
});

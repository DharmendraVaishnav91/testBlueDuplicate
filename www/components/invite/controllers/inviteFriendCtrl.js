/**
 * Created by ramkumar on 24/8/16.
 */
userSetting.controller('InviteFriendCtrl', function(loginService,$scope,$state,$ionicModal,utilityService,$cordovaToast) {
    $scope.friend ={};
	$scope.goToInviteFriend=function(){
            $state.go('app.inviteFriend');
    };
    $scope.countryCodeList=utilityService.countryList();
    $scope.backToInvite= function () {
      $state.go('app.invite');
    };
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

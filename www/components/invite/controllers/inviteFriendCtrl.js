/**
 * Created by ramkumar on 24/8/16.
 */
userSetting.controller('InviteFriendCtrl', function($filter,loginService,$scope,$state,$ionicModal,utilityService,$cordovaToast) {
    $scope.friend ={};
	$scope.goToInviteFriend=function(){
            $state.go('app.inviteFriend');
    };
    $scope.countryCodeList=utilityService.countryList();
    $scope.backToInvite= function () {
      $state.go('app.invite');
    };
    $scope.getSearchedCountryList=function(query){
      return $filter('filter')($scope.countryCodeList,query);
    } ;
    $scope.inviteFriend = function () {
        console.log("Friend details");

        var inviteFriendData={
            friend:parseInt($scope.friend.friendCountry.CountryPhoneCode+$scope.friend.friendMobile)
        } ;
        console.log(inviteFriendData);
        utilityService.sendAppInviteToFriend(inviteFriendData).then(function () {
           console.log("Friend invited successfully.");
            $scope.friend={};
            $cordovaToast.showLongBottom($filter('translate')('FRIEND_INVITED'));
        }).catch(function (error) {
            console.log(error);
            $cordovaToast.showLongBottom($filter('translate')('FRIEND_INVITE_FAILED'));
        })
    };
});

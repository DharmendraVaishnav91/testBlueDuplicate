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
    // $scope.getSearchedCountryList=function(query){
    //   return $filter('filter')($scope.countryCodeList,query);
    // } ;
    $ionicModal.fromTemplateUrl('components/common/views/countrySearch.html'
        , {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
        $scope.countrySearchModal = modal;
    });

    // $scope.getSearchedCountryList=function(query){
    //   return $filter('filter')($scope.countryCodeList,query);
    // } ;
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
    $scope.selectCountry = function (selectedCountry) {
        $scope.friend.friendCountry=selectedCountry;

        $scope.hideCountrySearch();
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
            $cordovaToast.showLongBottom($filter('translate')('FRIEND_INVITED'));
        }).catch(function (error) {
            console.log(error);
            $cordovaToast.showLongBottom($filter('translate')('FRIEND_INVITE_FAILED'));
        })
    };
});

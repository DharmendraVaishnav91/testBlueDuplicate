/**
 * Created by ramkumar on 24/8/16.
 */
userSetting.controller('InviteFriendCtrl', function(loginService,$scope,$state,$ionicModal) {

	$scope.goToInviteFriend=function(){
            $state.go('app.inviteFriend');
    };
    $scope.countryCodeList=[];
    loginService.fetchCountryCode().then(function(response){
       $scope.countryCodeList=response;
    }).catch(function(error){
        console.log(error);
    });
});

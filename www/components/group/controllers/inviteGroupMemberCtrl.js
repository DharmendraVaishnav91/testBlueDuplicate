group.controller('InviteGroupMemberCtrl', function (utilityService,$filter,$state,groupService,$stateParams,$scope,$rootScope) {
  console.log($stateParams);


  $scope.inviteUser = {};

  utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
      $scope.countryCodeList = response;
      console.log(response);
  }).catch(function (error) {
      console.log(error);
  });
  $scope.getSearchedCountryList=function(query){
    return $filter('filter')($scope.countryCodeList,query);
  } ;

  $scope.backToAccount= function () {
      $state.go('app.groupDetails',{group:{id:$stateParams.prevStateData.id}});
  };

  $scope.inviteOrgMember = function() {
    var phone = $scope.inviteUser.phoneCode.CountryPhoneCode + $scope.inviteUser.mobile;

     console.log(phone);
     groupService.checkUser(phone).then(function (response) {
         console.log("Responce from server\n",response);
        //  $state.go('app.organization.members');
        var data1 = [];
        data1.push({"invitee_id": response.uid});
        var datatoSend = {group_invite:data1};
        groupService.inviteGroupMembers(datatoSend,$stateParams.groupID).then(function (response) {
            console.log("Responce from server\n",response);
           $state.go('app.groupDetails',{group:{id:$stateParams.prevStateData.id}});
        }).catch(function (error) {
            console.log(error);
        });
     }).catch(function (error) {
         console.log(error);
     });


  };
});

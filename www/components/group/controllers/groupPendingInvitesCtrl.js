group.controller('GroupPendingInvitesCtrl', function (groupService,$stateParams,$scope,$rootScope) {
    console.log($stateParams);
    $scope.groupPendingInvites = $stateParams.data;
    $scope.name = $stateParams.name;
    $scope.id = $stateParams.id;
    $scope.fetchGroupDetails = function(){
      groupService.fetchGroupsDetail().then(function(response){
        console.log("Available group list data :\n", response);
        $scope.groupDetails = response.data;
        for(var i=0;i<$scope.groupDetails.length;i++){
          if ($scope.groupDetails[i].id == $scope.id){
            $scope.groupPendingRequests = $scope.groupDetails[i].attributes.group_invites!=null?$scope.groupDetails[i].attributes.group_invites.data:null;
          }
        }
      }).catch(function(error){
          console.log("Error occurred in fetching groups list");
          console.log(error);
      });
    }

    $scope.processRequest= function (invitationId, reqResStr) {
        var data={
            group_invite_id:invitationId,
            group_id:$scope.id
        };
        groupService.processOrgRequest(data,reqResStr).then(function (response) {
            console.log("Processing to organization request for joining");
            $scope.fetchGroupDetails();
        }).catch(function (error) {
            console.log("Error occurred while processing org invitation for joining");
        })
    }
});

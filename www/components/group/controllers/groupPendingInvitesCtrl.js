group.controller('GroupPendingInvitesCtrl', function ($state,utilityService,groupService,$stateParams,$scope,$rootScope,$actionButton) {



    console.log($stateParams);
    $scope.groupPendingInvites = $stateParams.data!=null?$stateParams.data:{};
    $scope.name = $stateParams.name;
    $scope.id = $stateParams.id;

    $scope.fetchGroupDetails = function(){
      groupService.fetchGroupsDetail().then(function(response){
        console.log("Available group list data :\n", response);
        $scope.groupDetails = response.data;
        for(var i=0;i<$scope.groupDetails.length;i++){
          if ($scope.groupDetails[i].id == $scope.id){
            $scope.groupPendingInvites = $scope.groupDetails[i].attributes.pending_invitations!=null?$scope.groupDetails[i].attributes.pending_invitations.data:null;
          }
        }
        console.log($scope.groupPendingInvites);
      }).catch(function(error){
          console.log("Error occurred in fetching groups list");
          console.log(error);
      });
    };

    if($stateParams.data == null){
        $scope.fetchGroupDetails();
    }
    var actionButton = $actionButton.create({
        mainAction: {
            icon: 'ion-plus-round',
            backgroundColor: '#4E5C6E',
            textColor: ' white',
            onClick: function() {
                console.log('clicked add BUTTON');
                $state.go('app.inviteGroupMember',{groupID:$scope.id, prevStateData:$stateParams});
            }
        }
    });



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

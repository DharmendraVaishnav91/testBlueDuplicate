group.controller('GroupMembersCtrl', function (groupService,$stateParams,$scope,$rootScope) {
  console.log($stateParams);
  $scope.data = $stateParams.data;
  $scope.name = $stateParams.name;
  $scope.id = $stateParams.id;
  $scope.fetchGroupDetails = function(){
    groupService.fetchGroupsDetail().then(function(response){
      console.log("Available group list data :\n", response);
      $scope.groupDetails = response.data;
      for(var i=0;i<groupDetails.length;i++){
        if (groupDetails.data[i].id == $scope.id){
          $scope.groupPendingRequests = groupDetails.data[i].attributes.members;
        }
      }
    }).catch(function(error){
        console.log("Error occurred in fetching groups list");
        console.log(error);
    });
  }

  $scope.promoteToAdmin = function(person){

  };
});

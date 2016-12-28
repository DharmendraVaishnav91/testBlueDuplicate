group.controller('GroupRequestsCtrl', function (groupService,$stateParams,$scope,$rootScope,$cordovaToast) {
  console.log($stateParams);
  $scope.groupPendingRequests = $stateParams.data;
  $scope.name = $stateParams.name;
  $scope.id = $stateParams.id;
  $scope.fetchGroupDetails = function(){
    groupService.fetchGroupsDetail().then(function(response){
      console.log("Available group list data :\n", response);
      $scope.groupDetails = response.data;
      for(var i=0;i<$scope.groupDetails.length;i++){
        if ($scope.groupDetails[i].id == $scope.id){
          $scope.groupPendingRequests = $scope.groupDetails[i].attributes.requests!=null?$scope.groupDetails[i].attributes.requests.data:null;
        }
      }
    }).catch(function(error){
        console.log("Error occurred in fetching groups list");
        console.log(error);
    });
  }

  $scope.processRequest= function (joinRequest, reqResStr) {
      var data={
          group_invite_id:joinRequest.id,
          group_id:joinRequest.attributes.group_id
      };
      groupService.processGroupJoinRequest(data,reqResStr).then(function (response) {
          console.log("Processing to organization request for joining");
          // fetchJoinRequests();
          $scope.fetchGroupDetails();
          if(reqResStr == "Accept"){
            $cordovaToast.showShortBottom("Request approved successfully.");
          }else{
            $cordovaToast.showShortBottom("Your Request is Rejected.");
          }

      }).catch(function (error) {
          console.log("Error occurred while processing org invitation for joining");
      })
  }


});

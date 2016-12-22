group.controller('GroupDetailsCtrl', function (groupService, $stateParams, $state, $actionButton, $scope, $rootScope) {
    $scope.groupDetails = $stateParams.group;
    console.log("Data from state\n", $scope.groupDetails);
    $scope.defaultAvatar = "http://ecx.images-amazon.com/images/I/41D5vU4I1NL.jpg";
    $scope.groupDetails.expand = false;

    $scope.goBack = function () {
      $state.go('app.group.manage');
    };
    $scope.showMoreDescription = function (selectedGroup) {
        console.log("old expand : ", selectedGroup.expand);
        selectedGroup.expand = !selectedGroup.expand;
        console.log("new expand : ", selectedGroup.expand);
    };

    groupService.fetchGroupDetail($scope.groupDetails.id).then(function (response) {
        console.log("Group detail");
        console.log(response);
        $scope.postData = response.data;
    }).catch(function (error) {
        console.log("Error occurred in fetching group detail");
        console.log(error);
    });
    $scope.goToMembers = function(name,id,data){
        $state.go("app.groupMembers",{name:name,id:id,data:data});
    };
    $scope.goToGrpInvites = function(name,id,data){
        $state.go("app.groupPendingInvites",{name:name,id:id,data:data});
    };
    $scope.goToPendingReq = function(name,id,data){
        $state.go("app.groupRequests",{name:name,id:id,data:data});
    };
});

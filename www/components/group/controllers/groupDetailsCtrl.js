group.controller('GroupDetailsCtrl', function (groupService,$stateParams,$state,$actionButton,$scope,$rootScope) {
    $scope.groupDetails = $stateParams.group;
    console.log("Data from state\n",$scope.groupDetails);
    $scope.defaultAvatar = "http://ecx.images-amazon.com/images/I/41D5vU4I1NL.jpg";
    $scope.groupDetails.expand = false;
    $scope.showMoreDescription = function(selectedGroup){
      console.log("old expand : ",selectedGroup.expand);
      selectedGroup.expand=!  selectedGroup.expand;
      console.log("new expand : ",selectedGroup.expand);
    };

    $scope.goToPosts = function(name,data){
        $state.go("app.groupPosts",{name:name,data:data});
    };
    $scope.goToGrpInvites = function(name,data){
        $state.go("app.groupPendingInvites",{name:name,data:data});
    };
    $scope.goToPendingReq = function(name,data){
        $state.go("app.groupRequests",{name:name,data:data});
    };
});

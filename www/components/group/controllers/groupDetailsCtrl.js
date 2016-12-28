group.controller('GroupDetailsCtrl', function(groupService, $stateParams, $state, $actionButton, $scope, $rootScope) {
    $scope.groupDetails = {};
    if ($stateParams.group.type) {
        $scope.groupDetails = $stateParams.group;
        console.log("Data from state\n", $scope.groupDetails);
        $scope.groupDetails.expand = false;
    } else {
        $scope.groupID = $stateParams.group.id;
        console.log($stateParams);
        groupService.fetchGroupsDetail().then(function(response) {
            console.log("Available group list data :\n", response);
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].id == $scope.groupID) {
                    $scope.groupDetails = response.data[i];
                }
            }
            console.log("Data from state\n", $scope.groupDetails);
            $scope.groupDetails.expand = false;
            // $scope.groupDetails = response.data;
        }).catch(function(error) {
            console.log("Error occurred in fetching groups list");
            console.log(error);
        });
    }
    $scope.groupDetails = $stateParams.group;
    console.log("Data from state\n", $scope.groupDetails);
    $scope.defaultAvatar = "http://ecx.images-amazon.com/images/I/41D5vU4I1NL.jpg";
    $scope.groupDetails.expand = false;

    $scope.createPostView = false;
    $scope.goBack = function() {
        $state.go('app.group.manage');
    };
    $scope.defaultAvatar = "http://ecx.images-amazon.com/images/I/41D5vU4I1NL.jpg";

    $scope.post = {
        title: "",
        content: ""
    };
    $scope.createPost = function() {
        ///gpr/v2/groups/26/posts

        groupService.submitPost($scope.post, $scope.groupDetails.id).then(function(response) {
            console.log("Submit created post by user");
        }).catch(function(error) {
            console.log("Error occurred while creating post");
        })
    };
    $scope.showMoreDescription = function(selectedGroup) {
        console.log("old expand : ", selectedGroup.expand);
        selectedGroup.expand = !selectedGroup.expand;
        console.log("new expand : ", selectedGroup.expand);
    };
    $scope.showCreatePostView = function() {
        $scope.createPostView = !$scope.createPostView;
    };
    groupService.fetchGroupDetail($scope.groupDetails.id).then(function(response) {
        console.log("Group detail");
        console.log(response);
        $scope.postData = response.data;
    }).catch(function(error) {
        console.log("Error occurred in fetching group detail");
        console.log(error);
    });

    console.log($scope.groupDetails.id);
    // for post data fetching
    if ($scope.groupDetails.id) {
        groupService.fetchGroupDetail($scope.groupDetails.id).then(function(response) {
            console.log("Group detail");
            console.log(response);
            $scope.postData = response.data;
        }).catch(function(error) {
            console.log("Error occurred in fetching group detail");
            console.log(error);
        });
    }
    $scope.goToMembers = function(name, id, data) {
        $state.go("app.groupMembers", {
            name: name,
            id: id,
            data: data
        });
    };
    $scope.goToGrpInvites = function(name, id, data) {
        $state.go("app.groupPendingInvites", {
            name: name,
            id: id,
            data: data
        });
    };
    $scope.goToPendingReq = function(name, id, data) {
        $state.go("app.groupRequests", {
            name: name,
            id: id,
            data: data
        });
    };
});

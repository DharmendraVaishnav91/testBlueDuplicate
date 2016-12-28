group.controller('GroupDetailsCtrl', function (groupService, $stateParams, $state, $actionButton, $scope, $rootScope) {

    $scope.groupID = $rootScope.groupId;
    console.log($stateParams);
    groupService.fetchGroupDetail($rootScope.groupId).then(function (response) {
        $scope.groupDetails = response.data;
        console.log("Data from state\n", $scope.groupDetails);
    }).catch(function (error) {
        console.log("Error occurred in fetching groups list");
        console.log(error);
    });
    //}

    $scope.defaultAvatar = "http://ecx.images-amazon.com/images/I/41D5vU4I1NL.jpg";

    $scope.createPostView = false;
    $scope.goBack = function () {
        $state.go('app.group.manage');
    };

    $scope.post = {
        title: "",
        content: ""
    };
    $scope.createPost = function () {
        groupService.submitPost($scope.post, $rootScope.groupId).then(function (response) {
            console.log("Submit created post by user");
        }).catch(function (error) {
            console.log("Error occurred while creating post");
        })
    };

    $scope.showCreatePostView = function () {
        $scope.createPostView = !$scope.createPostView;
    };
    groupService.fetchGroupPosts($rootScope.groupId).then(function (response) {
        console.log("Group detail");
        console.log(response);
        $scope.postData = response.data;
    }).catch(function (error) {
        console.log("Error occurred in fetching group detail");
        console.log(error);
    });

    $scope.goToMembers = function (name, id, data) {
        $state.go("app.groupMembers", {name: name, id: id, data: data});
    };
    $scope.goToGrpInvites = function (name, id, data) {
        $state.go("app.groupPendingInvites", {name: name, id: id, data: data});
    };
    $scope.goToPendingReq = function (name, id, data) {
        $state.go("app.groupRequests", {name: name, id: id, data: data});
    };
});

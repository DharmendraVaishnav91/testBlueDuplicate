group.controller('GroupJoinRequestCtrl', function (groupService,$scope,$rootScope,$cordovaToast) {

    var fetchJoinRequests= function () {
        groupService.fetchJoinRequest().then(function (response) {
            console.log("Requests for joining group");
            console.log(response);
            $scope.groupJoinRequests=response.data;
        }).catch(function (error) {
            console.log("Error occurred in fetching requests for joining groups");
            console.log(error);

        });
    };
    fetchJoinRequests();
    $scope.processRequest= function (joinRequest, reqResStr) {
        var data={
            group_invite_id:joinRequest.id,
            group_id:joinRequest.attributes.group_id
        };
        groupService.processGroupJoinRequest(data,reqResStr).then(function (response) {
            console.log("Processing to organization request for joining");
            fetchJoinRequests();
            $cordovaToast.showShortBottom("Request approved successfully.");
        }).catch(function (error) {
            console.log("Error occurred while processing org invitation for joining");
        })
    }
});

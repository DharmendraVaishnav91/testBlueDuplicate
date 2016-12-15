group.controller('GroupInviteCtrl', function (groupService,$scope,$rootScope) {

    groupService.fetchGroupInvitations().then(function (response) {
        console.log("Fetching org invites")   ;
        console.log(response);
        $scope.groupRequests=response;

    }).catch(function (error) {
        console.log("Error occurred while fetching org invitations");
        console.log(error);
    });


    $scope.processRequest= function (invitationId, reqResStr) {
        groupService.processOrgRequest(invitationId,reqResStr).then(function (response) {
            console.log("Processing to organization request for joining");
        }).catch(function (error) {
            console.log("Error occurred while processing org invitation for joining");
        })
    }
});

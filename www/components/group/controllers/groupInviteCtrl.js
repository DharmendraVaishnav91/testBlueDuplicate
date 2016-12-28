group.controller('GroupInviteCtrl', function (groupService,$scope,$rootScope) {

    groupService.fetchGroupInvitations().then(function (response) {
        console.log("Fetching org invites")   ;
        console.log(response);
        $scope.groupRequests=response.data;

    }).catch(function (error) {
        console.log("Error occurred while fetching org invitations");
        console.log(error);
    });


    $scope.processRequest= function (invitationReq, reqResStr) {
        var data={
            group_invite_id:invitationReq.id,
            group_id:invitationReq.attributes.group_id
        };
        groupService.processOrgRequest(data,reqResStr).then(function (response) {
            console.log("Processing to organization request for joining");
        }).catch(function (error) {
            console.log("Error occurred while processing org invitation for joining");
        })
    }
});

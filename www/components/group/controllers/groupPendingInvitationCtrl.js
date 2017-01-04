/**
 * Created by dharmendra on 03/01/17.
 */
group.controller('GroupPendingInvitationsCtrl', function ($scope,groupService,$rootScope) {
    console.log("welcome to org tab view controller");
    var fetchGroupsInWhichInvited=function () {
        groupService.fetchGroupPendingInvitations().then(function (response) {
            console.log("Fetching org invites")   ;
            console.log(response);
            $scope.groupPendingInvitations=response.data;

        }).catch(function (error) {
            console.log("Error occurred while fetching org invitations");
            console.log(error);
        });
    };
    fetchGroupsInWhichInvited();

    $scope.processRequest= function (invitationReq, reqResStr) {
        var data={
            group_invite_id:invitationReq.id,
            group_id:invitationReq.attributes.group_id
        };
        groupService.processOrgRequest(data,reqResStr).then(function (response) {
            console.log("Processing to group request for joining");
            fetchGroupsInWhichInvited()
        }).catch(function (error) {
            console.log("Error occurred while processing group invitation for joining");
        })
    };


});
/**
 * Created by dharmendra on 30/11/16.
 */
org.controller('OrganizationInvitationsCtrl', function ($scope) {
    console.log("welcome to org tab view controller");
    $scope.pendingInvitations=[
        {
            name:"Yogesh vaishnav",
            mobile:"8233772276",
            status:"Invited",
            invitedOn:"27 Nov 2014"
        },
        {
            name:"Aditya vaishnav",
            mobile:"8947942138",
            status:"Accepted",
            invitedOn:"27 Nov 2014"
        },
        {
            name:"Deepak vaishnav",
            mobile:"8947942138",
            status:"Invited",
            invitedOn:"27 Nov 2014"
        },
        {
            name:"Ajay vaishnav",
            mobile:"8947942138",
            status:"Accepted",
            invitedOn:"27 Nov 2014"
        },
        {
            name:"Vijay vaishnav",
            mobile:"8947942138",
            status:"Invited",
            invitedOn:"27 Nov 2014"
        }
    ];
});
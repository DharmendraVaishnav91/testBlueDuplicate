/**
 * Created by dharmendra on 9/12/16.
 */
/**
 * Created by dharmendra on 30/11/16.
 */
org.controller('OrgInviteCtrl', function ($scope,orgService,$rootScope) {
    console.log("welcome to org tab view controller");
    orgService.fetchOrgInvitations().then(function (response) {
        console.log("Fetching org invites")   ;
        console.log(response);
        $scope.orgRequests=response;

    }).catch(function (error) {
        console.log("Error occurred while fetching org invitations");
        console.log(error);
    });


    $scope.processRequest= function (invitationId, reqResStr) {
      orgService.processOrgRequest(invitationId,reqResStr).then(function (response) {
          console.log("Processing to organization request for joining");
      }).catch(function (error) {
          console.log("Error occurred while processing org invitation for joining");
      })
    }
});
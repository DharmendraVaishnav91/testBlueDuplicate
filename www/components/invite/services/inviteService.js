/**
 * Created by dharmendra on 15/9/16.
 */


userSetting.factory('inviteService',function($http,$ionicPopup,$q,$rootScope,utilityService) {

    var self = this;

    self.fetchAllGroupInvitations= function () {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.groupPendingInvitations,
            method:HttpRequestType.GET,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.acceptOrRejectInvitation= function (acceptOrRejectStr,inviteId) {
        var deferred = $q.defer();
        var req={
            url:acceptOrRejectStr==INVITATION.ACCEPT?HttpRoutes.acceptGroupInvitation:HttpRoutes.rejectGroupInvitation,
            method:HttpRequestType.POST,
            data:{id:inviteId},
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };

    return self;
});

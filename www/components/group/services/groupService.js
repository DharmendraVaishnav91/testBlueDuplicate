group.factory('groupService', function ($http, $ionicPopup, $q, $rootScope, utilityService) {
    var self = this;

    self.fetchGroupsDetail = function () {
        var deferred = $q.defer();
        var req = {
            url: HttpRoutes.getGroupDetails,
            method: HttpRequestType.GET,
            headers: {
                'Authorization': 'Token ' + $rootScope.auth_token,
                'Accept': 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req, deferred);
    };

    self.createGroup = function (data) {
        var deferred = $q.defer();
        var req = {
            url: HttpRoutes.createGroup,
            method: HttpRequestType.POST,
            data: data,
            headers: {
                'Authorization': 'Token ' + $rootScope.auth_token,
                'Accept': 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req, deferred);
    };
    self.fetchGroupInvitations = function () {
        var deferred = $q.defer();
        var req = {
            url: HttpRoutes.fetchGroupInvites,
            method: HttpRequestType.GET,
            headers: {
                'Authorization': 'Token ' + $rootScope.auth_token,
                'Accept': 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req, deferred);
    };
    self.fetchJoinRequest= function () {
        var deferred = $q.defer();
        var req = {
            url: HttpRoutes.fetchGroupJoinRequests,
            method: HttpRequestType.GET,
            headers: {
                'Authorization': 'Token ' + $rootScope.auth_token,
                'Accept': 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req, deferred);
    };
    self.processGroupJoinRequest= function (data, reqStr) {
        var deferred = $q.defer();
        var req = {
            method: reqStr=="Accept"?HttpRequestType.POST:HttpRequestType.DELETE,
            headers: {
                'Authorization': 'Token ' + $rootScope.auth_token,
                'Accept': 'application/json'
            }
        };
        if(reqStr=='Accept'){
            req.url=HttpRoutes.createGroup+data.group_id+"/group_memberships/accept";
            req.data={
                group_membership:data
            };
        }else{
            req.url=HttpRoutes.createGroup+data.group_id+"/group_invites/"+data.group_invite_id+"/reject";
        }
        return utilityService.makeHTTPRequest(req, deferred);
    };
    return self;
});

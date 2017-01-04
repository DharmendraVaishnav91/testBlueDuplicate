group.factory('groupService', function ($http, $ionicPopup, $q, $rootScope, utilityService) {
    var self = this;

    self.fetchGroupsDetail = function () {
        var deferred = $q.defer();
        var req = {
            url: HttpRoutes.createGroup,
            method: HttpRequestType.GET,
            headers: {
                'Authorization': 'Token ' + $rootScope.auth_token,
                'Accept': 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req, deferred);
    };

    self.fetchGroupDetail = function (groupId) {
        var deferred = $q.defer();
        var req = {
            url: HttpRoutes.createGroup+groupId,
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
    self.fetchGroupPendingInvitations=function () {
        var deferred = $q.defer();
        var req = {
            url:HttpRoutes.fetchGroupInvites,
            method: HttpRequestType.GET,
            headers: {
                'Authorization': 'Token ' + $rootScope.auth_token,
                'Accept': 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req, deferred);
    };
    self.processOrgRequest = function (data, reqStr) {
      var deferred = $q.defer();
      var req = {
          method: reqStr=="Accept"?HttpRequestType.POST:HttpRequestType.DELETE,
          headers: {
              'Authorization': 'Token ' + $rootScope.auth_token,
              'Accept': 'application/json'
          }
      };
      if(reqStr=='Accept'){
          req.url=HttpRoutes.processGroupInvites+data.group_id+"/group_memberships/accept";
          req.data={
              group_membership:data
          };
      }else{
          req.url=HttpRoutes.processGroupInvites+data.group_id+"/group_invites/"+data.group_invite_id;
      }
      return utilityService.makeHTTPRequest(req, deferred);
    };
    self.fetchGroupPosts= function (group_id) {

        var deferred = $q.defer();
        var req = {
            url:HttpRoutes.createGroup+group_id+"/posts",
            method: HttpRequestType.GET,
            headers: {
                'Authorization': 'Token ' + $rootScope.auth_token,
                'Accept': 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req, deferred);
    };
    self.submitPost= function (postData,groupId) {

        var deferred = $q.defer();
        var req = {
            url:HttpRoutes.createGroup+groupId+"/posts",
            method: HttpRequestType.POST,
            data:postData,
            headers: {
                'Authorization': 'Token ' + $rootScope.auth_token,
                'Accept': 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req, deferred);
    };
    self.checkUser = function(phone){
      var deferred = $q.defer();
      var req = {
          url:HttpRoutes.checkUser+phone,
          method: HttpRequestType.GET,
          headers: {
              'Authorization': 'Token ' + $rootScope.auth_token,
              'Accept': 'application/json'
          }
      };
      return utilityService.makeHTTPRequest(req, deferred);
    };
    self.inviteGroupMembers = function(data,gid){
      var deferred = $q.defer();
      var req = {
          url:HttpRoutes.createGroup+gid+"/group_invites",
          method: HttpRequestType.POST,
          data: data,
          headers: {
              'Authorization': 'Token ' + $rootScope.auth_token,
              'Accept': 'application/json'
          }
      };
      return utilityService.makeHTTPRequest(req, deferred);
    };
    return self;
});

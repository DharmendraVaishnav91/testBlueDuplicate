group.factory('groupService',function($http,$ionicPopup,$q,$rootScope,utilityService) {
  var self = this;

  self.fetchGroupsDetail= function () {
      var deferred = $q.defer();
      var req={
          url:HttpRoutes.getGroupDetails,
          method:HttpRequestType.GET,
          headers: {
              'Authorization': 'Token '+ $rootScope.auth_token,
              'Accept' : 'application/json'
          }
      };
      return utilityService.makeHTTPRequest(req,deferred);
  };

  self.createGroup = function(data){
    var deferred = $q.defer();
    var req={
        url:HttpRoutes.createGroup,
        method:HttpRequestType.POST,
        data:data,
        headers: {
            'Authorization': 'Token '+ $rootScope.auth_token,
            'Accept' : 'application/json'
        }
    };
    return utilityService.makeHTTPRequest(req,deferred);
  };
  return self;
});

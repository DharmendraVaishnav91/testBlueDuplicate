/**
 * Created by dharmendra on 30/11/16.
 */
 org.factory('orgService',function($http,$ionicPopup,$q,$rootScope,utilityService) {

     var self = this;

     self.fetchOrgInfo= function () {
         var deferred = $q.defer();
         var req={
             url:HttpRoutes.fetchOrgInfo,
             method:HttpRequestType.GET,
             headers: {
                 'Authorization': 'Token '+ $rootScope.auth_token,
                 'Accept' : 'application/json'
             }
         };
         return utilityService.makeHTTPRequest(req,deferred);
     };

     return self;
});

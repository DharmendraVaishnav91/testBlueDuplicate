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

     self.fetchOrgInvitations= function () {
         var deferred = $q.defer();
         var req={
             url:HttpRoutes.fetchOrgInvites,
             method:HttpRequestType.GET,
             headers: {
                 'Authorization': 'Token '+ $rootScope.auth_token,
                 'Accept' : 'application/json'
             }
         };
         return utilityService.makeHTTPRequest(req,deferred);
     };
     self.processOrgRequest= function (invitationId,reqResStr) {
        var deferred=$q.defer();
        var req={
            url:reqResStr=='Accept'?HttpRoutes.acceptOrgInvite:HttpRoutes.rejectOrgInvite,
            method:HttpRequestType.POST,
            data:{
                id:invitationId
            },
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        }
         return utilityService.makeHTTPRequest(req,deferred);
     };
     self.inviteOrgMembers = function(dataToSend) {
       var deferred = $q.defer();
       var req={
           url:HttpRoutes.inviteOrgMember,
           method:HttpRequestType.POST,
           data:dataToSend,
           headers: {
               'Authorization': 'Token '+ $rootScope.auth_token,
               'Accept' : 'application/json'
           }
       };
       return utilityService.makeHTTPRequest(req,deferred);
     };

     self.updateOrgInfo = function(dataToUpdate,orgID){
       var deferred = $q.defer();
       var req={
           url:HttpRoutes.updateOrg+orgID,
           method:HttpRequestType.PUT,
           data:dataToUpdate,
           headers: {
               'Authorization': 'Token '+ $rootScope.auth_token,
               'Accept' : 'application/json'
             }
       };
       return utilityService.makeHTTPRequest(req,deferred);
     };
     self.fetchOrgMapMarkers= function (params) {

         var deferred = $q.defer();
         var req={
             url:HttpRoutes.fetchOrgMapMarkers+"/?"+params,
             method:HttpRequestType.GET,
             dataType: 'json',
             headers: {
                 'Authorization': 'Token '+ $rootScope.auth_token,
                 'Accept' : 'application/json'
             }
         };
         // if(params!=""){
         //     req.url+="?"+params;
         // }

         return utilityService.makeHTTPRequest(req,deferred);

     } ;
     return self;
});

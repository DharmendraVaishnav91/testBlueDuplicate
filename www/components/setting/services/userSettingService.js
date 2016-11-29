/**
 * Created by dharmendra on 23/8/16.
 */

userSetting.factory('userSettingService',function($http,$ionicPopup,$q,$rootScope,utilityService) {

    var self = this;

    self.fetchUserInfo= function (actorId) {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchUserDetail+actorId,
            method:HttpRequestType.GET,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);

    };
    self.updateUserInfo = function (userInfo) {
        var deferred = $q.defer();
        var req={
            //url:HttpRoutes.fetchUserDetail+userInfo.actorid,
            url:HttpRoutes.fetchUserDetail,
            method:HttpRequestType.PUT,
            data:userInfo,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.sendInviteInGroup = function (inviteData) {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.inviteInGroup,
            method:HttpRequestType.POST,
            data:inviteData,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.fetchAllLocations= function () {

        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchWorkPlaces,
            method:HttpRequestType.GET,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);

    } ;
    self.fetchAllFamilyInvitedMembers = function () {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.invitedFamilyMembers,
            method:HttpRequestType.GET,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.sendInviteToFamilyMembers = function (invitedData) {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.signUpFamily,
            method:HttpRequestType.POST,
            data:invitedData ,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };

    self.fetchAllGroups = function () {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchGroups,
            method:HttpRequestType.GET,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.fetchGroupInfo = function (businessRelId) {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchGroups+"/"+businessRelId,
            method:HttpRequestType.GET,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.fetchAllThings = function () {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchAllThings,
            method:HttpRequestType.GET,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.saveAsset = function (assetData) {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchAssetDetail,
            method:HttpRequestType.POST,
            data:assetData,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.fetchThingInfo = function (assetId) {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchAssetDetail+"/"+assetId,
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

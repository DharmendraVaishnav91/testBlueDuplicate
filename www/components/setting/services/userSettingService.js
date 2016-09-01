/**
 * Created by dharmendra on 23/8/16.
 */

userSetting.factory('userSettingService',function($http,$ionicPopup,$q,$rootScope,utilityService) {

    var self = this;
    self.fetchAllLocations= function () {

        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchAllLocations,
            method:HttpRequestType.GET,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);

    } ;
    self.fetchAllGroups = function () {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchGroups,
            method:HttpRequestType.GET,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token
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
                'Authorization': 'Token '+ $rootScope.auth_token
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };

    return self;
});
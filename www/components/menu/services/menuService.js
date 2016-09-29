/**
 * Created by dharmendra on 23/8/16.
 */

menu.factory('menuService',function($http,$ionicPopup,$q,$rootScope,utilityService) {

    var self = this;

    self.fetchUserInfo= function (actorId) {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchUserDetail+actorId,
            method:HttpRequestType.GET,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);

    };
    self.selectLanguage= function (language) {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.selectLanguage,
            method:HttpRequestType.POST,
            data:{language:language},
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);

    };
    self.fetchPreferredLanguage= function () {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchPreferredLanguage,
            method:HttpRequestType.GET,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);

    };


    return self;
});
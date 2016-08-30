/**
 * Created by dharmendra on 23/8/16.
 */

userSetting.factory('userSetting',function($http,$ionicPopup,$q,$rootScope,utilityService) {

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
    return self;
});
/**
 * Created by dharmendra on 31/8/16.
 */
/**
 * Created by dharmendra on 23/8/16.
 */

app.factory('dashboardService',function($http,$ionicPopup,$q,$rootScope,utilityService) {

    var self = this;
    self.fetchMarkers= function (params) {

        var deferred = $q.defer();
        var req={
            url:HttpRoutes.visitorBluenumber,
            method:HttpRequestType.GET,
            dataType: 'json',
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token
            }
        };
        if(params!=""){
            req.url+="?"+params;
        }

        return utilityService.makeHTTPRequest(req,deferred);

    } ;

    return self;
});
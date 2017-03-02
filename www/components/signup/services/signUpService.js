/**
 * Created by dharmendra on 9/9/16.
 */
/**
 * Created by dharmendra on 16/8/16.
 */
loginService.factory('signUpService',function($http,$ionicPopup,$q,$rootScope,utilityService,$localStorage) {

    var self = this;

    self.requestOTP=function(postData){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.requestOTP,
            method:HttpRequestType.POST,
            data:postData,
            headers: {
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.confirmOTP=function(postData){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.confirmOTP,
            method:HttpRequestType.POST,
            data:postData,
            headers: {
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.fetchCountryCode=function(){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchCountryCode,
            method:HttpRequestType.GET,
            headers: {
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.fetchStates=function(countryCode){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchSubDivisionList+""+countryCode,
            method:HttpRequestType.GET,
            headers: {
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.checkUserNameAvailability= function (mobileWithCountryCode) {
        var username=mobileWithCountryCode;
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.checkUserName+""+username,
            method:HttpRequestType.GET,
            headers: {
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);

    } ;

    self.createUser=function(userData){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.signUpStep1,
            data:userData,
            method:HttpRequestType.POST,
            headers: {
                'Accept' : 'application/json'
            }
        };
        console.log(req);
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.saveUserHome=function(userData){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.signUpHome,
            data:{home:userData},
            method:HttpRequestType.POST,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        console.log(req);
        return utilityService.makeHTTPRequest(req,deferred);
    };

    self.fetchWorkTypes = function () {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.workTypes,
            method:HttpRequestType.GET ,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    } ;
    self.fetchAllLocation = function () {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchAllCreatedLocations,
            method:HttpRequestType.GET ,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        console.log(req);
        return utilityService.makeHTTPRequest(req,deferred);
    } ;
    self.fetchProductsList=function(){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchProductList,
            method:HttpRequestType.GET,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.saveWorkData =function(workData){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.signUpStep2,
            data:workData,
            method:HttpRequestType.POST,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        console.log(req);
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.fetchThingsType = function () {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.thingTypes,
            method:HttpRequestType.GET,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        console.log(req);
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.saveThingsData =function(thingsData){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.signUpStep3,
            data:thingsData,
            method:HttpRequestType.POST,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        console.log(req);
        return utilityService.makeHTTPRequest(req,deferred);
    };

    self.fetchGroupsType = function () {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.groupTypes,
            method:HttpRequestType.GET,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        console.log(req);
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.saveGroupsData =function(groupsData){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.signUpStep4,
            data:groupsData,
            method:HttpRequestType.POST,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token,
                'Accept' : 'application/json'
            }
        };
        console.log(req);
        return utilityService.makeHTTPRequest(req,deferred);
    };

    return self;
});

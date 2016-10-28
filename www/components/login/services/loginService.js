/**
 * Created by dharmendra on 16/8/16.
 */
var loginService=angular.module("login.service", []);

loginService.factory('loginService',function($http,$ionicPopup,$q,$rootScope,utilityService,$localStorage) {

    var self = this;
    //Validate user if user already logged in then return user otherwise null
    self.validateLogin=function(){
        var user=$localStorage[STORAGE.LOGIN_KEY];
        if(user!=null&&user!=undefined){
            return user;
        }else{
            return null ;
        }
    };

    self.doLogin= function (loginData) {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.login,
            method:HttpRequestType.POST,
            data:loginData
        };

        //var response= utilityService.makeHTTPRequest(req,deferred);

        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.doLogout= function () {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.login,
            method:HttpRequestType.DELETE,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token
            }
        };
        //$http.defaults.headers.common.Authorization = 'Token '+ token;
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.fetchCountryCode=function(){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchCountryCode,
            method:HttpRequestType.GET
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.fetchStates=function(countryCode){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchSubDivisionList+""+countryCode,
            method:HttpRequestType.GET
        };
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.checkUserNameAvailability= function (userData) {
        var username=userData.user.country_phone_code+""+userData.user.mobile;
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.checkUserName+""+username,
            method:HttpRequestType.GET
        };
        return utilityService.makeHTTPRequest(req,deferred);

    } ;

    self.createUser=function(userData){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.signUpStep1,
            data:userData,
            method:HttpRequestType.POST
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
                'Authorization': 'Token '+ $rootScope.auth_token
            }
        };
        console.log(req);
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.fetchAllLocation = function () {
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchAllCreatedLocations,
            method:HttpRequestType.GET ,
            headers: {
                'Authorization': 'Token '+ $rootScope.auth_token
            }
        };
        console.log(req);
        return utilityService.makeHTTPRequest(req,deferred);
    } ;
    self.fetchProductsList=function(){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.fetchProductList,
            method:HttpRequestType.GET
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
                 'Authorization': 'Token '+ $rootScope.auth_token
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
                'Authorization': 'Token '+ $rootScope.auth_token
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
                'Authorization': 'Token '+ $rootScope.auth_token
            }
        };
        console.log(req);
        return utilityService.makeHTTPRequest(req,deferred);
    };

    return self;
});
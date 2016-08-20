/**
 * Created by dharmendra on 16/8/16.
 */
var loginService=angular.module("login.service", []);

loginService.factory('loginService',function($http,$ionicPopup,$q,$rootScope,utilityService) {

    var self = this;
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
             method:HttpRequestType.POST
         };
         console.log(req);
         return utilityService.makeHTTPRequest(req,deferred);
     };
    self.saveThingsData =function(thingsData){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.signUpStep3,
            data:thingsData,
            method:HttpRequestType.POST
        };
        console.log(req);
        return utilityService.makeHTTPRequest(req,deferred);
    };
    self.saveGroupsData =function(groupsData){
        var deferred = $q.defer();
        var req={
            url:HttpRoutes.signUpStep4,
            data:groupsData,
            method:HttpRequestType.POST
        };
        console.log(req);
        return utilityService.makeHTTPRequest(req,deferred);
    };

    return self;
});
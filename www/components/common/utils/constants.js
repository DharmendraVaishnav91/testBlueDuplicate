/**
 * Created by dharmendra on 16/8/16.
 */
var apiUrl= "https://blue-dev.herokuapp.com";
var HttpRequestType = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};
var languages={
     ENGLISH:"en",
     VIETNAMESE:"vi",
     JAPANESE:"jp",
     BURMESE:"br",
     THAI:"th"
};
var STORAGE={
    LOGIN_KEY:"login-key"
};
var HttpRoutes = {
    login:apiUrl+"/gpr/v1/sessions/",
    fetchCountryCode:  apiUrl + '/gpr/country_list/',
    signUpStep1:apiUrl+'/gpr/v2/signup_user/',
    signUpStep2:apiUrl+'/gpr/v2/signup_works/',
    signUpStep3:apiUrl+'/gpr/v2/signup_things/',
    signUpStep4:apiUrl+'/gpr/v2/signup_groups',
    signUpStep5:apiUrl+'/gpr/v2/signup_works/',

    fetchSubDivisionList:apiUrl+'/gpr/national_subdivisions/',
    fetchProductList:apiUrl+'/gpr/product_list',
    fetchAllCreatedLocations:apiUrl+'/gpr/v1/locations/mylocations/' ,
    fetchGroups:apiUrl+"/gpr/v1/groups",
    visitorBluenumber:apiUrl+"/gpr/visitor_bluenumber/"



};



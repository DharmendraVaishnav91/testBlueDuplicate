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
    LOGIN_KEY:"login-key",
    COUNTRIES:"countries"
};
var HttpRoutes = {
    login:apiUrl+"/gpr/v1/sessions/",
    fetchUserDetail:apiUrl+"/gpr/v1/people/",
    fetchCountryCode:  apiUrl + '/gpr/country_list/',
    signUpStep1:apiUrl+'/gpr/v2/signup_user/',
    signUpStep2:apiUrl+'/gpr/v2/signup_works/',
    signUpStep3:apiUrl+'/gpr/v2/signup_things/',
    signUpStep4:apiUrl+'/gpr/v2/signup_groups',
    signUpStep5:apiUrl+'/gpr/v2/signup_works/',
    signUpFamily:apiUrl+"/gpr/v2/signup_family",

    fetchSubDivisionList:apiUrl+'/gpr/national_subdivisions/',
    fetchProductList:apiUrl+'/gpr/product_list',
    fetchAllCreatedLocations:apiUrl+'/gpr/v1/locations/mylocations/' ,
    fetchGroups:apiUrl+"/gpr/v1/groups",
    fetchAllThings:apiUrl+"/gpr/v2/things",
    fetchAssetDetail:apiUrl+"/gpr/v1/assets",
    visitorBluenumber:apiUrl+"/gpr/visitor_bluenumber/",
    inviteInGroup:apiUrl+"/gpr/v1/groups/invite" ,
    inviteFriend:apiUrl+"/gpr/v1/invite_friend",
    invitedFamilyMembers:apiUrl+"/gpr/v1/invited_family_members"



};



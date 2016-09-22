/**
 * Created by dharmendra on 16/8/16.
 */
var apiUrl="https://bnstaging.herokuapp.com";
//var apiUrl= "https://blue-dev.herokuapp.com";
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
var INVITATION={
    ACCEPT:"Accept",
    REJECT:"Reject"
};
var STORAGE={
    LOGIN_KEY:"login-key",
    COUNTRIES:"countries"
};
var DEFAULT_PROFILE_PATH="/assets/user.png"  ;
var DEFAULT_AVATAR_PATH="assets/img/blank-avatar.png";
var HttpRoutes = {
    login:apiUrl+"/gpr/v1/sessions/",
    checkUserName:apiUrl+"/gpr/v2/user_check?username=",
    fetchUserDetail:apiUrl+"/gpr/v1/people/",
    fetchAddressFromCoordinates:apiUrl+"/gpr/v1/process_coordinates/",
    fetchCountryCode:  apiUrl + '/gpr/country_list/',
    signUpStep1:apiUrl+'/gpr/v2/signup_user/',
    signUpStep2:apiUrl+'/gpr/v2/signup_works/',
    signUpStep3:apiUrl+'/gpr/v2/signup_things/',
    signUpStep4:apiUrl+'/gpr/v2/signup_groups',
    signUpStep5:apiUrl+'/gpr/v2/signup_works/',
    signUpFamily:apiUrl+"/gpr/v2/signup_family",
    signUpHome:apiUrl+"/gpr/v2/signup_home/",
    requestOTP:apiUrl+"/gpr/v2/request_otp/",
    confirmOTP:apiUrl+"/gpr/v2/confirm_with_otp/",

    fetchSubDivisionList:apiUrl+'/gpr/national_subdivisions/',
    fetchProductList:apiUrl+'/gpr/product_list',
    fetchAllCreatedLocations:apiUrl+'/gpr/v1/locations/mylocations/' ,
    fetchGroups:apiUrl+"/gpr/v1/groups",
    fetchAllThings:apiUrl+"/gpr/v2/things",
    fetchAssetDetail:apiUrl+"/gpr/v1/assets",
    visitorBluenumber:apiUrl+"/gpr/visitor_bluenumber/",

    inviteInGroup:apiUrl+"/gpr/v1/groups/invite" ,
    inviteFriend:apiUrl+"/gpr/v1/invite_friend",
    bulkInvite:apiUrl+"/gpr/v1/invite_friends",
    invitedFamilyMembers:apiUrl+"/gpr/v1/invited_family_members",
    groupPendingInvitations:apiUrl+"/gpr/v1/groups/group_invites",
    acceptGroupInvitation:apiUrl+"/gpr/v1/groups/accept_invitation/",
    rejectGroupInvitation:apiUrl+"/gpr/v1/groups/reject_invitation/",


    fetchWorkPlaces:apiUrl+"/gpr/v1/assets/work_places",
    workTypes:apiUrl+"/gpr/v2/work_types",
    thingTypes:apiUrl+"/gpr/v2/thing_types",
    groupTypes:apiUrl+"/gpr/v2/group_types"

};



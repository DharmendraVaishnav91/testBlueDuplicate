/**
 * Created by dharmendra on 1/12/16.
 */
menu.controller('InviteOrgMemberCtrl', function($scope, $filter, $state, utilityService, orgService, $rootScope){

    $scope.inviteUser = {};

    utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
        $scope.countryCodeList = response;
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    $scope.getSearchedCountryList=function(query){
      return $filter('filter')($scope.countryCodeList,query);
    } ;

    $scope.backToAccount= function () {
        $state.go('app.organization.detail');
    };

    $scope.inviteOrgMember = function() {
      var phone = $scope.inviteUser.phoneCode.CountryPhoneCode + $scope.inviteUser.mobile;
      var dataToSend = {invitations:[{
                           user_firstname:$scope.inviteUser.firstName,
                           user_lastname:$scope.inviteUser.lastName,
                           user_phone:phone
                         }]
                      };
       console.log(dataToSend);
       orgService.inviteOrgMembers(dataToSend).then(function (response) {
           console.log("Responce from server\n",response);
           $state.go('app.organization.members');
       }).catch(function (error) {
           console.log(error);
       });
    };
});

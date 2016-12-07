/**
 * Created by dharmendra on 30/11/16.
 */
var org=angular.module('app.org',[]);
org.controller('OrganizationTabCtrl', function (orgService,$scope,$rootScope) {
   console.log("welcome to org tab view controller");
   $scope.defaultAvatar=DEFAULT_AVATAR_PATH;
   orgService.fetchOrgInfo().then(function (response) {
      $scope.detailsData = response.data;
      $rootScope.orgDetail = response;
      console.log("Responce from server\n",response);
   }).catch(function (error) {
      console.log(error);
   });
});
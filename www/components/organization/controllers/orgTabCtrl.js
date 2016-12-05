/**
 * Created by dharmendra on 30/11/16.
 */
var org=angular.module('app.org',[]);
org.controller('OrganizationTabCtrl', function (orgService,$scope) {
   console.log("welcome to org tab view controller");
   orgService.fetchOrgInfo().then(function (response) {
      $scope.detailsData = response.data;

      console.log("Responce from server\n",response);
   }).catch(function (error) {
      console.log(error);
   });
});
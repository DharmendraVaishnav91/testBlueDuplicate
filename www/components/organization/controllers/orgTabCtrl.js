/**
 * Created by dharmendra on 30/11/16.
 */
var org=angular.module('app.org',[]);
org.controller('OrganizationTabCtrl', function (orgService,$scope,$rootScope) {
   console.log("welcome to org tab view controller");
   $rootScope.defaultImageURL = "https://cdn0.iconfinder.com/data/icons/human-resources-and-strategy/80/Human_resource_strategy-07-512.png"
   orgService.fetchOrgInfo().then(function (response) {
      $scope.detailsData = response.data;
      $rootScope.orgDetail = response;
      console.log("Responce from server\n",response);
   }).catch(function (error) {
      console.log(error);
   });
});

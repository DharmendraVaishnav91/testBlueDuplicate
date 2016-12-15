group.controller('GroupTabCtrl', function (groupService,$scope,$rootScope) {
   console.log("welcome to group tab view controller");
  //  $scope.defaultAvatar=DEFAULT_AVATAR_PATH;
  //  orgService.fetchOrgInfo().then(function (response) {
  //     $scope.detailsData = response.data;
  //     $rootScope.orgDetail = response;
      // console.log("Responce from server\n",response);
  //  }).catch(function (error) {
  //     console.log(error);
  //  });
  $scope.defaultAvatar = "http://ecx.images-amazon.com/images/I/41D5vU4I1NL.jpg";

});

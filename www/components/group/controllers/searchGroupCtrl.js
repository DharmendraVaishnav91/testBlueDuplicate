group.controller('SearchGroupCtrl', function ($scope, $rootScope, utilityService, $state, groupService){

    $scope.groupDetails = {};
    $scope.searchGroup = function(){
      if($scope.search){
          groupService.searchGroup($scope.search).then(function (response) {
              console.log("Available group list data :\n", response);
              $scope.groupDetails = response.data;
          }).catch(function (error) {
              console.log("Error occurred in fetching groups list");
              console.log(error);
          });
      }
    };

    $scope.defaultAvatar = "http://ecx.images-amazon.com/images/I/41D5vU4I1NL.jpg";

    $scope.showMoreDescription = function (selectedGroup) {
        selectedGroup.expand = !selectedGroup.expand;
    };

    $scope.goBack = function () {
        $state.go('app.group.manage');
    };

    $scope.showGroupDetail = function (group) {
        console.log("Show group detail");
        $rootScope.groupId=group.id;
        $state.go('app.groupDetails');
    };

    $scope.joinGroup = function (gid) {
        groupService.joinGroup(gid).then(function (response) {
            console.log("Available group list data :\n", response);
            $scope.groupDetails = response.data;
        }).catch(function (error) {
            console.log("Error occurred in fetching groups list");
            console.log(error);
        });
    };
});

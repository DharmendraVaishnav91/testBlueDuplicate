group.controller('GroupRequestsCtrl', function (groupService,$stateParams,$scope,$rootScope) {
  console.log($stateParams);
  $scope.data = $stateParams.data;
  $scope.name = $stateParams.name;
});

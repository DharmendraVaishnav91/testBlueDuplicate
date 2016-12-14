var group = angular.module('app.org.group',[]);
group.controller('GroupCtrl', function ($scope, utilityService, $state, groupService){

  $scope.group = {};
  $scope.group.image = "";
  $scope.group.private = false;
  $scope.hideCreateGroup = function () {
      $state.go('app.dashboard');
  };
  var updatedImage=null;
  $scope.changeImage = function () {
      utilityService.getImage().then(function (src) {
          updatedImage = "data:image/png;base64," + src;
          $scope.group.image = updatedImage;

      }, function (err) {
          console.log(JSON.stringify(err));
      })
  };

  $scope.hideCreateGroup = function(){
      $state.go('app.dashboard');
  };

  $scope.createGroup = function(){
      console.log($scope.group);
      var dataToSend = {"group":{
        name: $scope.group.name,
        picture_attributes: {image:$scope.group.image},
        public: !$scope.group.private,
        description: $scope.group.description
      }};
      groupService.createGroup(dataToSend).then(function(responce){
          console.log(responce);
          $state.go("app.group.manage");
      }).catch(function(error){
          console.log(error);
      });
  };
});

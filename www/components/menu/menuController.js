angular.module('app.menu', [])

.controller('MenuCtrl', function($scope,$state) {


  // Open the login modal
  $scope.logout = function() {
    $state.go('login');
  };

});


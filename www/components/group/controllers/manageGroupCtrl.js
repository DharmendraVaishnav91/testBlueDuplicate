group.controller('ManageGroupCtrl', function (groupService,$state,$actionButton,$scope,$rootScope) {

  var actionButton = $actionButton.create({
      mainAction: {
          icon: 'ion-plus-round',
          backgroundColor: '#4E5C6E',
          textColor: ' white',
          onClick: function() {
              console.log('clicked edit BUTTON');
              $state.go('app.createGroup');
          }
      }
  });
});

group.controller('ManageGroupCtrl', function (groupService, $state, $actionButton, $scope, $rootScope) {

    var actionButton = $actionButton.create({
        mainAction: {
            icon: 'fa fa-plus',
            backgroundColor: '#4E5C6E',
            textColor: ' white',
            onClick: function () {
                console.log('clicked edit BUTTON');
            }
        },
        buttons: [{
          icon: 'ion-plus-round',
          label: 'Create',
          backgroundColor: '#4E5C6E',
          iconColor: 'white',
          onClick: function() {
            console.log('clicked create');
            $state.go('app.createGroup');
          }
        }, {
          icon: 'ion-android-search',
          label: 'Search',
          backgroundColor: '#4E5C6E',
          iconColor: 'white',
          onClick: function() {
            console.log('clicked search');
            $state.go('app.searchGroup');
          }
        }]
    });

    groupService.fetchGroupsDetail().then(function (response) {
        console.log("Available group list data :\n", response);
        $scope.groupDetails = response.data;
    }).catch(function (error) {
        console.log("Error occurred in fetching groups list");
        console.log(error);
    });

    $scope.showMoreDescription = function (selectedGroup) {
        selectedGroup.expand = !selectedGroup.expand;
    };

    $scope.showGroupDetail = function (group) {
        console.log("Show group detail");
        $rootScope.groupId=group.id;
        $state.go('app.groupDetails');
    };
});

group.controller('ManageGroupCtrl', function (groupService, $state, $actionButton, $scope, $rootScope) {

    var actionButton = $actionButton.create({
        mainAction: {
            icon: 'ion-plus-round',
            backgroundColor: '#4E5C6E',
            textColor: ' white',
            onClick: function () {
                console.log('clicked edit BUTTON');
                $state.go('app.createGroup');
            }
        }
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
        $state.go('app.groupDetails', {group: group});
    };
});

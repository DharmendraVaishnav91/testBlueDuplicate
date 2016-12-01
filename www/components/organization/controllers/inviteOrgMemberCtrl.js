/**
 * Created by dharmendra on 1/12/16.
 */
menu.controller('InviteOrgMemberCtrl', function($scope, $filter, $state){

    // $state
    $scope.backToAccount= function () {
        $state.go('app.organization.detail');
    };

});

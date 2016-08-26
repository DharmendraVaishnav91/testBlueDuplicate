angular.module('app.menu', [])

    .controller('MenuCtrl', function($scope,$state) {


        // Open the login modal
        $scope.logout = function() {
            $state.go('login');
        };
        $scope.openSetting=function(){
            $state.go('app.setting');
        };
        $scope.goToInvite= function(){

        };
    });


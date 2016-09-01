angular.module('app.menu', [])

    .controller('MenuCtrl', function($scope,$state,loginService,$localStorage,$rootScope) {

        var removeUser= function () {
            $localStorage[STORAGE.LOGIN_KEY]=null;
        };
        // Open the login modal
        $scope.logout = function(){
            loginService.doLogout().then(function(response) {
                removeUser();
                $state.go('login');
            }).catch(function(error){
                console.log(error);
            });
        };
        $scope.openDashboard= function () {
            $state.go('app.dashboard');
        };
        $scope.openSetting=function(){
            $state.go('app.setting');
        };
        $scope.goToInvite= function(){
            $state.go('app.invite');
        };
        $scope.showAbout= function(){
            $state.go('app.aboutInfo');
        };

    });


var menu=angular.module('app.menu', []);

    menu.controller('MenuCtrl', function($scope,$state,loginService,$localStorage,$rootScope) {

        var removeUser= function () {
            $localStorage[STORAGE.LOGIN_KEY]=null;
        };
        // Open the login modal
        $scope.logout = function(){
            loginService.doLogout().then(function(response) {
                removeUser();
                $state.go('home');
            }).catch(function(error){
                removeUser();
                $state.go('home');
                console.log(error);
            });
        };
        $scope.goToSetting= function () {
          console.log("inside goToSetting function in menuController b4 calling state go\n") ;
           $state.go('app.manageSetting');
        };
        $scope.goToInvitations = function () {
            $state.go('app.invitations');
        };
        $scope.openDashboard= function () {
            $state.go('app.dashboard');
        };
        $scope.goToOrganization = function() {
              if($rootScope.user.organization_name){
                  $state.go('app.organization.detail');
              }else{
                  $state.go('app.createOrg') ;
              }
        };
        $scope.goToGroup = function(){
            // if(true){
                $state.go('app.group.manage');
            // }else{
            //     $state.go('app.createGroup') ;
            // }
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

        $scope.npFound = function(){
            var user_role = $rootScope.user.user_role_names;
            for (var i = 0; i < user_role.length; i++) {
                if(user_role[i] == "national_partner"){
                    return true;
                }
            }
            return false;
        };
        $scope.orgFound = function(){
            if($rootScope.user.organization_name && $scope.npFound()){
                return true;
            }else {
              return false;
            }
        };
    });

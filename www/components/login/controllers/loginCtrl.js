/**
 * Created by dharmendra on 8/8/16.
 */
app.controller('LoginCtrl', function($scope,$state,$translate,loginService,$rootScope,$localStorage) {

    // Form data for the login modal
    $scope.loginData = {};

    var saveUser=function(user){
        $localStorage[STORAGE.LOGIN_KEY]=user;
    };

    $scope.doLogin= function () {
        console.log("Doing login") ;

        loginService.doLogin($scope.loginData).then(function (user){
            $rootScope.user=user;
            saveUser(user);
            $state.go('app.dashboard');
        }).catch(function (error) {
            console.log(error);
        });
       // $state.go('app.dashboard');
    };


    $scope.openRegistration= function () {
        $state.go('regCreateAccount');
    }
});

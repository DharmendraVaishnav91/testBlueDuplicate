/**
 * Created by dharmendra on 10/8/16.
 */
app.controller('RegCreateAccountCtrl', function($scope,$state,$ionicModal) {

    // Form data for the login modal
    var openModalType={
        createProfile:1,
        selectUserType:2,
        addHome:3,
        addWork:4,
        addThing:5,
        addGroup:6,
        inviteFamily:7

    };
    $scope.loginData = {};


    $ionicModal.fromTemplateUrl('components/login/views/regCreateProfile.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.regCreateProfileModal= modal;
    });

    $ionicModal.fromTemplateUrl('components/login/views/selectUserType.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.selectUserType= modal;
    });

    $ionicModal.fromTemplateUrl('components/login/views/addHome.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.addHome= modal;
    });

    $ionicModal.fromTemplateUrl('components/login/views/addWork.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.addWork= modal;
    });

    $ionicModal.fromTemplateUrl('components/login/views/addThing.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.addThing= modal;
    });

    $ionicModal.fromTemplateUrl('components/login/views/addGroup.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.addGroup= modal;
    });
    $ionicModal.fromTemplateUrl('components/login/views/inviteFamily.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.inviteFamily= modal;
    });

    $scope.openModal = function (modalType) {


        switch (modalType) {
            case openModalType.createProfile:
                    $scope.regCreateProfileModal.show();
                break;
            case openModalType.selectUserType:
                $scope.selectUserType.show();
                break;
            case openModalType.addHome:
                $scope.addHome.show();
                break;
            case openModalType.addWork:
                $scope.addWork.show();
                break;
            case openModalType.addThing:
                $scope.addThing.show();
                break;
            case openModalType.addGroup:
                $scope.addGroup.show();
                break;
            case openModalType.inviteFamily:
                $scope.inviteFamily();
                break;
            default:
        }
    };
    $scope.closeModal = function (modalType) {
        switch (modalType) {
            case openModalType.createProfile:
                $scope.regCreateProfileModal.hide();
                break;
            case openModalType.selectUserType:
                $scope.selectUserType.hide() ;
                break;
            case openModalType.addHome:
                $scope.addHome.hide();
                break;
            case openModalType.addWork:
                $scope.addWork.hide();
                break;
            case openModalType.addThing:
                $scope.addThing.hide();
                break;
            case openModalType.addGroup:
                $scope.addGroup.hide();
                break;
            case openModalType.inviteFamily:
                $scope.inviteFamily.hide();
                break;
            default:
        }
    };
    $scope.goToProfileCreation = function() {
        $scope.openModal(openModalType.createProfile);
    };
    $scope.goToSelectUserType = function () {
        $scope.openModal(openModalType.selectUserType);
    };
    $scope.goToAddHome=function(){
        $scope.openModal(openModalType.addHome);
    };
    $scope.goToWork= function () {
        $scope.openModal(openModalType.addWork);
    }
});

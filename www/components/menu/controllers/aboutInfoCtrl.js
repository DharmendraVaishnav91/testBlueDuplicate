app.controller('AboutInfoCtrl', function($scope,$state,$ionicModal) {
    //var isIOS = ionic.Platform.isIOS();
    $scope.isAndroid = ionic.Platform.isAndroid();
    // Open the login modal
    var openModalType={
        terms:1
    };
    $ionicModal.fromTemplateUrl('components/menu/views/terms.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.terms= modal;
    });
    $scope.openModal = function (modalType) {
        switch (modalType) {
            case openModalType.terms:
                $scope.terms.show();
                break;
        }
    };
    $scope.closeModal = function (modalType) {
        switch (modalType) {
            case openModalType.terms:
                $scope.terms.hide();
                break;
        }
    };
    $scope.goToTerms=function(){
        $scope.openModal(openModalType.terms);
    };


    // Open the login modal
        

    });

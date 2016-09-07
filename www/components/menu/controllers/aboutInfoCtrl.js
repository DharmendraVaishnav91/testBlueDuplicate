app.controller('AboutInfoCtrl', function($scope,$state,$ionicModal) {
    // Open the login modal
    $scope.isAndroid = ionic.Platform.isAndroid();
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

});
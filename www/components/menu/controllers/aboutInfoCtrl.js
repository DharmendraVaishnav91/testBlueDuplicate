app.controller('AboutInfoCtrl', function($scope,$state,$ionicModal) {
    //var isIOS = ionic.Platform.isIOS();
    $scope.isAndroid = ionic.Platform.isAndroid();
    $scope.appUrl="";
    if($scope.isAndroid){
        $scope.appUrl='https://play.google.com/store/apps/details?id=org.bluenumber.app';
        console.log("Android device");
        console.log("Application link is ="+$scope.appUrl)

    }else{

        $scope.appUrl='https://itunes.apple.com/in/app/bluenumber/id1172243129?mt=8';
        console.log("ios device");
        console.log("Application link is ="+$scope.appUrl)

    }
    // Open the login modal


    var openModalType={
        terms:1
    };
    $scope.openAppLink=function(){
        window.open($scope.appUrl, '_system', 'location=yes')
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

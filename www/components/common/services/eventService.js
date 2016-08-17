angular.module("app.common.events", [])

    .factory("EventService", function ($rootScope, $state,  $ionicLoading) {
        var self = this;

        self.register = function() {
            self.registerIonicLoading();
        };

        self.registerIonicLoading = function() {

            $rootScope.$on('loading:show', function() {
                $ionicLoading.show({template: '<ion-spinner icon="circles" class="spinner-dark"></ion-spinner>'});
            });
            $rootScope.$on('loading:hide', function() {
                $ionicLoading.hide();
                //Set the default message once you hide the loading dialog.

            });
        };

        return self;
    });
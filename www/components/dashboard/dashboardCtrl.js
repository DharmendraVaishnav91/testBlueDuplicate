/**
 * Created by dharmendra on 8/8/16.
 */
app.controller('DashboardCtrl', function($scope, $ionicModal, $timeout,leafletData) {
    $scope.doInit = function() {
        leafletData.getMap('map1').then(function(map) {
            $scope.map = map;
            $log.info(map);
            $log.info(map);
        });
    }

});

/**
 * Created by dharmendra on 8/8/16.
 */
app.controller('DashboardCtrl', function($scope, $ionicModal, $timeout,leafletData) {
    $scope.mark={
            osloMarker: {
                lat: 59.91,
                lng: 10.75,
                message: "I want to travel here!",
                focus: false,
                draggable: false
            },
            SimpleMarker: {
            	lat: 26.47297,
                lng: 75.49,
                message: "I want here!",
                focus: false,
                draggable: false	
            }
        }

    angular.extend($scope, {
        center: {
            lat: 59.91,
            lng: 10.75,
            zoom: 2
        },//Array of markers to add marker
        markers: $scope.mark,
        defaults: {
            scrollWheelZoom: false
        }
    });
});

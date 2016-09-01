/**
 * Created by dharmendra on 8/8/16.
 */
app.controller('DashboardCtrl', function($scope, $ionicModal, $timeout,leafletData,$http,dashboardService) {

    var markers={};
    var accessToken = 'pk.eyJ1IjoiYWxleG9yb25hIiwiYSI6ImNpaGgzYjVteDBtbDB2NWtsNjZsZzBsb3IifQ.q8GZHKN_I8Ht01x096fGlw';
    var markers={
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
    };
    angular.extend($scope, {
        center: {
            lat:38.6280322,
            lng: 26.2408987,
            zoom: 2
        },//Array of markers to add marker ,
        markers: markers,
        defaults: {
            tileLayer:'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + accessToken,
            scrollWheelZoom: false ,
            worldCopyJump: true
        }

    });
     var loadMap= function (e) {
         dashboardService.fetchMarkers().then(function (response) {
             angular.forEach(response, function (key, val) {
                 var marker= {
                     marker: {
                         lat: key.coordinates[0],
                         lang: key.coordinates[1]
                     }
                 };
                 markers["marker"+val]= marker;
             }) ;
         })
     } ;
     loadMap();
});

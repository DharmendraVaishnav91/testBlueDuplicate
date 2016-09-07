/**
 * Created by dharmendra on 8/8/16.
 */
app.controller('DashboardCtrl', function($scope, $ionicModal, $timeout,leafletData,$http,dashboardService) {

    //var accessToken = 'pk.eyJ1IjoiYWxleG9yb25hIiwiYSI6ImNpaGgzYjVteDBtbDB2NWtsNjZsZzBsb3IifQ.q8GZHKN_I8Ht01x096fGlw';
    var markers={

    };
     var loadMap= function () {
         dashboardService.fetchMarkers().then(function (response) {
             angular.forEach(response, function (key, val) {
                 //var marker= {
                 //    marker:
                 markers["marker"+val]= {
                     layer:"india",
                     lng: parseInt(key.coordinates[0]),
                     lat: parseInt(key.coordinates[1]),
                     focus: false,
                     draggable: false
                    }
             }) ;
         })
     } ;
     loadMap();
    angular.extend($scope, {
        center: {
            lat:38.6280322,
            lng: 26.2408987,
            zoom: 2
        },//Array of markers to add marker ,
        markers: markers,
        defaults: {
            scrollWheelZoom: true,
            worldCopyJump: true
        }  ,
        layers:{
            baselayers: {
                mapbox_light: {
                    name: 'Mapbox Light',
                    url: 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token={apikey}',
                    type: 'xyz',
                    layerOptions: {
                        apikey: 'pk.eyJ1IjoiYWxleG9yb25hIiwiYSI6ImNpaGgzYjVteDBtbDB2NWtsNjZsZzBsb3IifQ.q8GZHKN_I8Ht01x096fGlw'
                    }
                }
            },
            overlays: {
                india: {
                    name: "North cities",
                    type: "markercluster",
                    visible: true
                }
            }
        }

    });
});

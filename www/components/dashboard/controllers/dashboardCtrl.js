/**
 * Created by dharmendra on 8/8/16.
 */
app.controller('DashboardCtrl', function ($scope, $ionicModal, $timeout, leafletData, $http, dashboardService, utilityService,signUpService) {

    //var accessToken = 'pk.eyJ1IjoiYWxleG9yb25hIiwiYSI6ImNpaGgzYjVteDBtbDB2NWtsNjZsZzBsb3IifQ.q8GZHKN_I8Ht01x096fGlw';
    $scope.showFilter = false;
    $scope.filter = {};
    var markers = {};
    var layers= {
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
            },
            user:{
                name:"User",
                    type:"markercluster",
                    visible:true
            }
        }
    };
    var zoom=2;
    var defaultLat= 38.6280322;
    var defaultLng=26.2408987;
    var loadMap = function (param,lat,lng) {
        markers={};
        angular.extend($scope, {
            center: {
                lat: lat,
                lng: lng,
                zoom: zoom

            },//Array of markers to add marker ,
            markers: markers,
            defaults: {
                scrollWheelZoom: true,
                worldCopyJump: true,
                minZoom: 1
            },
            layers: layers

        });
        dashboardService.fetchMarkers(param).then(function (response) {
            angular.forEach(response, function (key, val) {
                if(key.user_info==null){

                    markers["marker" + val] = {
                        icon:{
                        },
                        layer: "india",
                        lng: parseFloat(key.coordinates[0]),
                        lat: parseFloat(key.coordinates[1]),
                        message: "<b>Gender: </b> "+key.gender + "<br><b>Crops: </b>" + key.crops+"<br><b>What3words: </b>"+key.w3w ,
                        focus: false,
                        draggable: false
                    }
                }else{
                    markers["marker" + val] = {
                        icon:{
                            iconUrl:"assets/img/user-pin.png",
                            iconSize:[25, 30],
                            iconAnchor:[20, 40]
                        },
                        lng: parseFloat(key.coordinates[0]),
                        lat: parseFloat(key.coordinates[1]),
                        message: key.gender + " " + key.crops,
                        focus: false,
                        draggable: false
                    } ;
                    $scope.userLocation=markers['marker'+val];
                }


            });
        })
    };
    var params="" ;
    loadMap(params,defaultLat,defaultLng);
    var fetchCropList = function(){
        signUpService.fetchProductsList().then(function(response){
            $scope.productList=response;
        }).catch(function(error){
            console.log(error);
        });
    };

    $scope.showFilters = function () {
        fetchCropList();
        $scope.showFilter = !$scope.showFilter;
    };
    $scope.applyFilter= function () {
        var params="";
        if($scope.filter.gender){
            params+="gender="+$scope.filter.gender;
        }else{
            params+="gender=";
        }
        params+="&";
        if($scope.filter.crop){
            params+="crop="+$scope.filter.crop;
        }else{
            params+="crop=";
        }
        markers={};
        zoom=2;
        loadMap(params,defaultLat,defaultLng);

    };
    $scope.showMeOnMap= function () {

       // layers={};
        zoom=15;
        loadMap("",$scope.userLocation.lat,$scope.userLocation.lng);
        $scope.filter={};
        $scope.showFilter=false;
    };
    $scope.resetFilter= function () {
        var params="";
        $scope.filter={};
        zoom=2;
        loadMap(params,defaultLat,defaultLng);
    }
});

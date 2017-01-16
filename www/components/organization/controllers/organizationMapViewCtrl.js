/**
 * Created by dharmendra on 06/01/17.
 */

org.controller('OrganizationMapViewCtrl', function ($scope, $state, $actionButton, orgService, $rootScope,dashboardService,$ionicModal,groupService) {
    console.log("welcome to org map view controller");


    $scope.showFilter = false;
    $scope.filter = {};
    var productListFetched=false;
    var markers = {};
    var zoom=2;
    var defaultLat= 38.6280322;
    var defaultLng=26.2408987;

    // Organization map filter modal
    $ionicModal.fromTemplateUrl('components/organization/views/orgMapFilterModal.html', {
        scope: $scope,
        animation: 'slide-in-top'
    }).then(function (modal) {
        $scope.orgMapFilterModal= modal;
    });

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
            groupMembers: {
                name: "North cities",
                type: "markercluster",
                visible: true
            }
        }
    };

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
        orgService.fetchOrgMapMarkers(param).then(function (response) {
            angular.forEach(response, function (key, val) {
                    markers["marker" + val] = {
                        icon:{
                        },
                        layer: "groupMembers",
                        lng: parseFloat(key.coordinates[0]),
                        lat: parseFloat(key.coordinates[1]),
                        message: "<b>Gender: </b> "+key.gender + "<br><b>Crops: </b>" + key.crops+"<br><b>what3words: </b>"+key.w3w ,
                        focus: false,
                        draggable: false
                    };
            });
        })
    };
    var params="" ;

    loadMap(params,defaultLat,defaultLng);

    var actionButton = $actionButton.create({
        mainAction: {
            icon: 'fa fa-filter',
            backgroundColor: '#4E5C6E',
            textColor: ' white',
            onClick: function() {
                console.log('clicked edit BUTTON');
                $scope.openFilterModal();
            }
        }
    });
    var fetchGroupList=function () {
        groupService.fetchGroupsDetail().then(function (response) {
            console.log("Available group list data :\n", response);
            $scope.groupDetails = response.data;
        }).catch(function (error) {
            console.log("Error occurred in fetching groups list");
            console.log(error);
        });
    };
    fetchGroupList();
    $scope.openFilterModal= function () {

        $scope.orgMapFilterModal.show();
        actionButton.hide();
    };

    $scope.closeOrgFilterModal=function () {
        $scope.orgMapFilterModal.hide();
        actionButton.show();
    };


    $scope.selectedGroups=[];
    $scope.isSelected = function(id) {
        return $scope.selectedGroups.indexOf(id) >= 0;
    };
    $scope.updateSelection = function($event, selectedGroup) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        if (action == 'add' && $scope.selectedGroups.indexOf(selectedGroup) == -1) {
            $scope.selectedGroups.push(selectedGroup);

        }
        if (action == 'remove' && $scope.selectedGroups.indexOf(selectedGroup) != -1) {
            $scope.selectedGroups.splice($scope.selectedGroups.indexOf(selectedGroup), 1);
        }
        console.log($scope.selectedGroups);
    };

    $scope.resetFilters=function () {
        angular.forEach($scope.selectedGroups,function (curGroup) {
           curGroup.checked=false;
        });
        $scope.selectedGroups=[];
    };

    $scope.applyFilters=function () {
        var filterParams="";
        angular.forEach($scope.selectedGroups,function (selectedGroup) {
            filterParams+="groupIds[]="+selectedGroup.id+"&";
        });
        $scope.closeOrgFilterModal();
        loadMap(filterParams,defaultLat,defaultLng);
    };

});

/**
 * Created by dharmendra on 30/11/16.
 */
org.controller('OrganizationDetailCtrl', function ($scope, $state, $actionButton, orgService, $rootScope) {
    console.log("welcome to org tab view controller");

    //orgService.fetchOrgInfo().then(function (response) {
    //    $scope.detailsData = response.data.attributes;
    //    $rootScope.orgDetail = response;
    //    console.log("Responce from server\n",response);
    //}).catch(function (error) {
    //    console.log(error);
    //});

    var actionButton = $actionButton.create({
        mainAction: {
            icon: 'ion-edit',
            backgroundColor: '#4E5C6E',
            textColor: ' white',
            onClick: function() {
                console.log('clicked edit BUTTON');
                $state.go('app.createOrg');
            }
        }
    });
    // $scope.detailsData = {
    //      "owner_name": 'Keshav Sharma',
    //      "description": 'Software Company',
    //      "identifier": 'Meta',
    //      "identifier_type": 'Unknown',
    //      "name": 'Metacube Softwares',
    //      "organization_type": 'IT',
    //      "actor_attributes": {
    //          "location_attributes": {
    //            "name": 'Office',
    //            "latitude": "22",
    //            "longitude": "-103",
    //            "address": 'Sitapura',
    //            "subdivision_code": 'RJ',
    //            "country_code": 'IN',
    //            "postalcode": 302022
    //          },
    //          "picture_attributes": {"image": "blank"}
    //      }
    //    };
});

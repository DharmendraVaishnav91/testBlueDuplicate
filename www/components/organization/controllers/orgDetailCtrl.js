/**
 * Created by dharmendra on 30/11/16.
 */
org.controller('OrganizationDetailCtrl', function ($scope) {
    console.log("welcome to org tab view controller");
    $scope.detailsData = {
         "owner_name": 'Keshav Sharma',
         "description": 'Software Company',
         "identifier": 'Meta',
         "identifier_type": 'Unknown',
         "name": 'Metacube Softwares',
         "organization_type": 'IT',
         "actor_attributes": {
             "location_attributes": {
               "name": 'Office',
               "latitude": "22",
               "longitude": "-103",
               "address": 'Sitapura',
               "subdivision_code": 'RJ',
               "country_code": 'IN',
               "postalcode": 302022
             },
             "picture_attributes": {"image": "blank"}
         }
       };
});

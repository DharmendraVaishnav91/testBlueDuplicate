menu.controller('CreateOrgCtrl', function ($scope, $filter, $state, $timeout, userSettingService, orgService, loginService, signUpService, $localStorage, $rootScope, menuService, utilityService, $translate, $window, $cordovaToast) {

    $scope.loc = {};
    console.log($rootScope.orgDetail);
    $scope.orgImage=null;
     $scope.defaultImageURL=DEFAULT_AVATAR_PATH;
    $scope.changeSubdivision = function (countryCode) {
        fetchStates(countryCode);
    };

    var fetchStates = function (countryCode) {
        loginService.fetchStates(countryCode).then(function (response) {
            $scope.subDivList = response;
        }).catch(function (error) {
            console.log(error);
        })
    };

    $scope.getUpdatedCountryList = function (query) {
        return $filter('filter')($scope.countryCodeList, query);
    };
    $scope.getUpdatedStateList = function (query) {
        return $filter('filter')($scope.subDivList, query);
    };

    $scope.updateLocationFieldsWhileEdit = function () {
        $scope.enableAddressFields = true;
        if ($scope.orgData.included[1].attributes != null) {
            $scope.loc.name = "manual";
            $scope.loc.streetAdd = angular.copy($scope.orgData.included[1].attributes.address);
            $scope.loc.city = angular.copy($scope.orgData.included[1].attributes.city);
            $scope.loc.postalcode = angular.copy($scope.orgData.included[1].attributes.postalcode);
            console.log($scope.orgData.included[1].attributes);
            // $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
            signUpService.fetchStates($scope.orgData.included[1].attributes.country_code).then(function (response) {
                $scope.subDivList = response;

                $scope.loc.state = $filter('getById')($scope.subDivList, "SubdivisionID", $scope.orgData.included[1].attributes.subdivision_code);
            }).catch(function (error) {
                console.log(error);
            });
            //$scope.loc.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
            //$scope.loc.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
            //$scope.data.state = $filter('getById')($scope.subDivList,"SubdivisionCode",$rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
            console.log($scope.countryCodeList);

            $scope.loc.country = $filter('getById')($scope.countryCodeList, "CountryCode", $scope.orgData.included[1].attributes.country_code);
        } else {
            $scope.enableAddressFields = false;
        }
    };

    if ($rootScope.orgDetail != null) {
        $scope.orgData = angular.copy($rootScope.orgDetail);
        $scope.orgImageUrl=$scope.orgData.data.relationships.picture.data?$scope.orgData.data.relationships.picture.data.image.profile_pic.url:null;
        $scope.org = {

            owner_name: $scope.orgData.data.attributes.owner_name,
            description1: $scope.orgData.data.attributes.description,
            identifier: $scope.orgData.data.attributes.identifier,
            identifier_type: $scope.orgData.data.attributes.identifier_type,
            name: $scope.orgData.data.attributes.name,
            organization_type: $scope.orgData.data.attributes.organization_type,
            emp_cnt: $scope.orgData.data.attributes.number_of_employees,
            ownership: $scope.orgData.data.attributes.ownership,
            website: $scope.orgData.data.attributes.website,
            fbPage: $scope.orgData.data.attributes.facebook_page
        };
      //  $scope.image = $scope.orgData.data.picture != null ? $scope.orgData.data.picture.data : "";
        utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
            $scope.countryCodeList = response;
            $scope.updateLocationFieldsWhileEdit();
            console.log("Country list is=");
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

    } else {
        $scope.orgImageUrl =null;
        $scope.org = {};
        utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
            $scope.countryCodeList = response;

            console.log("Country list is=");
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    $scope.hideCreateOrg = function (orgExist) {
        if(orgExist){
          $state.go('app.organization.detail');
        }
        else {
          $state.go('app.dashboard');
        }
    };
    var updatedImage=null;
    $scope.changeImage = function () {
        utilityService.getImage().then(function (src) {
            updatedImage = "data:image/png;base64," + src;
            $scope.orgImage = updatedImage;

        }, function (err) {
            console.log(JSON.stringify(err));
        })
    };

    $rootScope.addressDataFromCoordinate = {};
    var fetchCurrentLocation = function () {
        utilityService.fetchAddressFromCoords($rootScope.position.coords).then(function (addr) {

            $rootScope.addressDataFromCoordinate.userCountry = {
                CountryName: addr.country != null ? addr.country : "",
                CountryCode: addr.country_code != null ? addr.country_code : "",
                CountryPhoneCode: ""
            };
            $rootScope.addressDataFromCoordinate.userState = {
                SubdivisionID: "",
                SubdivisionCode: addr.subdivision_code != null ? addr.subdivision_code : "",
                SubdivisionName: addr.state != null ? addr.state : "",
                CountryCode: $rootScope.addressDataFromCoordinate.userCountry.CountryCode,
                CountryName: $rootScope.addressDataFromCoordinate.userCountry.CountryName
            };
            console.log("User state");
            console.log($rootScope.addressDataFromCoordinate.userCountry);
            $rootScope.addressDataFromCoordinate.city = angular.copy(addr.sub_state != null ? addr.sub_state : "");
            $rootScope.addressDataFromCoordinate.address = angular.copy(addr.street_number != null ? addr.street_number : "");
            $rootScope.addressDataFromCoordinate.address += angular.copy(addr.street_address != null ? addr.street_address : "");
            $rootScope.addressDataFromCoordinate.postalcode = parseInt(angular.copy(addr.postal_code));
            //Prepare data for creating user


        }).catch(function (error) {
            console.log(error);
        });
    };
    utilityService.getPosition().then(function (position) {
        $rootScope.position = position;
        console.log("position in scope");
        console.log($rootScope.position);
        fetchCurrentLocation();
    }).catch(function (error) {
        console.log("Error in occurred in fetching location");
        console.log(error);
    });

    $scope.updateLocationFields = function (lName) {
        $scope.enableAddressFields = true;
        console.log($rootScope.addressDataFromCoordinate);
        console.log(lName);
        if (lName == "current") {
            $scope.loc.streetAdd = angular.copy($rootScope.addressDataFromCoordinate.address);
            $scope.loc.city = angular.copy($rootScope.addressDataFromCoordinate.city);
            $scope.loc.postalcode = angular.copy($rootScope.addressDataFromCoordinate.postalcode);
            console.log($rootScope.addressDataFromCoordinate);
            // $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
            signUpService.fetchStates($rootScope.addressDataFromCoordinate.userCountry.CountryCode).then(function (response) {
                $scope.subDivList = response;
                $scope.loc.state = $filter('getById')($scope.subDivList, "SubdivisionCode", $rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
            }).catch(function (error) {
                console.log(error);
            });
            //$scope.loc.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
            //$scope.loc.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
            //$scope.data.state = $filter('getById')($scope.subDivList,"SubdivisionCode",$rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
            $scope.loc.country = $filter('getById')($scope.countryCodeList, "CountryCode", $rootScope.addressDataFromCoordinate.userCountry.CountryCode); //angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

        } else {
            $scope.loc.streetAdd = $scope.loc.streetAdd != null ? $scope.loc.streetAdd : "";
            $scope.loc.city = $scope.loc.city != null ? $scope.loc.city : "";
            $scope.loc.postalcode = $scope.loc.postalcode != null ? $scope.loc.postalcode : "";
            $scope.loc.state = $scope.loc.state != null ? $scope.loc.state : "";
            $scope.loc.country = $scope.loc.country != null ? $scope.loc.country : "";
        }
    };

    $scope.createOrg = function () {

        var data = {
            "owner_name": $scope.org.owner_name,
            "description": $scope.org.description1,
            "identifier": $scope.org.identifier,
            "identifier_type": $scope.org.identifier_type,
            "name": $scope.org.name,
            "organization_type": $scope.org.organization_type,
            "number_of_employees": $scope.org.emp_cnt,
            "ownership": $scope.org.ownership,
            "website": $scope.org.website,
            "facebook_page": $scope.org.fbPage,
            "actor_attributes": {
                "location_attributes": {
                    "name": $scope.loc.name,
                    "city": $scope.loc.city,
                    "latitude": $rootScope.position.coords.latitude,
                    "longitude": $rootScope.position.coords.longitude,
                    "address": $scope.loc.streetAdd,
                    "subdivision_code": $scope.loc.state.SubdivisionCode,
                    "country_code": $scope.loc.country.CountryCode,
                    "postalcode": $scope.loc.postalCode
                },
                "picture_attributes": {"image": $scope.orgImage}
            }
        };
        console.log(data);
        userSettingService.registerOrg(data).then(function (response) {
            console.log(response);
            $rootScope.user.organization_name = $scope.org.name;
            $rootScope.user.user_role_names.push("national_partner");
            $state.go('app.organization.detail');
        }).catch(function (error) {
            console.log(error);
        });
    };

    $scope.updateOrg = function () {
        // console.log($scope.org);
        // console.log($scope.loc);
        var data = {
            "owner_name": $scope.org.owner_name,
            "description": $scope.org.description1,
            "identifier": $scope.org.identifier,
            "identifier_type": $scope.org.identifier_type,
            "name": $scope.org.name,
            "organization_type": $scope.org.organization_type,
            "number_of_employees": $scope.org.emp_cnt,
            "ownership": $scope.org.ownership,
            "website": $scope.org.website,
            "facebook_page": $scope.org.fbPage,
            "actor_attributes": {
                "id": $scope.orgData.data.relationships.actor.data.id,
                "location_attributes": {
                    "id": $scope.orgData.data.relationships.location.data.id,
                    "name": $scope.loc.name,
                    "city": $scope.loc.city,
                    "latitude": $rootScope.position.coords.latitude,
                    "longitude": $rootScope.position.coords.longitude,
                    "address": $scope.loc.streetAdd,
                    "subdivision_code": $scope.loc.state.SubdivisionCode,
                    "country_code": $scope.loc.country.CountryCode,
                    "postalcode": $scope.loc.postalCode
                },
                "picture_attributes": {
                    "id": $scope.orgData.data.relationships.picture.data != null ? $scope.orgData.data.relationships.picture.data.id : null,
                    "image": $scope.orgImage?$scope.orgImage:null
                }
            }
        };
        console.log(data);
        orgService.updateOrgInfo(data, $scope.orgData.data.id).then(function (response) {
            console.log(response);
            $state.go('app.organization.detail');
        }).catch(function (error) {
            console.log(error);
        });
    };
});

menu.controller('CreateOrgCtrl',function($scope, $filter, $state, userSettingService, loginService, signUpService, $localStorage, $rootScope, menuService, utilityService, $translate, $window, $cordovaToast){

  $scope.org = {};
  $scope.loc = {};

  utilityService.getCountryList($rootScope.selectedLanguage).then(function (response) {
      $scope.countryCodeList = response;
      console.log(response);
  }).catch(function (error) {
      console.log(error);
  });

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

  $scope.getUpdatedCountryList = function(query){
    return $filter('filter')($scope.countryCodeList,query);
  } ;
  $scope.getUpdatedStateList=function(query){
    return $filter('filter')($scope.subDivList,query);
  } ;

  $scope.hideCreateOrg = function(){
      $state.go('app.organization');
  };

  $scope.changeImage= function(){
      utilityService.getImage().then(function(src) {
          updatedImage = "data:image/png;base64," +src;
          $scope.image = updatedImage;

      },function(err) {
          console.log(JSON.stringify(err));
      })
  };

  $rootScope.addressDataFromCoordinate={};
    var fetchCurrentLocation= function () {
        utilityService.fetchAddressFromCoords($rootScope.position.coords).then(function (addr) {

            $rootScope.addressDataFromCoordinate.userCountry={
                CountryName:addr.country!=null?addr.country:"",
                CountryCode:addr.country_code!=null?addr.country_code:"",
                CountryPhoneCode:""
            };
            $rootScope.addressDataFromCoordinate.userState={
                SubdivisionID:"",
                SubdivisionCode:addr.subdivision_code!=null?addr.subdivision_code:"",
                SubdivisionName:addr.state!=null?addr.state:"" ,
                CountryCode:$rootScope.addressDataFromCoordinate.userCountry.CountryCode,
                CountryName:$rootScope.addressDataFromCoordinate.userCountry.CountryName
            };
            console.log("User state");
            console.log($rootScope.addressDataFromCoordinate.userCountry);
            $rootScope.addressDataFromCoordinate.city=angular.copy(addr.sub_state!=null?addr.sub_state:"");
            $rootScope.addressDataFromCoordinate.address= angular.copy(addr.street_number!=null?addr.street_number:"");
            $rootScope.addressDataFromCoordinate.address+=angular.copy(addr.street_address!=null?addr.street_address:"");
            $rootScope.addressDataFromCoordinate.postalcode=parseInt(angular.copy(addr.postal_code));
            //Prepare data for creating user


        }).catch(function (error) {
            console.log(error);
        });
    };
    utilityService.getPosition().then(function (position) {
        $rootScope.position=position;
        console.log("position in scope");
        console.log($rootScope.position);
        fetchCurrentLocation();
    });

  $scope.updateLocationFields = function(lName){
    $scope.enableAddressFields=true;
    console.log($rootScope.addressDataFromCoordinate);
    console.log(lName);
    if (lName == "current") {
        $scope.loc.streetAdd = angular.copy($rootScope.addressDataFromCoordinate.address);
        $scope.loc.city = angular.copy($rootScope.addressDataFromCoordinate.city);
        $scope.loc.postalcode=angular.copy($rootScope.addressDataFromCoordinate.postalcode);
        console.log($rootScope.addressDataFromCoordinate);
       // $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
        signUpService.fetchStates($rootScope.addressDataFromCoordinate.userCountry.CountryCode).then(function (response) {
            $scope.subDivList = response;
            $scope.loc.state = $filter('getById')($scope.subDivList,"SubdivisionCode",$rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
        }).catch(function (error) {
            console.log(error);
        }) ;
        //$scope.loc.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
        //$scope.loc.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
        //$scope.data.state = $filter('getById')($scope.subDivList,"SubdivisionCode",$rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
        $scope.loc.country = $filter('getById')($scope.countryCodeList,"CountryCode",$rootScope.addressDataFromCoordinate.userCountry.CountryCode); //angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

    } else {
        $scope.loc.streetAdd = "";
        $scope.loc.city = "";
        // $scope.loc.postalcode="";
        $scope.loc.state = "";
        $scope.loc.country = "";
    }
  };

  $scope.createOrg = function(){
      // console.log($scope.org);
      // console.log($scope.loc);
      var data = {
        "owner_name": $scope.org.owner_name,
        "description": $scope.org.description1,
        "identifier": $scope.org.identifier,
        "identifier_type": $scope.org.identifier_type,
        "name": $scope.org.name,
        "organization_type": $scope.org.organization_type,
        "actor_attributes": {
            "location_attributes": {
              "name": $scope.loc.name,
              "latitude": "22",
              "longitude": "-103",
              "address": $scope.loc.streetAdd,
              "subdivision_code": $scope.loc.state.SubdivisionCode,
              "country_code": $scope.loc.country.CountryCode,
              "postalcode": $scope.loc.postalCode
            },
            "picture_attributes": {"image": $scope.image}
        }
      };
      console.log(data);
      userSettingService.registerOrg(data).then(function (response) {
          console.log(response);
          $rootScope.user.organization_name = $scope.org.name;
          $rootScope.user.user_role_names.push("national_partner");
          $state.go('app.organization');
      }).catch(function (error) {
          console.log(error);
      });
  };
});

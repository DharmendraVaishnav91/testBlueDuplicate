app.controller('addGroupCtrl', function($timeout,$q,$scope,$state,$ionicPopup,utilityService,$stateParams,signUpService,$rootScope,$cordovaToast) {
  console.log($stateParams.groupData);
  $scope.data=$stateParams.groupData;
  $scope.isFromSetting=false;
  $scope.location={};
  $scope.countryCodeList=utilityService.countryList();
  var fetchLocation= function () {
    signUpService.fetchAllLocation().then(function(response){
       $scope.myLocations=response;
    }).catch(function(error){
       console.log(error);
    });
  };
  fetchLocation();
  var fetchStates= function (countryCode) {
    signUpService.fetchStates(countryCode).then(function (response) {
         $scope.subDivList=response;
    }).catch(function(error){
        console.log(error);
    })
  };
  fetchStates($scope.data.homeCountry)
  $scope.changeSubdivision=function(countryCode){
        fetchStates(countryCode);
  };
  var saveGroupData=function(groupsData){
    console.log(groupsData);
      signUpService.saveGroupsData(groupsData).then(function(response){
          console.log("Group added successfully.");
          $state.go('accntCreateSuccess');
          //$cordovaToast.showShortBottom("Group added successfully.") ;
      }).catch(function(error){
          console.log(error);
          //$cordovaToast.showLongBottom("Something went wrong. Please try again");
      });
  };

  $scope.updateLocationFields = function (locationWay) {
      if (locationWay == "current") {
        $scope.enableAddressFields=true;
        $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
          $scope.location={
            name:"Current",
            latitude:angular.copy($rootScope.position ? $rootScope.position.coords.latitude : ''),
            longitude:angular.copy($rootScope.position ? $rootScope.position.coords.longitude : ''),
            address:angular.copy($rootScope.addressDataFromCoordinate.address),
            city:angular.copy($rootScope.addressDataFromCoordinate.city),
            subdivision_code:angular.copy($rootScope.addressDataFromCoordinate.userState.SubdivisionCode),
            country_code:angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode)
          }
      } else if (locationWay != "manual") {
        $scope.enableAddressFields=false;
        $scope.location={
            name:(JSON.parse($scope.data.groupLocation)).LocationID
          };
      } else {
        $scope.enableAddressFields=true;
        $scope.location={
          name:"Other",
          latitude:"",
          longitude:"",
          address:"",
          city:"",
          subdivision_code:"",
          country_code:""
        }
      }
  };

  $scope.skipToInviteFamily=function(){
    $state.go('accntCreateSuccess') ;
  };

  $scope.goToInviteFamily=function(){
      var groups=[];
      var group1={
          type:$scope.data.groupType,
          relationship:$scope.data.groupRelationship,
          name:$scope.data.groupName
          //location:$scope.data.groupLocation
      };
      group1.location=$scope.location;
      groups.push(group1);
      var groupsData={
          groups:groups
      };

      saveGroupData(groupsData);
      console.log(groupsData);
  };
});

app.controller('addGroupCtrl', function($timeout,$q,$scope,$state,$ionicPopup,utilityService,$stateParams,signUpService,$rootScope,$cordovaToast) {
  console.log($stateParams.groupData);
  $scope.data=$stateParams.groupData;
  $scope.isFromSetting=false;
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
      signUpService.saveGroupsData(groupsData).then(function(response){
          console.log("Group added successfully.");
          $state.go('accntCreateSuccess');
          $cordovaToast.showShortBottom("Group added successfully.") ;
      }).catch(function(error){
          console.log(error);
          $cordovaToast.showLongBottom("Something went wrong. Please try again");
      });
  };

  $scope.skipToInviteFamily=function(){
    $state.go('accntCreateSuccess') ;
  };

  $scope.goToInviteFamily=function(){
      var groups=[];
      var group1={
          type:$scope.data.groupType,
          sub_type:$scope.data.groupSubType,
          relationship:$scope.data.groupRelationship,
          name:$scope.data.groupName
          //location:$scope.data.groupLocation
      };
      //Equipment have location other than existing one
      if($scope.data.groupLocation=='OtherGroupLocation') {
          group1.location={
              name:"Other",
              latitude:$rootScope.position?$rootScope.position.coords.latitude:'',
              longitude:$rootScope.position?$rootScope.position.coords.longitude:'',
              address:$scope.data.otherGroupAddress,
              city:$scope.data.otherGroupCity,
              subdivision_code:$scope.data.otherGroupState?$scope.data.otherGroupState.SubdivisionCode:'',
              country_code:$scope.data.otherGroupCountry.CountryCode

          };

      }else{
          //group1.location=JSON.parse($scope.data.groupLocation);
          group1.location={
              name:(JSON.parse($scope.data.groupLocation)).LocationID
          }
      }
      groups.push(group1);
      var groupsData={
          groups:groups
      };

      saveGroupData(groupsData);
      console.log(groupsData);
  };
});

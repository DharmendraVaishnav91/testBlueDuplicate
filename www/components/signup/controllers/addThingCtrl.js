app.controller('addThingCtrl', function($timeout,$q,$scope,$state,$ionicPopup,utilityService,$stateParams,signUpService,$rootScope,$cordovaToast) {
  console.log($stateParams.thingData);
  $scope.data=$stateParams.thingData;
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
  var saveThingsData=function(thingsData){
      signUpService.saveThingsData(thingsData).then(function(response){
          $state.go('addGroup',{groupData: $scope.data})
          console.log("Equipment added successfully.");
          $cordovaToast.showShortBottom("Equipment added successfully.");
      }).catch(function(error){
          console.log(error);
          $cordovaToast.showLongBottom("Something went wrong. Please try again");
      });
  };

  $scope.skipToGroup=function(){
      $state.go('addGroup',{groupData: $scope.data});
  };

  $scope.goToGroup=function(){
      var things=[];
      var thing1={
          asset_name: $scope.data.assetName,
          equipment_type:$scope.data.equipType,
          relationship:$scope.data.equipRelationship
          //location:$scope.data.equipWhere
      };

      //Equipment have location other than existing one
      if($scope.data.equipWhere=='OtherThingLocation') {
          thing1.location={
              name:"Thing1",
              latitude:$rootScope.position?$rootScope.position.coords.latitude:'',
              longitude:$rootScope.position?$rootScope.position.coords.longitude:'',
              address:$scope.data.otherThingAddress,
              city:$scope.data.otherThingCity,
              subdivision_code:$scope.data.otherThingState?$scope.data.otherThingState.SubdivisionCode:'',
              country_code:$scope.data.otherThingCountry.CountryCode

          };

      }else{
         //thing1.location=JSON.parse($scope.data.equipWhere);
         thing1.location={
             name:(JSON.parse($scope.data.equipWhere)).LocationID
         }
      }

      things.push(thing1);
      var thingsData={
           things:things
      };
      saveThingsData(thingsData);
  };
});

app.controller('addWorkCtrl', function($timeout,$q,$scope,$state,$ionicPopup,utilityService,$stateParams,signUpService,$rootScope,$cordovaToast) {
  console.log($stateParams.workData);
  $scope.enableCrop=false;
  $scope.isFromSetting=false;
  $scope.data=$stateParams.workData;
  $scope.work={};
  $scope.workLocations=[];
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
  //fetchStates($scope.data.homeCountry)
  $scope.changeSubdivision=function(countryCode){
        fetchStates(countryCode);
  };
  var fetchCropList = function(){
      signUpService.fetchProductsList().then(function(response){
          $scope.productList=response;
      }).catch(function(error){
         console.log(error);
      });
  };
  fetchCropList();
  $scope.workTypeChange =function(){
      $scope.enableCrop=$scope.data.type.indexOf('Farm')>-1;
  };
  var saveWorkData =function(workData){
      signUpService.saveWorkData(workData).then(function(response){
          console.log("Work added successfully.");
          $cordovaToast.showShortBottom("Work added successfully.");
          $cordovaToast.showLongBottom("Work data saved successfully");
          //$scope.closeModal(openModalType.addWork);
          $state.go('addThing',{thingData: $scope.data});

      }).catch(function(error){
         console.log(error);
          $cordovaToast.showLongBottom("Something went wrong. Please try again");
          //Remove this after demo
          //$scope.openModal(openModalType.addThing);
      });

  };
  $scope.skipToThing = function () {
      $state.go('addThing',{thingData: $scope.data});
  };

  $scope.goToThing= function(){
      console.log($scope.data);
      var works=[];
      var location1={
          name:"Work1",
          latitude:$rootScope.position?$rootScope.position.coords.latitude:'',
          longitude:$rootScope.position?$rootScope.position.coords.longitude:'',
          address:$scope.work.address,
          city:$scope.work.city,
          subdivision_code:$scope.data.workState?$scope.data.workState.SubdivisionCode:'',
          country_code:$scope.data.workCountry.CountryCode

      };
      var work={
          type:$scope.data.type,
          relationship:$scope.data.relationship,
          location:location1
      };
      if($scope.enableCrop){
          work.crop=$scope.data.crop.H3Code;
          work.hectares=$scope.work.hectare?$scope.work.hectare:0;
      }else{
          work.crop="";
          work.hectares="";
      }
      works.push(work);
      var workData={
          works:works
      };
      console.log("work data");
      console.log(workData);
      $scope.workLocations.push(location1);
      saveWorkData(workData);
      console.log(workData);
  };
});

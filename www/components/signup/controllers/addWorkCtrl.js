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
         // $cordovaToast.showLongBottom("Work data saved successfully");
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
    //Change address fields according user choice
    $scope.updateLocationFields = function (locationWay) {
        $scope.enableAddressFields=true;
        if (locationWay == "current") {
            $scope.work.address = angular.copy($rootScope.addressDataFromCoordinate.address);
            $scope.work.city = angular.copy($rootScope.addressDataFromCoordinate.city);
            $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

            $scope.work.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
            $scope.work.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
            $scope.data.workState = angular.copy($rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
            $scope.data.workCountry = angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
        } else {
            $scope.work.address = "";
            $scope.work.city = "";
            //$scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

            $scope.work.latitude = "";
            $scope.work.longitude = "";
            $scope.data.workState = "";
            $scope.data.workCountry = "";
        }
    };
  $scope.goToThing= function(){
      console.log($scope.data);
      var works=[];
      var location1={
          name:"Work 1",
          latitude:$scope.work.address.latitude,
          longitude:$scope.work.address.longitude,
          address:$scope.work.address,
          city:$scope.work.city,
          subdivision_code: $scope.data.workState? $scope.data.workState:'',
          country_code:$scope.data.workCountry

      };
      var work={
          type:$scope.data.type,
          relationship:$scope.data.relationship,
          location:location1
      };
      //if($scope.enableCrop){
      //    work.crop=$scope.data.crop.H3Code;
      //    work.hectares=$scope.work.hectare?$scope.work.hectare:0;
      //}else{
      //    work.crop="";
      //    work.hectares="";
      //}
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

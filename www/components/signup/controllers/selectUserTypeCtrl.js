app.controller('selectUserTypeCtrl', function($timeout,$q,$scope,$state,$ionicPopup,utilityService,$stateParams,signUpService,$rootScope,$cordovaToast) {
  console.log($stateParams.profileData);
  $scope.loginData=$stateParams.profileData;
  $scope.home={} ;
  $scope.data={};
  var createUser = function(userData){
      console.log("User data before creation");
      console.log(userData);

      signUpService.createUser(userData).then(function(response){
          //$scope.userId=response;
          $rootScope.auth_token=response.auth_token;
          console.log("Registered successfully with your current location.");
          $cordovaToast.showLongBottom("Registered successfully with your current location.");
          $state.go('addHome',{homeData:$scope.data,homeAddress:$scope.home})

      }).catch(function(error){
          var errorMessage="";
          if(error.error_status){
              errorMessage=error.country_code!=null?error.country_code.error:"";
              errorMessage+=error.home_location!=null?error.home_location.error:"";
              errorMessage+=error.user!=null?error.user.error:"";
          }else{
              errorMessage="Something went wrong on server. Please try after some time."
          }
          if(errorMessage!=""){
              $cordovaToast.showLongBottom(errorMessage);
              console.log(errorMessage);
          }
      });
  };
  var fetchStates= function (countryCode) {
    signUpService.fetchStates(countryCode).then(function (response) {
         $scope.subDivList=response;
    }).catch(function(error){
        console.log(error);
    })
  };

  $scope.changeSubdivision=function(countryCode){
        fetchStates(countryCode);
  };

  $scope.goToAddHome=function(){
      console.log($scope.loginData);
      utilityService.fetchAddressFromCoords($rootScope.position.coords).then(function (addr) {

          $scope.userCountry={
              CountryName:addr.country!=null?addr.country:"",
              CountryCode:addr.country_code!=null?addr.country_code:"",
              CountryPhoneCode:""
          };
          $scope.userState={
              SubdivisionID:"",
              SubdivisionCode:addr.province_code!=null?addr.province_code:"",
              SubdivisionName:addr.state!=null?addr.state:"" ,
              CountryCode:$scope.userCountry.CountryCode,
              CountryName:$scope.userCountry.CountryName
          };
          console.log("User state");
          console.log($scope.userState);

            var addressFromCoordinates= angular.copy(addr.street_number!=null?addr.street_number:"");
              addressFromCoordinates+=angular.copy(addr.street_address!=null?addr.street_address:"");
          //Prepare data for creating user

          $scope.loginData.registration_location.subdivision_code = $scope.userState.SubdivisionCode;

          //$scope.loginData.home.country_code=$scope.data.homeCountry.CountryCode;
          $scope.loginData.registration_location.address=addressFromCoordinates;
          $scope.loginData.registration_location.country_code=$scope.userCountry.CountryCode;
          $scope.loginData.registration_location.latitude= $rootScope.position?$rootScope.position.coords.latitude:'';
          $scope.loginData.registration_location.longitude= $rootScope.position?$rootScope.position.coords.longitude:'';
          //$scope.loginData.registration_location.name='Home';
          console.log($scope.loginData);
          createUser(angular.copy($scope.loginData));
          $scope.home.address=addressFromCoordinates;
          $scope.home.city=angular.copy(addr.sub_state!=null?addr.sub_state:"");
          $scope.changeSubdivision($scope.userCountry.CountryCode);

          $scope.data.state=angular.copy($scope.userState.SubdivisionCode);
          $scope.data.homeCountry=angular.copy($scope.userCountry.CountryCode);

      }).catch(function (error) {
           console.log(error);
      });

  };
});

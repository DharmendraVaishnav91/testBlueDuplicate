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
              var requestData = {
                  country_phone_code: $rootScope.userMobDetail.country_phone_code,
                  username: $rootScope.userMobDetail.mobile
              };
              signUpService.requestOTP(requestData).then(function (response) {
                  console.log("OTP requested successfully");
                  console.log(response);
                  $state.go('addHome',{homeData:$scope.data,homeAddress:$scope.home})
                 // $cordovaToast.showLongBottom("An OTP has been sent to your mobile.");
              }).catch(function (error) {
                  console.log(error);
              }) ;
          $cordovaToast.showLongBottom("Registered successfully with your current location.");


      }).catch(function(error){
          var errorMessage="";
              errorMessage="Something went wrong on server. Please try after some time.";
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

          $rootScope.addressDataFromCoordinate.userCountry={
              CountryName:addr.country!=null?addr.country:"",
              CountryCode:addr.country_code!=null?addr.country_code:"",
              CountryPhoneCode:""
          };
          $rootScope.addressDataFromCoordinate.userState={
              SubdivisionID:"",
              SubdivisionCode:addr.province_code!=null?addr.province_code:"",
              SubdivisionName:addr.state!=null?addr.state:"" ,
              CountryCode:$rootScope.addressDataFromCoordinate.userCountry.CountryCode,
              CountryName:$rootScope.addressDataFromCoordinate.userCountry.CountryName
          };
          console.log("User state");
          console.log($rootScope.addressDataFromCoordinate.userCountry);
          $rootScope.addressDataFromCoordinate.city=angular.copy(addr.sub_state!=null?addr.sub_state:"");
          $rootScope.addressDataFromCoordinate.address= angular.copy(addr.street_number!=null?addr.street_number:"");
          $rootScope.addressDataFromCoordinate.address+=angular.copy(addr.street_address!=null?addr.street_address:"");
          //Prepare data for creating user

          $scope.loginData.registration_location.subdivision_code = $rootScope.addressDataFromCoordinate.userState.SubdivisionCode;

          //$scope.loginData.home.country_code=$scope.data.homeCountry.CountryCode;
          $scope.loginData.registration_location.address=$rootScope.addressDataFromCoordinate.address;
          $scope.loginData.registration_location.country_code=$rootScope.addressDataFromCoordinate.userCountry.CountryCode;
          $scope.loginData.registration_location.latitude= $rootScope.position?$rootScope.position.coords.latitude:'';
          $scope.loginData.registration_location.longitude= $rootScope.position?$rootScope.position.coords.longitude:'';
          //$scope.loginData.registration_location.name='Home';
          console.log($scope.loginData);

          $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);


          createUser(angular.copy($scope.loginData));


      }).catch(function (error) {
           console.log(error);
      });

  };
});

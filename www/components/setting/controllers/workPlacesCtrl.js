/**
 * Created by dharmendra on 24/8/16.
 */
userSetting.controller('WorkPlacesCtrl', function($scope,$state,$ionicModal,userSettingService,utilityService,loginService,$rootScope,signUpService) {

    $scope.isFromSetting=true;
    $scope.isWorkPlace=false;
    $scope.showNoDataAlert=false;
    $ionicModal.fromTemplateUrl('components/login/views/addWorkModal.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.editWork= modal;
    });

    var fetchAllLocations= function () {
        userSettingService.fetchAllLocations().then(function (response) {
            $scope.userLocations=response;
            console.log("User locations");
            console.log(response);
            $scope.isWorkPlace=$scope.userLocations.length!=0;
            $scope.showNoDataAlert=$scope.userLocations.length==0;

        }).catch(function (error) {
            console.log(error);
            $scope.isWorkPlace=false;
        })
    };
    fetchAllLocations();
   // $scope.showEditWork= function(){
   //   $scope.editWork.show();
   // };
    $scope.countryCodeList=[];
    $scope.data={};
    $scope.work={};
    $scope.invitedMember={};



    $scope.countryCodeList=utilityService.countryList();
     $scope.addWork = function () {
         var fetchWorkTypes= function () {
             signUpService.fetchWorkTypes().then(function (response) {
                 console.log("Work types are :");
                 console.log(response);
                 $scope.workTypes=response;
             }).catch(function (error) {
                 console.log(error);
             });
         };
         fetchWorkTypes();
         $scope.editWork.show();
     };

    $scope.hideWorkAddModal= function () {
        $scope.editWork.hide();
    };

    $scope.hideEditAccount =function(){
        $scope.editAccountModal.hide();
    };

    $scope.changeSubdivision=function(countryCode){
        fetchStates(countryCode);
    };

    var fetchStates= function (countryCode) {
      loginService.fetchStates(countryCode).then(function (response) {
           $scope.subDivList=response;
      }).catch(function(error){
          console.log(error);
      })
    };

    var fetchLocation= function () {
      loginService.fetchAllLocation().then(function(response){
         $scope.myLocations=response;
      }).catch(function(error){
         console.log(error);
      });
    };
    fetchLocation();
    $scope.updateLocationFields = function (locationWay) {
        $scope.enableAddressFields = true;
        if (locationWay == "current") {
            $scope.work.address = angular.copy($rootScope.addressDataFromCoordinate.address);
            $scope.work.city = angular.copy($rootScope.addressDataFromCoordinate.city);
            $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

            $scope.work.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
            $scope.work.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
            $scope.work.state = angular.copy($rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
            $scope.work.country = angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
        } else if(locationWay=="manual") {
            $scope.work.address = "";
            $scope.work.city = "";
            //$scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

            $scope.work.latitude = "";
            $scope.work.longitude = "";
            $scope.work.state = "";
            $scope.work.country = "";
        }else{
            $scope.enableAddressFields=false;
        }
    };
    var saveWorkData =function(workData){
        loginService.saveWorkData(workData).then(function(response){

            //$cordovaToast.showShortBottom("Work added successfully.");
            fetchAllLocations();
            $scope.hideWorkAddModal();
            console.log("Work added successfully.");

        }).catch(function(error){
           console.log(error);
            //$cordovaToast.showLongBottom("Something went wrong. Please try again");
        });

    };

    $scope.saveWork= function(){
        console.log($scope.data);
        var works = [];
        var location ={};
        if($scope.work.where=="manual"||$scope.work.where=="current") {
            location={
                name:$scope.work.where=="manual"?"Enter Address":"My Current Location",
                latitude: $scope.work.latitude,
                longitude: $scope.work.longitude,
                address: $scope.work.address,
                city: $scope.work.city,
                subdivision_code: $scope.work.state ? $scope.work.state : '',
                country_code: $scope.work.country
            }
        }else{
            //thing1.location=JSON.parse($scope.data.equipWhere);
            location = {
                name: (JSON.parse($scope.work.where)).LocationID
            }
        }
        var work = {
            type: $scope.work.type,
            relationship: $scope.work.relationship,
            location: location
        };
        works.push(work);
        var workData = {
            works: works
        };
        console.log("work data");
        console.log(workData);
        saveWorkData(workData);
        
       //$scope.openModal(openModalType.addThing);
    };
});

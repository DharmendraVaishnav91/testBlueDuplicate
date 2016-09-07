/**
 * Created by dharmendra on 24/8/16.
 */
userSetting.controller('WorkPlacesCtrl', function($scope,$state,$ionicModal,userSettingService,utilityService,loginService,$rootScope) {

    $scope.isFromSetting=true;

    $ionicModal.fromTemplateUrl('components/login/views/addWork.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.editWork= modal;
    });

    //var fetchAllLocations= function () {
    //    userSetting.fetchAllLocations($rootScope.user.actorID).then(function (response) {
    //        console.log("User locations");
    //        console.log(response);
    //        $scope.userLocations=response;
    //    }).catch(function (error) {
    //        console.log(error);
    //    })
    //};
   // fetchAllLocations();
   // $scope.showEditWork= function(){
   //   $scope.editWork.show();
   // };
   $scope.countryCodeList=[];
   $scope.data={};
   $scope.work={};
   $scope.invitedMember={};
   $scope.isWorkPlace=true;
    $scope.countryCodeList=utilityService.countryList();
     $scope.addWork = function () {
         $scope.editWork.show();
     } ;

    $scope.hideWorkAddModal= function () {
        $scope.editWork.hide();
    } ;
    $scope.hideEditAccount =function(){
        $scope.editAccountModal.hide();
    }
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
    




    $scope.fetchLocationPlace= function () {
      userSettingService.fetchAllLocations().then(function(response){
         $scope.myLocations=response;
         console.log(response);
         $scope.userLocations=response;
         if($scope.userLocations.lenght == 0){
            $scope.isWorkPlace=false;
         }
      }).catch(function(error){
         console.log(error);
      });
    };
    $scope.fetchLocationPlace();
    


    var fetchLocation= function () {
      loginService.fetchAllLocation().then(function(response){
         $scope.myLocations=response;
      }).catch(function(error){
         console.log(error);
      });
    };
    var saveWorkData =function(workData){
        loginService.saveWorkData(workData).then(function(response){
            console.log("Work added successfully.");
            //$cordovaToast.showShortBottom("Work added successfully.");
            fetchLocation();
            $cordovaToast.showLongBottom("Work data saved successfully");


        }).catch(function(error){
           console.log(error);
            $cordovaToast.showLongBottom("Something went wrong. Please try again");
            //Remove this after demo
            //$scope.openModal(openModalType.addThing);
        });

    };
    $scope.saveWork= function(){
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
       // $scope.workLocations.push(location1);
        $scope.fetchLocationPlace();
        saveWorkData(workData);
        $scope.hideWorkAddModal();
        
       //$scope.openModal(openModalType.addThing);
    };
});

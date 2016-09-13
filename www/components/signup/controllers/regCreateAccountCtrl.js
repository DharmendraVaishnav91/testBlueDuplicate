/**
 * Created by dharmendra on 10/8/16.
 */
app.controller('RegCreateAccountCtrl', function($timeout,$q,$scope,$state,$ionicModal,$ionicPopup,utilityService,loginService,$rootScope,$cordovaToast) {

    // Form data for the login modal
    var openModalType={
        createProfile:1,
        selectUserType:2,
        addHome:3,
        addWork:4,
        addThing:5,
        addGroup:6,
        inviteFamily:7 ,
        signUpSuccess:8

    };
    $scope.loginData={
        user:{},
        profile:{},
        user_type:'',
        registration_location:{}
    };
    $scope.home={

    } ;
    var updatedImage='';
    var isLocationEnabled=null;
    var myPopup=null;
    var isPopupOpen=false;
    $rootScope.bgUrl="assets/img/logo_small.png";
    $rootScope.position=null;

    $scope.isLocationOn=false;
    $scope.updateImageSrc = null;
    $scope.isFromSetting=false;
    $scope.locationWay=null;
    $scope.addPicIcon="assets/img/icon_addProfile.png";
    $scope.enableCrop=false;
    $scope.data={};
    $scope.data.selectedCountry =null;
    $scope.countryCodeList=[];
    $scope.work={};
    $scope.workLocations=[];
    $scope.countryCodeList=utilityService.countryList();
    $scope.isLocationShared=false;

    $scope.showPopup = function(position) {
        $scope.data = {};
        isPopupOpen=true;
      // An elaborate, custom popup
      myPopup = $ionicPopup.show({
        title: 'Warning',
        template: '<span style="font-size: 18px;">Location must be enabled to continue, please go to setting to enable this.</span>',
        scope: $scope,
          cssClass:'custom-title',
        buttons: [
          { 
            text: 'Cancel',
            onTap: function(){
                ionic.Platform.exitApp();
            }
          },
          {
            text: '<b>Go to settings</b>',
            type: 'button-positive',
            onTap: function(e) {
                isPopupOpen=false;
                if(typeof cordova.plugins.settings.openSetting != undefined){
                    cordova.plugins.settings.open(function(){
                            console.log("opened settings")  ;

                        },
                        function(){

                        });
                }
            }
          }
        ]
      });
    };
    isLocationEnabled= function () {
        //var deferred=$q.defer();
        if (window.cordova) {
            cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
                if (enabled == false) {
                    $scope.isLocationOn = false;
                    $scope.showPopup();
                    /// deferred.reject();
                } else {
                    $scope.isLocationOn = true;
                    utilityService.getPosition().then(function (position) {
                        $rootScope.position = position;
                        console.log("position in scope");
                        console.log($rootScope.position);
                    });
                    //deferred.resolve();
                }
            }, function (error) {
                alert("Error in getting location: " + error);
            });
        }
        return $scope.isLocationOn;
        //return deferred.promise;
    };
    $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm share',
            template: 'Are you sure you want to share your location?'
        });

        confirmPopup.then(function(res) {
            if(res) {
                $scope.isLocationShared=true;
                if(isLocationEnabled()){
                    utilityService.fetchAddressFromCoords($rootScope.position.coords).then(function (addr) {

                        $scope.userCountry={
                            CountryName:addr.country!=null?addr.country:"",
                            CountryCode:addr.country_code!=null?addr.country_code:"",
                            CountryPhoneCode:addr.country_phone_code!=null?addr.country_phone_code:""
                        };
                        $scope.userState={
                            SubdivisionID:"",
                            SubdivisionCode:addr.province_code!=null?addr.province_code:"",
                            SubdivisionName:addr.state!=null?addr.state:"" ,
                            CountryCode:$scope.userCountry.CountryCode,
                            CountryName:$scope.userCountry.CountryName
                        };

                        $scope.data.selectedCountry=$scope.userCountry.CountryPhoneCode;
                    }).catch(function (error) {
                        console.log(error);
                    });
                }

                console.log('You are sure');
            } else {
                $scope.isLocationShared=false;
                console.log('Location must be shared to continue with registration.');
                $cordovaToast.showLongBottom("Location must be shared to continue with registration.")
            }
        });
    };
    isLocationEnabled();


    utilityService.getPosition().then(function (position) {
        $rootScope.position=position;
        console.log("position in scope");
        console.log($rootScope.position);
    });


    $ionicModal.fromTemplateUrl('components/login/views/regCreateProfile.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.regCreateProfileModal= modal;
    });

    $ionicModal.fromTemplateUrl('components/login/views/selectUserType.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.selectUserType= modal;
    });

    $ionicModal.fromTemplateUrl('components/login/views/addHome.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.addHome= modal;
    });

    $ionicModal.fromTemplateUrl('components/login/views/addWork.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.addWork= modal;
    });

    $ionicModal.fromTemplateUrl('components/login/views/addThing.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.addThing= modal;
    });

    $ionicModal.fromTemplateUrl('components/login/views/addGroup.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.addGroup= modal;
    });
    $ionicModal.fromTemplateUrl('components/login/views/inviteFamily.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.inviteFamily= modal;
    });
    $ionicModal.fromTemplateUrl('components/login/views/accntCreateSuccess.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.signUpSuccess= modal;
    });

    $scope.openModal = function (modalType) {
        switch (modalType) {
            case openModalType.createProfile:
                    $scope.regCreateProfileModal.show();
                break;
            case openModalType.selectUserType:
                $scope.selectUserType.show();
                break;
            case openModalType.addHome:
                $scope.addHome.show();
                break;
            case openModalType.addWork:
                $scope.addWork.show();
                break;
            case openModalType.addThing:
                $scope.addThing.show();
                break;
            case openModalType.addGroup:
                $scope.addGroup.show();
                break;
            case openModalType.inviteFamily:
                $scope.inviteFamily.show();
                break;
            case openModalType.signUpSuccess:
                $scope.signUpSuccess.show();
                break;
            default:
        }
    };
    $scope.closeModal = function (modalType) {
        switch (modalType) {
            case openModalType.createProfile:
                $scope.regCreateProfileModal.hide();
                break;
            case openModalType.selectUserType:
                $scope.selectUserType.hide() ;
                break;
            case openModalType.addHome:
                $scope.addHome.hide();
                break;
            case openModalType.addWork:
                $scope.addWork.hide();
                break;
            case openModalType.addThing:
                $scope.addThing.hide();
                break;
            case openModalType.addGroup:
                $scope.addGroup.hide();
                break;
            case openModalType.inviteFamily:
                $scope.inviteFamily.hide();
                break;
            case openModalType.signUpSuccess:
                $scope.signUpSuccess.hide();
                break;
            default:
        }
    };
    $scope.workTypeChange =function(){
        $scope.enableCrop=$scope.data.type.indexOf('Farm')>-1;
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
    var createUser = function(userData){
        console.log("User data before creation");
        console.log(userData);

        loginService.createUser(userData).then(function(response){
            //$scope.userId=response;
            $rootScope.auth_token=response.auth_token;
            $scope.closeModal(openModalType.selectUserType);
            $scope.openModal(openModalType.addHome);
            console.log("Registered successfully with your current location.");
            $cordovaToast.showLongBottom("Registered successfully with your current location.");

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
    var fetchCropList = function(){
        loginService.fetchProductsList().then(function(response){
            $scope.productList=response;
        }).catch(function(error){
           console.log(error);
        });
    };
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
            //$scope.closeModal(openModalType.addWork);
            $scope.openModal(openModalType.addThing);

        }).catch(function(error){
           console.log(error);
            $cordovaToast.showLongBottom("Something went wrong. Please try again");
            //Remove this after demo
            //$scope.openModal(openModalType.addThing);
        });

    };
    var saveThingsData=function(thingsData){
        loginService.saveThingsData(thingsData).then(function(response){
           // $scope.closeModal(openModalType.addThing);
            $scope.openModal(openModalType.addGroup);
            fetchLocation();
            console.log("Equipment added successfully.");
            $cordovaToast.showShortBottom("Equipment added successfully.");
        }).catch(function(error){
            console.log(error);
            $cordovaToast.showLongBottom("Something went wrong. Please try again");
            //Remove this after demo
            //$scope.openModal(openModalType.addGroup);
        });
    };
    var saveGroupData=function(groupsData){
        loginService.saveGroupsData(groupsData).then(function(response){
            console.log("Group added successfully.");
            $cordovaToast.showShortBottom("Group added successfully.") ;
           // $scope.closeModal(openModalType.addGroup);
            $scope.openModal(openModalType.signUpSuccess);
        }).catch(function(error){
            console.log(error);
            $cordovaToast.showLongBottom("Something went wrong. Please try again");
            //Remove this after demo
           // $scope.openModal(openModalType.signUpSuccess);
        });
    };
    $scope.shareLocation = function () {
        $scope.showConfirm();
    };
    $scope.goToProfileCreation = function() {
        if($scope.isLocationShared){
            // if(isLocationEnabled()){
                 // $scope.openModal(openModalType.addWork);
                 //$scope.loginData.user.country_code=$scope.data.selectedCountry.CountryCode;
                 $scope.loginData.user.country_phone_code=$scope.data.selectedCountry;
                // $scope.loginData.user.mobile_country_code=$scope.data.selectedCountry.CountryPhoneCode;
                 loginService.checkUserNameAvailability($scope.loginData).then(function (response) {
                     console.log("Username available");
                     $scope.openModal(openModalType.createProfile);
                 }).catch(function (error) {
                     console.log(error.error);
                     $cordovaToast.showLongBottom(error.error);
                     console.log("Username already taken. Try another.")
                 });
             //}
        }else{
            $cordovaToast.showLongBottom("Location must be shared to continue with registration");
        }


    };
    $scope.goToSelectUserType = function () {
        console.log($scope.data);
        $scope.loginData.profile.gender=$scope.data.gender;
        $scope.loginData.profile.image=updatedImage;
        console.log($scope.loginData);
        $scope.closeModal(openModalType.createProfile);
        $scope.openModal(openModalType.selectUserType);

    };

    $scope.goToAddHome=function(){
        console.log($scope.loginData);
        utilityService.fetchAddressFromCoords($rootScope.position.coords).then(function (addr) {
             $scope.addr=addr;
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

              $scope.addressFromCoordinates= angular.copy(addr.street_number!=null?addr.street_number:"");
            $scope.addressFromCoordinates+=angular.copy(addr.street_address!=null?addr.street_address:"");
             if( $scope.addressFromCoordinates==""){
                 $scope.addressFromCoordinates+=angular.copy(addr.sub_state);
             }
            //Prepare data for creating user

            $scope.loginData.registration_location.subdivision_code = $scope.userState.SubdivisionCode;

            //$scope.loginData.home.country_code=$scope.data.homeCountry.CountryCode;
            $scope.loginData.registration_location.address=$scope.addressFromCoordinates;
            $scope.loginData.registration_location.country_code=$scope.userCountry.CountryCode;
            $scope.loginData.registration_location.latitude= $rootScope.position?$rootScope.position.coords.latitude:'';
            $scope.loginData.registration_location.longitude= $rootScope.position?$rootScope.position.coords.longitude:'';
            //$scope.loginData.registration_location.name='Home';

           // createUser(angular.copy($scope.loginData));
            //Remove this after testing
            $scope.openModal(openModalType.addHome);
            //$scope.home.address=angular.copy($scope.addressFromCoordinates);
            //$scope.home.city=angular.copy(addr.sub_state!=null?addr.sub_state:"");
            //$scope.changeSubdivision($scope.userCountry.CountryCode);
            //
            //$scope.data.state=angular.copy($scope.userState.SubdivisionCode);
            //$scope.data.homeCountry=angular.copy($scope.userCountry.CountryCode);
        }).catch(function (error) {
             console.log(error);
        });

    };
    $scope.updateLocationFields = function () {
      if($scope.locationWay=="current"){
          $scope.home.address=angular.copy($scope.addressFromCoordinates);
          $scope.home.city=angular.copy($scope.addr.sub_state!=null?$scope.addr.sub_state:"");
          $scope.changeSubdivision($scope.userCountry.CountryCode);

          $scope.home.latitude=angular.copy($rootScope.position?$rootScope.position.coords.latitude:'');
          $scope.home.longitude=angular.copy($rootScope.position?$rootScope.position.coords.longitude:'');
          $scope.data.state=angular.copy($scope.userState.SubdivisionCode);
          $scope.data.homeCountry=angular.copy($scope.userCountry.CountryCode);
      }else{
         $scope.home.address="";
          $scope.home.city="";

          $scope.home.latitude="" ;
          $scope.home.longitude="" ;
          $scope.data.state="";
          $scope.data.homeCountry="";
      }
    };
    $scope.skipToWork= function () {
        $scope.openModal(openModalType.addWork);
        fetchCropList();
    } ;
    $scope.goToWork= function () {
        if ($scope.data.state != undefined && $scope.data.state != null) {
            //$scope.loginData.home.subdivision_code = $scope.data.state.SubdivisionCode;
            $scope.home.subdivision_code = $scope.data.state;
        } else {
            $scope.home.subdivision_code = "";
        }
        //$scope.loginData.home.country_code=$scope.data.homeCountry.CountryCode;
        $scope.home.country_code=$scope.data.homeCountry;
        $scope.home.latitude= $rootScope.position?$rootScope.position.coords.latitude:'';
        $scope.home.longitude= $rootScope.position?$rootScope.position.coords.longitude:'';
        $scope.home.name='Home';
        console.log("Add home data");
        console.log($scope.home);


        loginService.saveUserHome($scope.home).then(function(response){
            //$scope.userId=response;

            $scope.openModal(openModalType.addWork);
            fetchCropList();
            console.log("User created successfully");
            $cordovaToast.showLongBottom("User created successfully");

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
       // createUser();

        //$scope.openModal(openModalType.addWork);
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

       //$scope.openModal(openModalType.addThing);
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
        //$scope.openModal(openModalType.addGroup);
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
        //$scope.openModal(openModalType.inviteFamily);
    };

    $scope.changeImage= function(){
        utilityService.getImage().then(function(src) {
            updatedImage = "data:image/png;base64," +src;
            $scope.updateImageSrc = updatedImage;

        },function(err) {
            console.log(JSON.stringify(err));
        })
    };
    $scope.skipToSuccess = function () {
       // $scope.closeModal(openModalType.addGroup) ;
        $scope.openModal(openModalType.signUpSuccess);
    };

    $scope.skipToThing = function () {
        fetchLocation();
       // $scope.closeModal(openModalType.addWork) ;
        $scope.openModal(openModalType.addThing);
    };
    $scope.skipToGroup = function () {
        fetchLocation();
        //$scope.closeModal(openModalType.addThing) ;
        $scope.openModal(openModalType.addGroup);
    };
    $scope.goToHome =function(){

         $scope.closeModal(openModalType.createProfile) ;
         $scope.closeModal(openModalType.addHome) ;
         $scope.closeModal(openModalType.addWork) ;
         $scope.closeModal(openModalType.addThing) ;
         $scope.closeModal(openModalType.addGroup) ;
         $scope.closeModal(openModalType.inviteFamily) ;
         $scope.closeModal(openModalType.signUpSuccess) ;
         $scope.closeModal(openModalType.selectUserType) ;


        $state.go('home');
    } ;
});

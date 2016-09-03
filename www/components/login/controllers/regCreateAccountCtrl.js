/**
 * Created by dharmendra on 10/8/16.
 */
app.controller('RegCreateAccountCtrl', function($scope,$state,$ionicModal,$ionicPopup,utilityService,loginService,$rootScope,$cordovaToast,$localStorage) {

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
        home:{}
    };
    var updatedImage='';
    $rootScope.bgUrl="assets/img/logo_small.png";


    $scope.updateImageSrc = null;
    $scope.isFromSetting=false;
    $rootScope.position=null;
    $scope.addPicIcon="assets/img/icon_addProfile.png";
    $scope.enableCrop=false;
    $scope.data={};
    $scope.countryCodeList=[];
    $scope.work={};
    $scope.workLocations=[];
    $scope.countryCodeList=utilityService.countryList();
    console.log("country code list");
    console.log($scope.countryCodeList);
    
    $scope.showPopup = function(position) {
      $scope.data = {};

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        title: 'Warning',
        subTitle: 'Location must be enabled to continue, please go to setting to enable this.',
        scope: $scope,
        buttons: [
          { 
            text: 'Cancel',
            onTap: function(){
                $state.go('home');
            }
          },
          {
            text: '<b>Go Settings</b>',
            type: 'button-positive',
            onTap: function(e) {
                if(typeof cordova.plugins.settings.openSetting != undefined){
                    cordova.plugins.settings.open(function(){
                            console.log("opened settings")
                        },
                        function(){
                            console.log("failed to open settings")
                        });
                }
            }
          }
        ]
      });
    };
    var isLocationEnabled= function () {
        if (window.cordova) {
            cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
                if(enabled == false){
                    $scope.showPopup();
                }
            }, function(error) {
                alert("Error in getting location: " + error);
            });
        }
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

    $scope.changeSubdivision=function(selectedCountry){
        fetchStates(selectedCountry.CountryCode);
    };

    var fetchStates= function (countryCode) {
      loginService.fetchStates(countryCode).then(function (response) {
           $scope.subDivList=response;
      }).catch(function(error){
          console.log(error);
      })
    };
    var createUser = function(){
        loginService.createUser($scope.loginData).then(function(response){
            //$scope.userId=response;
            $rootScope.auth_token=response.auth_token;
            $scope.data.workCountry=angular.copy($scope.data.homeCountry);
            $scope.openModal(openModalType.addWork);
        }).catch(function(error){
            console.log(error);
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
            $scope.openModal(openModalType.addThing);
        }).catch(function(error){
           console.log(error);
            //Remove this after demo
            //$scope.openModal(openModalType.addThing);
        });

    };
    var saveThingsData=function(thingsData){
        loginService.saveThingsData(thingsData).then(function(response){
            $scope.openModal(openModalType.addGroup);
            fetchLocation();
            console.log("Equipment added successfully.");
            //$cordovaToast.showShortBottom("Equipment added successfully.");
        }).catch(function(error){
            console.log(error);
            //Remove this after demo
            //$scope.openModal(openModalType.addGroup);
        });
    };
    var saveGroupData=function(groupsData){
        loginService.saveGroupsData(groupsData).then(function(response){

            $scope.openModal(openModalType.signUpSuccess);
            console.log("Group added successfully.");
            //$cordovaToast.showShortBottom("Group added successfully.")
        }).catch(function(error){
            console.log(error);
            //Remove this after demo
           // $scope.openModal(openModalType.signUpSuccess);
        });
    };
    $scope.goToProfileCreation = function() {
        $scope.loginData.user.country_code=$scope.data.selectedCountry.CountryCode;
        console.log($scope.data);
        $scope.openModal(openModalType.createProfile);
    };
    $scope.goToSelectUserType = function () {
        console.log($scope.data);
        $scope.loginData.profile.gender=$scope.data.gender;
        $scope.loginData.profile.image=updatedImage;
        console.log($scope.loginData);
        $scope.openModal(openModalType.selectUserType);
    };

    $scope.goToAddHome=function(){
        $scope.data.homeCountry=angular.copy($scope.data.selectedCountry);
        fetchStates($scope.data.homeCountry.CountryCode);
        console.log($scope.loginData);
        $scope.openModal(openModalType.addHome);
    };

    $scope.goToWork= function () {
        if ($scope.data.state != undefined && $scope.data.state != null) {
            $scope.loginData.home.subdivision_code = $scope.data.state.SubdivisionCode;
        } else {
            $scope.loginData.home.subdivision_code = "";
        }
        $scope.loginData.home.country_code=$scope.data.homeCountry.CountryCode;
        $scope.loginData.home.latitude= $rootScope.position?$rootScope.position.coords.latitude:'';
        $scope.loginData.home.longitude= $rootScope.position?$rootScope.position.coords.longitude:'';
        $scope.loginData.home.name='Home';
        console.log($scope.loginData);

        createUser();
        fetchCropList();
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
            updatedImage = "data:image/jpeg;base64," +src;
            window.resolveLocalFileSystemURL(src, function(fileEntry) {

                //If this doesn't work
                $scope.updateImageSrc = fileEntry.nativeURL;
                console.log($scope.updateImageSrc);

                //Try this
                //var image = document.getElementById('myImage');
                //image.src = fileEntry.nativeURL;
            });

            //console.log(updatedImage);
            //var rad = Math.floor(Math.random() * 10000 + 10);
            //$scope.updateImageSrc = updatedImage + "?rd=" + rad;
            //console.log("Image source");
            //console.log(updatedImage);
        },function(err) {
            console.log(JSON.stringify(err));
        })
    };

    $scope.skipToThing = function () {
        $scope.openModal(openModalType.addThing);
    };
    $scope.skipToGroup = function () {
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

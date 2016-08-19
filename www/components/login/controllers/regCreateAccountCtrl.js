/**
 * Created by dharmendra on 10/8/16.
 */
app.controller('RegCreateAccountCtrl', function($scope,$state,$ionicModal,utilityService,loginService,$rootScope) {

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
    $scope.position=null;
    $scope.addPicIcon="assets/img/icon_addProfile.png";
    $rootScope.bgUrl="assets/img/logo_small.png";
    $scope.enableCrop=false;
    $scope.data={};
    $scope.countryCodeList=[];
    $scope.work={};
    $scope.workLocations=[];
    loginService.fetchCountryCode().then(function(response){
       $scope.countryCodeList=response;
    }).catch(function(error){
        console.log(error);
    });
    var updatedImage='';
    $scope.updateImageSrc = null;

    var onSuccess = function(position) {
        $scope.position=position;
        console.log('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        console.log('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }

    var posOptions = {timeout: 1000, enableHighAccuracy: false};
    navigator.geolocation
        .getCurrentPosition(onSuccess,onError,posOptions);


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
      if($scope.data.type.indexOf('Farm')>-1){
         $scope.enableCrop=true;
      }else{
          $scope.enableCrop=false;
      }
    };

    $scope.changeSubdivision=function(selectedCountry){
     var selectedCountry=selectedCountry.CountryCode;
        fetchStates(selectedCountry);
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
            $scope.userId=response;
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
    var saveWorkData =function(workData){
        loginService.saveWorkData(workData).then(function(response){
            $scope.openModal(openModalType.addThing);
        }).catch(function(error){
           console.log(error);
        });

    };
    var saveThingsData=function(thingsData){
        loginService.saveThingsData(thingsData).then(function(response){
            $scope.openModal(openModalType.addGroup);
        }).catch(function(error){
            console.log(error);
        });
    };
    var saveGroupData=function(groupsData){
        loginService.saveGroupsData(groupsData).then(function(response){
           $scope.openModal(openModalType.signUpSuccess);
        }).catch(function(error){
            console.log(error);
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
        console.log($scope.loginData);
        $scope.openModal(openModalType.selectUserType);
    };

    $scope.goToAddHome=function(){
        $scope.data.homeCountry=$scope.data.selectedCountry;
        fetchStates($scope.loginData.user.country_code) ;
        console.log($scope.loginData);
        $scope.openModal(openModalType.addHome);
    };

    $scope.goToWork= function () {
        //$scope.loginData.home={
        //    subdivision_code:$scope.data.state.SubdivisionCode,
        //    country_code:$scope.loginData.user.country_code,
        //    latitude:$scope.position.coords.latitude,
        //    longitude: $scope.position.coords.longitude,
        //    name:'Home'
        //};
        if ($scope.data.state != undefined && $scope.data.state != null) {
            $scope.loginData.home.subdivision_code = $scope.data.state.SubdivisionCode;
        } else {
            $scope.loginData.home.subdivision_code = "";
        }
        $scope.loginData.home.country_code=$scope.data.homeCountry.CountryCode;
        $scope.loginData.home.latitude= $scope.position?$scope.position.coords.latitude:'';
        $scope.loginData.home.longitude= $scope.position?$scope.position.coords.longitude:'';
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
            latitude:$scope.position?$scope.position.coords.latitude:'',
            longitude:$scope.position?$scope.position.coords.longitude:'',
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
            work.hectare=$scope.work.hectare?$scope.work.hectare:0;
        }else{
            work.crop="";
            work.hectare="";
        }


        works.push(work);
        var workData={
            user_id:$scope.userId.user_id,
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
                latitude:$scope.position?$scope.position.coords.latitude:'',
                longitude:$scope.position?$scope.position.coords.longitude:'',
                address:$scope.data.otherThingAddress,
                city:$scope.work.otherThingCity,
                subdivision_code:$scope.data.otherThingState?$scope.data.otherThingState.SubdivisionCode:'',
                country_code:$scope.data.otherThingCountry.CountryCode

            };

        }else{
           thing1.location=JSON.parse($scope.data.equipWhere);
        }

        things.push(thing1);
        var thingsData={
             user_id:$scope.userId.user_id,
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
            name:$scope.data.groupName,
            location:$scope.data.groupLocation
        };
        groups.push(group1);
        var groupsData={
            user_id:$scope.userId.user_id,
            groups:groups
        };

        saveGroupData(groupsData);
        console.log(groupsData);
        //$scope.openModal(openModalType.inviteFamily);
    };

    $scope.changeImage= function(){
        utilityService.getImage().then(function(src) {
            updatedImage = src;
            console.log(updatedImage);
            var rad = Math.floor(Math.random() * 10000 + 10);
            $scope.updateImageSrc = updatedImage + "?rd=" + rad;
        },function(err) {
            console.log(JSON.stringify(err));
        })
    };
    $scope.goToHome =function(){
        $state.go('home');
    }
});

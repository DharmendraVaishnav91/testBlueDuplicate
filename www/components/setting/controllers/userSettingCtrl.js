/**
 * Created by dharmendra on 23/8/16.
 */
var userSetting = angular.module('app.userSetting',[]);
userSetting.controller('UserSettingCtrl', function($rootScope,$scope,$state,$ionicModal,$localStorage,utilityService,userSettingService,signUpService,$cordovaToast,$filter) {

    $scope.isFromSetting=true;

    var updatedImage='';
    $ionicModal.fromTemplateUrl('components/setting/views/editAccount.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.editAccountModal= modal;

    });
    $ionicModal.fromTemplateUrl('components/setting/views/addHomeModal.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.editHome= modal;

    });
    $scope.home=null;
    $scope.newHome={};
    $rootScope.addressDataFromCoordinate={};
    var fetchCurrentLocation= function () {
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


        }).catch(function (error) {
            console.log(error);
        });
    };
    utilityService.getPosition().then(function (position) {
        $rootScope.position=position;
        console.log("position in scope");
        console.log($rootScope.position);
        fetchCurrentLocation();
    });
    var fetchLocation = function () {
        signUpService.fetchAllLocation().then(function (response) {
          //  $scope.myLocations = response;
            angular.forEach(response, function (location) {
               if(location.LocationName=='Home'){
                   $scope.home=angular.copy(location);
                   console.log("HOme");
                   console.log($scope.home);
               }
            });
            console.log("User locations ");
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    };
    fetchLocation();


    $scope.goToEditAccount= function(){
        userSettingService.fetchUserInfo($rootScope.user.ActorID).then(function(response){
            console.log("User personal details");
            console.log(response);
            $scope.userPersonalInfo=response;
            $scope.person= angular.copy($scope.userPersonalInfo.person);
            $scope.editAccountModal.show();
        });
    };
    $scope.changeImage= function(){
        utilityService.getImage().then(function(src) {
            updatedImage = "data:image/png;base64," +src;
            $scope.updateImageSrc = updatedImage;

        },function(err) {
            console.log(JSON.stringify(err));
        })
    };
    $scope.updateProfile = function () {
        if(updatedImage!=''){
            $scope.person.image=updatedImage;
        }
        userSettingService.updateUserInfo($scope.person).then(function(response){
            console.log("User personal details updated successfully");
            console.log(response);
            $scope.person= angular.copy($scope.userPersonalInfo.person);
            if(response.image!=null&&response.image!=DEFAULT_PROFILE_PATH){
                $rootScope.profileUrl=response.image;
            }
            $scope.editAccountModal.hide();
            $cordovaToast.showShortBottom($filter('translate')('USER_PERSONAL_DETAIL_UPDATED_SUCCESSFULLY'));
        });
    };
    var fetchStates = function (countryCode) {
        signUpService.fetchStates(countryCode).then(function (response) {
            $scope.subDivList = response;
        }).catch(function (error) {
            console.log(error);
        })
    };
    $scope.countryCodeList = utilityService.countryList();
    $scope.changeSubdivision = function (countryCode) {
        fetchStates(countryCode);
    };

    $scope.hideEditAccount =function(){
        $scope.editAccountModal.hide();
    };
    $scope.editUserHome= function (home) {
        if(home!=null){
            $scope.newHome.address=angular.copy($scope.home.StreetAddressOne);
            $scope.newHome.city=angular.copy($scope.home.Settlement);
            $scope.newHome.country=angular.copy($scope.home.CountryCode);
            $scope.changeSubdivision($scope.newHome.country);
            $scope.newHome.state=angular.copy($scope.home.subdivision_code);
            $scope.newHome.stateId=angular.copy($scope.home.SubdivisionID);

            $scope.newHome.latitude=angular.copy($scope.home.Latitude);
            $scope.newHome.longitude=angular.copy($scope.home.Longitude);
        }else{
            $scope.newHome={};
        }

        $scope.editHome.show();
    };
    $scope.saveHome = function () {
       var data={};
        if ($scope.newHome.state != undefined && $scope.newHome.state != null) {
            //$scope.loginData.home.subdivision_code = $scope.data.state.SubdivisionCode;
            data.subdivision_code = $scope.newHome.state;
        } else {
            data.subdivision_code = "";
        }
        //$scope.loginData.home.country_code=$scope.data.homeCountry.CountryCode;
        data.address = $scope.newHome.address;
        data.city=$scope.newHome.city;

        data.country_code = $scope.newHome.country;
        data.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
        data.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
        data.name = 'Home';
        console.log("Add home data");
        console.log($scope.home);

        signUpService.saveUserHome(data).then(function (response) {
            console.log("User created successfully");
            fetchLocation();
            $scope.hideEditHomeModal();
            $cordovaToast.showLongBottom($filter('translate')('HOME_ADDED_SUCCESSFULLY'));

        }).catch(function (error) {

            var errorMessage = $filter('translate')('SOMETHING_WENT_WRONG');
                $cordovaToast.showLongBottom(errorMessage);
                console.log(error);
        });
    };
    $scope.hideEditHomeModal= function () {
        $scope.editHome.hide();
    } ;
    $scope.goToWorkPlaces=function(){
        $state.go('app.workPlaces');
    };

    $scope.goToThings=function(){
        $state.go('app.workEquipments');
    };
    $scope.goToManageFamily=function(){
        $state.go('app.manageFamily');
    };
    $scope.goToManageGroup=function(){
        $state.go('app.manageGroups');
    };
    var removeUser= function () {
        $localStorage[STORAGE.LOGIN_KEY]=null;
    };
    // Open the login modal
    $scope.logout = function(){
        loginService.doLogout().then(function(response) {
            removeUser();
            $state.go('login');
            $cordovaToast.showShortBottom($filter('translate')('LOGGED_OUT_SUCCESSFULLY'));
        }).catch(function(error){
            console.log(error);
        });
    };
});

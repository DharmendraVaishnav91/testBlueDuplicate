/**
 * Created by dharmendra on 10/8/16.
 */
app.controller('RegCreateAccountCtrl', function($timeout,$q,$scope,$state,$ionicPopup,utilityService,signUpService,$rootScope,$cordovaToast) {

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

    $scope.isFromSetting=false;
    $rootScope.position=null;
    $scope.addPicIcon="assets/img/icon_addProfile.png";
    $scope.enableCrop=false;
    $scope.data={};
    $scope.data.selectedCountry =null;
    $scope.countryCodeList=[];
    $scope.work={};
    $scope.workLocations=[];
    $scope.countryCodeList=utilityService.countryList();
    $scope.isLocationShared=false;
    $rootScope.addressDataFromCoordinate={};
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


                        $rootScope.addressDataFromCoordinate.userCountry={
                            CountryName:addr.country!=null?addr.country:"",
                            CountryCode:addr.country_code!=null?addr.country_code:"",
                            CountryPhoneCode:addr.country_phone_code!=null?addr.country_phone_code:""
                        };
                        $rootScope.addressDataFromCoordinate.userState={
                            SubdivisionID:"",
                            SubdivisionCode:addr.province_code!=null?addr.province_code:"",
                            SubdivisionName:addr.state!=null?addr.state:"" ,
                            CountryCode:$rootScope.addressDataFromCoordinate.userCountry.CountryCode,
                            CountryName:$rootScope.addressDataFromCoordinate.userCountry.CountryName
                        };

                        $scope.data.selectedCountry=$rootScope.addressDataFromCoordinate.userCountry.CountryPhoneCode;
                    }).catch(function (error) {
                        console.log(error);
                    });
                }

                console.log('You are sure');
            } else {
                $scope.isLocationShared=false;
                console.log('Location must be shared to continue with registration.');
                //$cordovaToast.showLongBottom("Location must be shared to continue with registration.")
            }
        });
    };
    isLocationEnabled();


    utilityService.getPosition().then(function (position) {
        $rootScope.position=position;
        console.log("position in scope");
        console.log($rootScope.position);
    });

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


    $scope.shareLocation = function () {
        $scope.showConfirm();
    };

    $scope.goToProfileCreation = function() {
        if($scope.isLocationShared){
            // if(isLocationEnabled()){
                 // $scope.openModal(openModalType.addWork);
                 $scope.loginData.user.country_code=$scope.data.selectedCountry.CountryCode;
                 $scope.loginData.user.country_phone_code=$scope.data.selectedCountry;
                 //$scope.loginData.user.mobile_country_code=$scope.data.selectedCountry.CountryPhoneCode;
                 signUpService.checkUserNameAvailability($scope.loginData).then(function (response) {
                     console.log("Username available");
                    // $cordovaToast.showLongBottom("Username available");
                     $state.go('regCreateProfile',{accountData: $scope.loginData})

                 }).catch(function (error) {
                     console.log(error.error);
                    // $cordovaToast.showLongBottom(error.error);
                     console.log("Username already taken. Try another.")
                 });
             //}
        }else{
            //$cordovaToast.showLongBottom("Location must be shared to continue with registration");
        }


    };
});

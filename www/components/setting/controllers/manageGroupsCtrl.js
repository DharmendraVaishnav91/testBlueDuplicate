/**
 * Created by dharmendra on 26/8/16.
 */
userSetting.controller('ManageGroupsCtrl', function($scope,$state,$ionicModal,userSettingService,loginService) {

    $scope.isFromSetting=true;
    $scope.data={};
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

    loginService.fetchCountryCode().then(function(response){
        $scope.countryCodeList=response;
    }).catch(function(error){
        console.log(error);
    });
    $ionicModal.fromTemplateUrl('components/login/views/addGroup.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.editGroup= modal;
    });
    $ionicModal.fromTemplateUrl('components/setting/views/groupDetail.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.groupDetail= modal;
    });

    $scope.fetchGroups= function () {
      userSettingService.fetchAllGroups().then(function (response) {
          console.log("User all groups");
          console.log(response);
          $scope.groups=response;
      }).catch(function (error) {
          console.log(error);
      })
    };
    $scope.fetchGroups();

    var fetchGroupInfo= function (businessRelId) {
       userSettingService.fetchGroupInfo(businessRelId).then(function (response) {
          console.log("Group details");
           console.log(response);
           $scope.curSelGroupFullDetail=response;
       }).catch(function (error) {
            console.log(error);
       })
    };
    $scope.showGroupInfo= function (group) {
        var businessRelId=group.business_relationships[0].BusinessRelationshipID;
        fetchGroupInfo(businessRelId);
        $scope.curSelGroup=group;
        $scope.groupDetail.show();
    };
    $scope.hideGroupDetails = function () {
        $scope.groupDetail.hide();
    };
    $scope.hideGroupAddModal = function () {
        $scope.editGroup.hide();
    };
    $scope.addNewGroup = function () {
        $scope.editGroup.show();
    };
    var saveGroupData=function(groupsData){
        loginService.saveGroupsData(groupsData).then(function(response){
            $scope.fetchGroups();
            $scope.hideGroupAddModal();
            console.log("Group added successfully.");
            //$cordovaToast.showShortBottom("Group added successfully.")
        }).catch(function(error){
            console.log(error);
            //Remove this after demo
            // $scope.openModal(openModalType.signUpSuccess);
        });
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
    $scope.createAndUpdateGroup=function(){
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
                latitude:$scope.position?$scope.position.coords.latitude:'',
                longitude:$scope.position?$scope.position.coords.longitude:'',
                address:$scope.data.otherGroupAddress,
                city:$scope.data.otherGroupCity,
                subdivision_code:$scope.data.otherGroupState?$scope.data.otherGroupState.SubdivisionCode:'',
                country_code:$scope.data.otherGroupCountry.CountryCode

            };

        }else{
            group1.location=JSON.parse($scope.data.groupLocation);
        }
        groups.push(group1);
        var groupsData={
            groups:groups
        };

        saveGroupData(groupsData);
        console.log(groupsData);
        //$scope.openModal(openModalType.inviteFamily);
    };
});

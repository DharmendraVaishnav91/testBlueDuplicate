/**
 * Created by dharmendra on 26/8/16.
 */
userSetting.controller('ManageGroupsCtrl', function($rootScope,$scope,$state,$ionicModal,userSettingService,loginService,utilityService,$cordovaToast) {

    $scope.isFromSetting=true;
    $scope.data={};
     $scope.invite={};
    $scope.countryCodeList=utilityService.countryList();

    var fetchLocation= function () {
        loginService.fetchAllLocation().then(function(response){
            $scope.myLocations=response;
        }).catch(function(error){
            console.log(error);
        });
    };
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
    $ionicModal.fromTemplateUrl('components/setting/views/inviteInGroup.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function (modal) {
        $scope.inviteInGroupModal= modal;
    });

    var fetchGroups= function () {
      userSettingService.fetchAllGroups().then(function (response) {
          console.log("User all groups");
          console.log(response);
          $scope.groups=response;
      }).catch(function (error) {
          console.log(error);
      })
    };
    fetchGroups();

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
        console.log("Current selected group");
        console.log($scope.curSelGroup);

        $scope.groupDetail.show();

    };
    $scope.hideGroupDetails = function () {
        $scope.groupDetail.hide();
    };
    $scope.hideGroupAddModal = function () {
        $scope.editGroup.hide();
    };
    $scope.addNewGroup = function () {
        fetchLocation();
        $scope.editGroup.show();
    };
    var saveGroupData=function(groupsData){
        loginService.saveGroupsData(groupsData).then(function(response){
            fetchGroups();
            $scope.hideGroupAddModal();
            console.log("Group added successfully.");
            $cordovaToast.showShortBottom("Group added successfully.")
        }).catch(function(error){
            console.log(error);
            //Remove this after demo
            $cordovaToast.showShortBottom("Something Went wrong while creating group.");
            // $scope.openModal(openModalType.signUpSuccess);
        });
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
                latitude:$rootScope.position?$rootScope.position.coords.latitude:'',
                longitude:$rootScope.position?$rootScope.position.coords.longitude:'',
                address:$scope.data.otherGroupAddress,
                city:$scope.data.otherGroupCity,
                subdivision_code:$scope.data.otherGroupState?$scope.data.otherGroupState.SubdivisionCode:'',
                country_code:$scope.data.otherGroupCountry.CountryCode

            };

        }else{
            group1.location={
                name:(JSON.parse($scope.data.groupLocation)).LocationID
            } ;
           //group1.location=JSON.parse($scope.data.groupLocation);
        }
        groups.push(group1);
        var groupsData={
            groups:groups
        };

        saveGroupData(groupsData);
        console.log(groupsData);
        //$scope.openModal(openModalType.inviteFamily);
    };
    $scope.sendGroupInvitations= function () {
        $scope.inviteInGroupModal.show();
    };
    $scope.hideInviteModal = function () {
        $scope.inviteInGroupModal.hide();
    } ;
    $scope.sendInviteInGroup = function () {
        var invitations=[];
        invitations.push($scope.invite);
        var inviteData={
            groupID:$scope.curSelGroup.ActorID,
            invitations:invitations
        };
       userSettingService.sendInviteInGroup(inviteData).then(function (response) {
          console.log("Response of invite in group ");
          console.log(response);
           $scope.showGroupInfo($scope.curSelGroup);
           $cordovaToast.showLongBottom("Invitation sent successfully.");
           $scope.hideInviteModal();
       }).catch(function (error) {
            console.log(error);
       });
    }
});

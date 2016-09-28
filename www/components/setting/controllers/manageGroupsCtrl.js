/**
 * Created by dharmendra on 26/8/16.
 */
userSetting.controller('ManageGroupsCtrl', function($rootScope,$scope,$state,$ionicModal,userSettingService,loginService,utilityService,$cordovaToast,signUpService) {

    $scope.group={};
    $scope.invite={};
    $scope.groupAdminFind = false;
    $scope.groupMemberFind =false;
    $scope.isInvitationsAvailable=false;
    $scope.countryCodeList=utilityService.countryList();
    $scope.backToAccount= function () {
        $state.go('app.setting');
    };
    var fetchLocation= function () {
        loginService.fetchAllLocation().then(function(response){
            $scope.myLocations=response;
        }).catch(function(error){
            console.log(error);
        });
    };
    $ionicModal.fromTemplateUrl('components/login/views/addGroupModal.html', {
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
          $scope.groupAdminFind=$scope.groups.admin.length!=0 ;
          //if($scope.groups.admin.length==0){
          //  $scope.groupAdminFind = false;
          //}
          $scope.groupMemberFind =$scope.groups.member.length != 0 ;

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
           if($scope.curSelGroupFullDetail.invitations.length!=0){
                $scope.isInvitationsAvailable=true;
           }else{
               $scope.isInvitationsAvailable=false;
           }
       }).catch(function (error) {
            console.log(error);
       });
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
    //Change address fields according user choice
    $scope.updateLocationFields = function (locationWay) {
        $scope.enableAddressFields = true;
        if (locationWay == "current") {
            $scope.group.address = angular.copy($rootScope.addressDataFromCoordinate.address);
            $scope.group.city = angular.copy($rootScope.addressDataFromCoordinate.city);
            $scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

            $scope.group.latitude = angular.copy($rootScope.position ? $rootScope.position.coords.latitude : '');
            $scope.group.longitude = angular.copy($rootScope.position ? $rootScope.position.coords.longitude : '');
            $scope.group.state = angular.copy($rootScope.addressDataFromCoordinate.userState.SubdivisionCode);
            $scope.group.country = angular.copy($rootScope.addressDataFromCoordinate.userCountry.CountryCode);
        } else if(locationWay == "manual") {
            $scope.group.address ="";
            $scope.group.city = "";
            //$scope.changeSubdivision($rootScope.addressDataFromCoordinate.userCountry.CountryCode);

            $scope.group.latitude = "";
            $scope.group.longitude = "";
            $scope.group.state = "";
            $scope.group.country = "";
        } else{
            $scope.enableAddressFields=false;
        }
    };
    var saveGroupData=function(groupsData){
        loginService.saveGroupsData(groupsData).then(function(response){
            fetchGroups();
            $scope.hideGroupAddModal();
            $scope.group={};
            console.log("Group added successfully.");
            $cordovaToast.showShortBottom("Group added successfully.")
        }).catch(function(error){
            console.log(error);
            //Remove this after demo
           $cordovaToast.showShortBottom("Something Went wrong while creating group.");
            // $scope.openModal(openModalType.signUpSuccess);
        });
    };
    var fetchGroupsType = function () {
        signUpService.fetchGroupsType().then(function (response) {
            $scope.groupsType=response;
        }).catch(function (error) {

        });
    };

    fetchGroupsType();
    $scope.changeSubdivision=function(selectedCountry){
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
            type:$scope.group.type,
            relationship:$scope.group.relationship,
            name:$scope.group.name
            //location:$scope.data.groupLocation
        };
        //Equipment have location other than existing one
        if($scope.group.location=='manual'||$scope.group.location=='current') {
            group1.location={
                name:$scope.group.location=="manual"?"Enter Address":"My Current Location",
                latitude:$scope.group.latitude,
                longitude:$scope.group.longitude,
                address:$scope.group.address,
                city:$scope.group.city,
                subdivision_code:$scope.group.state?$scope.group.state:'',
                country_code:$scope.group.country
            };
        }else{
            group1.location={
                name:(JSON.parse($scope.group.location)).LocationID
            } ;
        }
        groups.push(group1);
        var groupsData={
            groups:groups
        };

        saveGroupData(groupsData);
        console.log(groupsData);
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

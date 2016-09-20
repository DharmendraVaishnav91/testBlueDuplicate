/**
 * Created by dharmendra on 1/9/16.
 */
userSetting.controller('BulkInviteCtrl', function($ionicLoading,loginService,$rootScope,$scope,$state,$ionicModal,utilityService,$cordovaToast,$cordovaContacts) {
    $scope.friend ={};
    $scope.selectedNumber=[];
    $scope.phoneContacts = [];
    $scope.countryCodeList=utilityService.countryList();
    $scope.contactFind = true;
    var userPhone=$rootScope.user.bluenumber.split("-")[1];
    var indexOfPhone=$rootScope.user.username.indexOf(userPhone);
    console.log(userPhone);
    var userCountryCode=$rootScope.user.username.substring(0,indexOfPhone);

    $scope.getAllContacts = function() {
        $ionicLoading.show({
            template: 'Loading contacts...'
        }).then(function(){
            console.log("The loading indicator is now displayed");
        });
        function onSuccess(contacts) {
            for (var i = 0; i < contacts.length; i++) {
                var contact = {
                    name: contacts[i].displayName,
                    phoneNumbers: contacts[i].phoneNumbers
                } ;
                if(contact.phoneNumbers != null){
                    for(var k=0;k<contact.phoneNumbers.length;k++){
                        contact.phoneNumbers[k].value=contact.phoneNumbers[k].value.replace("+", "");
                        contact.phoneNumbers[k].value=contact.phoneNumbers[k].value.replace(/[\s]/g, '');
                        contact.phoneNumbers[k].value=contact.phoneNumbers[k].value.replace("-", '');
                    }
                    $scope.phoneContacts.push(contact);
                }
            }
            $ionicLoading.hide();
            if($scope.phoneContacts.length == 0){
                $scope.contactFind = false;
            }
        }
        function onError(contactError) {
            $ionicLoading.hide();
            alert(contactError);
        }
        var options = {};
        options.multiple = true;
        options.hasPhoneNumber = true;

        $cordovaContacts.find(options).then(onSuccess, onError);
    };
   $scope.getAllContacts();
    $scope.updateSelection = function($event, phoneNumber) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        phoneNumber=""+phoneNumber;
        phoneNumber=addCountryCode(phoneNumber);
        phoneNumber=parseInt(phoneNumber);
        if (action == 'add' && $scope.selectedNumber.indexOf(phoneNumber) == -1) {
            $scope.selectedNumber.push(phoneNumber);
        }
        if (action == 'remove' && $scope.selectedNumber.indexOf(phoneNumber) != -1) {
            $scope.selectedNumber.splice($scope.selectedNumber.indexOf(phoneNumber), 1);
        }
        console.log($scope.selectedNumber);
    };

     var addCountryCode= function (phoneNumber) {
            if(phoneNumber.length==10){
                phoneNumber=userCountryCode+phoneNumber
            }
         return phoneNumber
     };
    $scope.sentInvites = function () {
        console.log("Friend details");

        var inviteFriendData={
            friends:$scope.selectedNumber
        } ;
        console.log(inviteFriendData);
        utilityService.sendBulkInviteToFriend(inviteFriendData).then(function () {
            console.log("Friend invited successfully.");
            //$cordovaToast.showLongBottom("Friends Invited Successfully.");
            $state.go('app.invite');
        }).catch(function (error) {
            console.log(error);
           // $cordovaToast.showLongBottom("Something went wrong while inviting your friend.");
        })
    };
    $scope.isSelected = function(id) {
        return $scope.selectedNumber.indexOf(id) >= 0;
    };
});

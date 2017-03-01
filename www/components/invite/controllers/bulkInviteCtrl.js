/**
 * Created by dharmendra on 1/9/16.
 */
userSetting.controller('BulkInviteCtrl', function($ionicLoading,loginService,$rootScope,$scope,$state,$ionicModal,utilityService,$cordovaToast,$cordovaContacts,$filter) {
    $scope.friend ={};
    $scope.selectedProducts=[];
    $scope.phoneContacts = [];
    $scope.countryCodeList=utilityService.countryList();
    $scope.contactFind = true;
    var userPhone=$rootScope.user.bluenumber.split("-")[1];
    var indexOfPhone=$rootScope.user.username.indexOf(userPhone);
    console.log(userPhone);
    var userCountryCode=$rootScope.user.username.substring(0,indexOfPhone);

    $scope.backToInvite= function () {
        $state.go('app.invite');
    };
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
                        contact.phoneNumbers[k].value=contact.phoneNumbers[k].value.replace("(", '');
                        contact.phoneNumbers[k].value=contact.phoneNumbers[k].value.replace(")", '');
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
        if (action == 'add' && $scope.selectedProducts.indexOf(phoneNumber) == -1) {
            $scope.selectedProducts.push(phoneNumber);
        }
        if (action == 'remove' && $scope.selectedProducts.indexOf(phoneNumber) != -1) {
            $scope.selectedProducts.splice($scope.selectedProducts.indexOf(phoneNumber), 1);
        }
        console.log($scope.selectedProducts);
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
            friends:$scope.selectedProducts
        } ;
        console.log(inviteFriendData);
        utilityService.sendBulkInviteToFriend(inviteFriendData).then(function () {
            console.log($filter('translate')('FRIEND_INVITED_SUCCESSFULLY'));
            $cordovaToast.showLongBottom($filter('translate')('BULK_INVITE_SUCCESSFULLY'));
            $state.go('app.invite');
        }).catch(function (error) {
            console.log(error);
           $cordovaToast.showLongBottom($filter('translate')('BULK_INVITED_FAILED'));
        })
    };
    $scope.isSelected = function(id) {
        return $scope.selectedProducts.indexOf(id) >= 0;
    };
});

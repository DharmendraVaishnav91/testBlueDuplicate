menu.controller('SettingCtrl', function($scope, $state, loginService, $localStorage, $rootScope, menuService, $translate, $window, $cordovaToast) {
  $scope.changeLanguage = function(selectedLang) {
    console.log("inside SettingCtrl");
    menuService.selectLanguage(selectedLang).then(function(response) {
      console.log($rootScope.language);
      $translate.use(selectedLang);
      $rootScope.language = selectedLang;
      $cordovaToast.showLongBottom("Language preference updated successfully");
    }).catch(function(error) {

    })
  };
   $scope.arr = { prop: ["Saab", "Volvo", "BMW", "Audi", "Mercedes", "Suzuki" , "Range Rover", "Jaguar", "TATA", "WolksVegon", "Lamborghini", "Mazda"] };
});
menu.directive('directiveParameterList' , function($ionicPopup){
      var directive = {};
      directive.restrict = 'EAC';
      directive.templateUrl = 'components/menu/views/sample.html';
      // directive.replace   = true;
      directive.scope = {
        items: "=arr",
        model: "=model",
        onValueSelect: "=onChange",
        evalExpOnValueSelect : "=evalExpOnChange",
        displayProperty:"=displayProperty",
        idAsVal:"=idAsVal",
        onClear:"&onClear"
      };
      directive.link = function (scope, elem, attrs) {
          scope.title = attrs.heading;
          scope.idAsVal = attrs.idasval;
          if (scope.idAsVal) {
              scope.sort = 'id';
          } else if (attrs.sortBy){
              scope.sort = attrs.sortBy;
          } else {
              scope.sort = 'name';
          }
          elem.bind('click', function (event) {

              scope.popup = $ionicPopup.show({
                  title: attrs.heading,
                  template: '<ion-radio ng-repeat="item in items | orderBy:sort" ng-value="item" ng-model="model" ' +
                              'ng-change="onChangeModel(item)" style="width:100%">{{ item[displayProperty] || item.name || item}}</ion-radio>' +
                              '<h5 style="text-align: center" ng-if="items.length==0">Nothing found</h5>',
                  buttons: [{
                      type:'button-clear button-assertive',
                      text: 'Cancel'
                  },{
                      text:'Clear',
                      type:' button-clear button-dark',
                      onTap:function(e){
                          console.log("Clear Model");
                          scope.model = null;
                          scope.onClear();

                      }
                  }],
                  scope: scope
              });
          });

          scope.onChangeModel = function (item) {
              if (scope.idAsVal) {
                  scope.model = item;
              } else {
                  scope.model = item;
              }
              if (scope.onValueSelect) {
              scope.onValueSelect(item);
              }
              // console.log(scope.model);
              scope.popup.close();

          }
      };
      return directive;
});

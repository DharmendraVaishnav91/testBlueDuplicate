var picklist=angular.module('picklist',[]);
picklist.directive('directiveParameterList' , function($ionicPopup){
      var directive = {};
      directive.restrict = 'EAC';
      directive.templateUrl = 'components/menu/views/listDirective.html';
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
          scope.onClear= function () {
             console.log("On clear get called")
             scope.model = null;
          };
          scope.onPicklistClick= function (event) {
            console.log("I am clicked by button");
              scope.popup = $ionicPopup.show({
                  // title: attrs.heading,
                  // template: '<ion-searchbar' +
                  //           '[(ngModel)]="items"' +
                  //           '[showCancelButton]="shouldShowCancel"' +
                  //           '(ionInput)="onInput($event)"' +
                  //           '(ionCancel)="onCancel($event)">' +
                  //           '</ion-searchbar><ion-radio ng-repeat="item in items | orderBy:sort" ng-value="item" ng-model="model" ' +
                  //           'ng-change="onChangeModel(item)" style="width:100%">{{ item[displayProperty] || item.name || item}}</ion-radio>' +
                  //           '<h5 style="text-align: center" ng-if="items.length==0">Nothing found</h5>',
                  templateUrl: 'components/menu/views/popup.html',
                  buttons: [{
                      type:'button-clear button-assertive',
                      text: 'Cancel'
                  }
                      // ,{
                      //     text:'Clear',
                      //     type:' button-clear button-dark',
                      //     onTap:function(e){
                      //         console.log("Clear Model");
                      //         scope.model = null;
                      //         scope.onClear();
                      //
                      //     }
                      // }
                  ],
                  scope: scope
              });
          };
          //elem.bind('click', function (event) {
          //
          //    scope.popup = $ionicPopup.show({
          //        // title: attrs.heading,
          //        // template: '<ion-searchbar' +
          //        //           '[(ngModel)]="items"' +
          //        //           '[showCancelButton]="shouldShowCancel"' +
          //        //           '(ionInput)="onInput($event)"' +
          //        //           '(ionCancel)="onCancel($event)">' +
          //        //           '</ion-searchbar><ion-radio ng-repeat="item in items | orderBy:sort" ng-value="item" ng-model="model" ' +
          //        //           'ng-change="onChangeModel(item)" style="width:100%">{{ item[displayProperty] || item.name || item}}</ion-radio>' +
          //        //           '<h5 style="text-align: center" ng-if="items.length==0">Nothing found</h5>',
          //        templateUrl: 'components/menu/views/popup.html',
          //        buttons: [{
          //            type:'button-clear button-assertive',
          //            text: 'Cancel'
          //        }
          //        // ,{
          //        //     text:'Clear',
          //        //     type:' button-clear button-dark',
          //        //     onTap:function(e){
          //        //         console.log("Clear Model");
          //        //         scope.model = null;
          //        //         scope.onClear();
          //        //
          //        //     }
          //        // }
          //      ],
          //        scope: scope
          //    });
          //});

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

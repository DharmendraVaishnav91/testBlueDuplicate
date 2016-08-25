var app=angular.module('app', ['ionic','ngSanitize', 'app.menu','app.utility.services','pascalprecht.translate','login.service','app.common.events','ngCordova','app.userSetting']) ;

app.run(function($ionicPlatform,EventService,$http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.status bar required
      StatusBar.styleDefault();
    }
      EventService.register();
  });
})

.config(function($stateProvider, $urlRouterProvider,$translateProvider,$httpProvider) {

        //angular.forEach(languages,function(curLang){
        //    var req={
        //        url:'assets/locale/'+curLang+".json",
        //        method:HttpRequestType.GET
        //    };
        //    $http(req).then(function(response){
        //        console.log("response config data");
        //        console.log(response);
        //        //$translateProvider.translations(curLang,response);
        //        //$translateProvider.preferredLanguage(selectedLanguage);
        //    }).catch(function(error) {
        //    });
        //});
        $translateProvider.useStaticFilesLoader({
            prefix: 'assets/locale/locale-',
            suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.preferredLanguage('en');
    $stateProvider
      .state('app', {
        url: '/app',
       abstract: true,
       templateUrl: 'components/menu/menu.html',
       controller: 'MenuCtrl'
      })
      .state('home', {
          url: '/home',
          templateUrl: 'components/login/views/home.html',
          controller:'HomeCtrl'
      })
      .state('login', {
          url: '/login',
          templateUrl: 'components/login/views/login.html',
          controller:'LoginCtrl'
      })
      .state('regCreateAccount', {
          url: '/regCreateAccount',
          templateUrl: 'components/login/views/regCreateAccount.html',
          controller:'RegCreateAccountCtrl'
      })
      .state('regCreateProfile', {
          url: '/regCreateProfile',
          templateUrl: 'components/login/views/regCreateProfile.html',
          controller:'RegCreateProfileCtrl'
      })
     .state('app.dashboard', {
        url: '/dashboard',
        views: {
            'mainContent': {
                templateUrl: 'components/dashboard/dashboard.html',
                controller: 'DashboardCtrl'
            }
        }
    }).state('app.setting', {
          url: '/setting',
          views: {
              'mainContent': {
                  templateUrl: 'components/setting/views/userSettings.html',
                  controller: 'UserSettingCtrl'
              }
          }
      }).state('app.workPlaces', {
          url: '/setting/workPlaces',
          views: {
              'mainContent': {
                  templateUrl: 'components/setting/views/workPlaces.html',
                  controller: 'WorkPlacesCtrl'
              }
          }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('home');
    $httpProvider.interceptors.push(function ($rootScope, $q) {
        return {
            request: function (config) {
                $rootScope.$broadcast('loading:show');
                return config;
            },
            response: function (response) {
                $rootScope.$broadcast('loading:hide');
                return response;
            },
            requestError: function (request) {
                $rootScope.$broadcast('loading:hide');
                return request;
            },
            responseError: function (response) {
                $rootScope.$broadcast('loading:hide');
                return $q.reject(response);
            }
        };
    });
});

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in menuController.js
var app=angular.module('app', ['ionic', 'app.menu','pascalprecht.translate']) ;

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$translateProvider) {
        $translateProvider.translations('en', {
            TITLE: 'Hello'
        });
        $translateProvider.translations('de', {
            TITLE: 'Hallo'
        });
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
            'menuContent': {
                templateUrl: 'components/dashboard/dashboard.html',
                controller: 'DashboardCtrl'
            }
        }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('home');
});

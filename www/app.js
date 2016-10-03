var app = angular.module('app', ['ionic', 'ngSanitize', 'app.menu', 'app.utility.services', 'pascalprecht.translate', 'login.service', 'app.common.events', 'ngCordova', 'app.userSetting', 'base64', 'ngStorage', 'ui-leaflet']);

app.run(function ($ionicPlatform, EventService, utilityService) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        //var permissions = window.plugins.permissions;
        ////do we already have permissions
        //permissions.hasPermission(function(status){
        //    if(!status.hasPermission) {
        //        //if not, warn in console
        //        var errorCallback = function() {
        //            console.warn('Camera permission is not turned on');
        //        };
        //        //make request for permissions
        //        permissions.requestPermission(function(status) {
        //            //do we still not have permissions? user denied. Do something here
        //            if( !status.hasPermission ) userdenied();
        //        }, function(){}, permissions.CAMERA);
        //    }
        //}, function(){}, permissions.CAMERA);

        if (window.StatusBar) {
            // org.apache.cordova.status bar required
            StatusBar.styleDefault();
        }
        EventService.register();
        utilityService.countryList();

    });
})

    .config(function ($stateProvider, $urlRouterProvider, $translateProvider, $httpProvider) {
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
                templateUrl: 'components/menu/views/menu.html',
                controller: 'MenuCtrl'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'components/login/views/home.html',
                controller: 'HomeCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'components/login/views/login.html',
                controller: 'LoginCtrl'
            })
            .state('regCreateAccount', {
                url: '/regCreateAccount',
                templateUrl: 'components/signup/views/regCreateAccount.html',
                controller: 'RegCreateAccountCtrl'
            })
            .state('regCreateProfile', {
                url: '/regCreateProfile',
                params: {accountData: {}},
                templateUrl: 'components/signup/views/regCreateProfile.html',
                controller: 'RegCreateProfileCtrl'
            })
            .state('selectUserType', {
                url: '/selectUserType',
                params: {profileData: {}},
                templateUrl: 'components/signup/views/selectUserType.html',
                controller: 'selectUserTypeCtrl'
            })
            .state('addHome', {
                url: '/addHome',
                params: {homeData: {}, homeAddress: {}},
                templateUrl: 'components/signup/views/addHome.html',
                controller: 'addHomeCtrl'
            })
            .state('addWork', {
                url: '/addWork',
                params: {workData: {}},
                templateUrl: 'components/signup/views/addWork.html',
                controller: 'addWorkCtrl'
            })
            .state('addThing', {
                url: '/addThing',
                params: {thingData: {}},
                templateUrl: 'components/signup/views/addThing.html',
                controller: 'addThingCtrl'
            })
            .state('addGroup', {
                url: '/addGroup',
                params: {groupData: {}},
                templateUrl: 'components/signup/views/addGroup.html',
                controller: 'addGroupCtrl'
            })
            .state('inviteFamily', {
                url: '/inviteFamily',
                params: {inviteFamilyData: {}},
                templateUrl: 'components/signup/views/inviteFamily.html',
                controller: 'InviteFamilyCtrl'
            })
            .state('accntCreateSuccess', {
                url: '/accntCreateSuccess',
                templateUrl: 'components/signup/views/accntCreateSuccess.html',
                controller: 'accntCreateSuccessCtrl'
            })
            .state('verifyAccount', {
                url: '/verify-account',
                templateUrl: 'components/signup/views/confirmOTP.html',
                controller: 'ConfirmOTPCtrl'
            })
            .state('app.dashboard', {
                url: '/dashboard',
                cache: false,
                views: {
                    'mainContent': {
                        templateUrl: 'components/dashboard/views/dashboard.html',
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
            }).state('app.manageSetting', {
                url: '/manageSetting',
                views: {
                    'mainContent': {
                        templateUrl: 'components/menu/views/settings.html',
                        controller: 'SettingCtrl'
                    }
                }
              }).state('app.chooseLanguage', {
                  url: '/chooseLanguage',
                  views: {
                      'mainContent': {
                          templateUrl: 'components/menu/views/language.html',
                          controller: 'LanguageCtrl'
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
            }).state('app.workEquipments', {
                url: '/setting/workEquipments',
                views: {
                    'mainContent': {
                        templateUrl: 'components/setting/views/workEquipments.html',
                        controller: 'WorkEquipmentsCtrl'
                    }
                }
            }).state('app.manageFamily', {
                url: '/setting/manageFamily',
                views: {
                    'mainContent': {
                        templateUrl: 'components/setting/views/manageFamily.html',
                        controller: 'ManageFamilyCtrl'
                    }
                }
            }).state('app.invite', {
                url: '/invite/invite',
                views: {
                    'mainContent': {
                        templateUrl: 'components/invite/views/invite.html',
                        controller: 'InviteCtrl'
                    }
                }
            })
            .state('app.invitations', {
                url: '/invitations',
                views: {
                    'mainContent': {
                        templateUrl: 'components/invite/views/groupInvitations.html',
                        controller: 'GroupInvitationsCtrl'
                    }
                }
            })
            .state('app.bulkInvite', {
                url: '/bulkInvite',
                views: {
                    'mainContent': {
                        templateUrl: 'components/invite/views/bulkInvite.html',
                        controller: 'BulkInviteCtrl'
                    }
                }
            })
            .state('app.inviteFriend', {
                url: '/invite/inviteFriend',
                views: {
                    'mainContent': {
                        templateUrl: 'components/invite/views/inviteFriend.html',
                        controller: 'InviteFriendCtrl'
                    }
                }
            }).state('app.aboutInfo', {
                url: '/menu/aboutInfo',
                views: {
                    'mainContent': {
                        templateUrl: 'components/menu/views/aboutInfo.html',
                        controller: 'AboutInfoCtrl'
                    }
                }
            }).state('app.manageGroups', {
                url: '/setting/manageGroups',
                views: {
                    'mainContent': {
                        templateUrl: 'components/setting/views/manageGroups.html',
                        controller: 'ManageGroupsCtrl'
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

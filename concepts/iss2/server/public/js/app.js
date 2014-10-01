angular.module('spellsApp',
  [
    'spellsApp.services',
    'spellsApp.controllers',
    'spellsApp.directives',
    'spellsApp.filters',
    'ui.router',
    'ngRoute',
    'ui.bootstrap'
  ]
)

.config(function ($httpProvider) {
  $httpProvider.defaults.xsrfCookieName = 'csrfToken';
  var interceptor = function ($location, $q) {
    var success = function (response) {
      return response;
    };
    var error = function (response) {
      if (response.status === 401 || response.status === 403) {
        $location.path('/');
      }
      return $q.reject(response);
    };
    return function (promise) {
      return promise.then(success, error);
    };
  };
  $httpProvider.responseInterceptors.push(interceptor);
})

.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
  
  $stateProvider
    .state('spells', {
      url: '',
      abstract: true,
      views: {
        '@': {
          templateUrl: 'partials/spells'
        },
        'nav@spells': {
          templateUrl: 'partials/nav'
        }
      }
    })
    .state('spells.dashboard', {
      url: '/dashboard',
      views: {
        content: {
          templateUrl: 'partials/dashboard',
          controller: 'DashboardController'
        }
      }
    })
    .state('spells.home', {
      url: '/home',
      views: {
        content: {
          templateUrl: 'partials/home',
          controller: 'HomeController'
        }
      }
    })
    
  $urlRouterProvider.otherwise('/home');
})

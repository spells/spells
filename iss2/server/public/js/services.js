var apiBase = '/api/1/';

angular.module('spellsApp.services', ['ngCookies'])

.factory('AccessControl', function ($cookieStore, $rootScope) {
  $rootScope.$watch(
    function () {
      return $cookieStore.get('userRole');
    },
    function (userRole) {
      $rootScope.userRole = Number(userRole);
    }
  );
  $rootScope.userRole = $cookieStore.get('userRole');
  var authorize = function (accessLevel) {
    var userRole = $rootScope.userRole;
    if (!accessLevel && !userRole) {
      return true;
    }
    return userRole & accessControl.accessLevels[accessLevel];
  };
  return {
    authorize: authorize
  };
})

.factory('SpellsService', function ($http) {
  return {
    toggle: function () {
      return $http.get(apiBase + 'toggle');
    },
    getStatus: function () {
      return $http.get(apiBase + 'status'); 
    }
  };
});
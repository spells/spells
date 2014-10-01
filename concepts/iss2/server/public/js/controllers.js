angular.module('spellsApp.controllers', [])

.controller('HomeController', function ($scope, $state, AccessControl) {
  if (AccessControl.authorize('everyone')) {
    $state.go('spells.dashboard');
  }
})

.controller('DashboardController', function ($scope, $state, SpellsService, AccessControl) {
  if (!AccessControl.authorize('spells')) {
    $state.go('spells.home');
  }
  $scope.toggle = SpellsService.toggle;
  var refresh = function () {
    SpellsService.getStatus().success(function (data) {
      var mode = data.mode;
      var recent = data.recent;
      var length = data.length;

      $scope.mode = mode;
      $scope.recent = recent;
      $scope.length = length;

      setTimeout(refresh, 15);     
    });
  };
  refresh();
})

'use strict';

var WelcomeCtrl = function($scope, $timeout) {
  $scope.splash = true;
  $timeout(function() {
    $scope.splash = false;
  }, 10000);
  $scope.testVar = 'Custom structure is running from require module!';
};

module.exports = WelcomeCtrl;

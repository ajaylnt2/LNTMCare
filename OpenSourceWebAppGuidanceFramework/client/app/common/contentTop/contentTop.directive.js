
(function () {
  'use strict';
  angular.module('contentTop')
      .directive('contentTop', contentTop);

  function contentTop($location, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/contentTop/contentTop.html',
      link: function($scope) {
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });
      }
    };
  }
})();

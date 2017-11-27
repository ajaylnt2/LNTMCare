
class PlantsController {
  constructor($timeout, $location, $scope, sharedService,headerService) {
      'ngInject';

        this.name = 'plants';
        $scope.$watch(function () {
          return headerService.getHeaderName(); },
          function (newValue, oldValue) {
            if(newValue)
            {
               $scope.headerText = newValue;
            }
            });
    }
}

export default PlantsController;
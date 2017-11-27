
import controller from './angularLineChart.controller';

import './angularLineChart.web.scss';

import template from './angularLineChart.web.html';

const angularLineChartComponent = {
  restrict: 'E',
  bindings: {
    labels: '<',
    series: '<',
    data: '<',
    colors: '<',
    options: '<',
    datasetOverride: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default angularLineChartComponent;

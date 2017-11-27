
import controller from './columnChart.controller';

import './columnChart.web.scss';

import template from './columnChart.web.html';

const columnChartComponent = {
  restrict: 'E',
  bindings: {
    labels: '<',
    series: '<',
    data: '<',
    colors: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default columnChartComponent;

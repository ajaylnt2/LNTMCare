
import controller from './columnLineChart.controller';

import './columnLineChart.web.scss';

import template from './columnLineChart.web.html';

const columnLineChartComponent = {
  restrict: 'E',
  bindings: {
    labels: '<',
    override: '<',
    data: '<',
    colors: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default columnLineChartComponent;


import controller from './pieChart.controller';

import './pieChart.web.scss';

import template from './pieChart.web.html';

const pieChartComponent = {
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

export default pieChartComponent;

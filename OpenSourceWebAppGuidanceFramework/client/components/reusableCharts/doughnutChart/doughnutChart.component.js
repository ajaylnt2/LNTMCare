
import controller from './doughnutChart.controller';

import './doughnutChart.web.scss';

import template from './doughnutChart.web.html';

const doughnutChartComponent = {
  restrict: 'E',
  bindings: {
    labels: '<',
    data: '<',
    colors: '<',
    onClick: '&',
    options:'<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default doughnutChartComponent;

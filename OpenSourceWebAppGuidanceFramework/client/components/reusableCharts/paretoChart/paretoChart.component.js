
import controller from './paretoChart.controller';

import './paretoChart.web.scss';

import template from './paretoChart.web.html';

const paretoChartComponent = {
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

export default paretoChartComponent;

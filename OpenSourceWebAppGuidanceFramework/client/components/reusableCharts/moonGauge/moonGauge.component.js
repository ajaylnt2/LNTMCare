

import controller from './moonGauge.controller';

let template;
template = require('./moonGauge.web.html');
require('./moonGauge.web.scss');


const moonGaugeComponent = {
  restrict: 'E',
  bindings: {
    decimals: '<',
    value: '<',
    angle: '<',
    text: '<',
    unit: '<',
    min: '<',
    max: '<',
    warningMin: '<',
    criticalMin: '<',
  },
  template,
  controller,
  controllerAs: 'vm',
};

export default moonGaugeComponent;

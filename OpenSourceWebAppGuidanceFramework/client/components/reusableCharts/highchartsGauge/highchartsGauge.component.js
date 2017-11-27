
import controller from './highchartsGauge.controller';

import './highchartsGauge.scss';

import template from './highchartsGauge.web.html';

const highchartsGaugeComponent = {
  restrict: 'E',
  scope: {
            data: '@data'
        },
  bindings: {
    labels: '<',
    // data: '<',
    colors: '<',
    options:'<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default highchartsGaugeComponent;

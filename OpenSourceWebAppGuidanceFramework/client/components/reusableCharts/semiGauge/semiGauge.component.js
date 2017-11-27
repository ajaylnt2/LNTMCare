
import controller from './semiGauge.controller';

import './semiGauge.scss';

import template from './semiGauge.web.html';

const semiGaugeComponent = {
  restrict: 'E',
  bindings: {
    size: '<',
    type: '<',
    thick: '<',
    min: '<',
    max:'<',
    value:'<',
    cap:'<',
    label:'<',
    append:'<',
    prepend:'<',
    duration:'<',
    foreground:'<',
    background:'<',
    threshold:'<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default semiGaugeComponent;

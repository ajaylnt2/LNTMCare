
import controller from './thresholdSlider.controller';

let template = '';

  template = require('./thresholdSlider.web.html');
  require('./thresholdSlider.web.scss');


const thresholdSliderComponent = {
  restrict: 'E',
  bindings: {
    min: '<',
    max: '<',
  },
  template,
  controller,
  controllerAs: 'vm',
};

export default thresholdSliderComponent;

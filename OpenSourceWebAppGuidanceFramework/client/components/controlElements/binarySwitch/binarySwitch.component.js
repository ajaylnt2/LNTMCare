
import controller from './binarySwitch.controller';
import './binarySwitch.web.scss';

let template;

  template = require('./binarySwitch.web.html');

const binarySwitchComponent = {
  restrict: 'E',
  bindings: {
    value: '=',
  },
  template,
  controller,
  controllerAs: 'vm',
};

export default binarySwitchComponent;

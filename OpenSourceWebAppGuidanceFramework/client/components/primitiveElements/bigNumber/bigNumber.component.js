
import controller from './bigNumber.controller';

let template;

  template = require('./bigNumber.web.html');
  require('./bigNumber.web.scss');


const bigNumberComponent = {
  restrict: 'E',
  bindings: {
    value: '<',
    text:'<',
    unit: '<',
    title: '<',
    decimals: '<',
  },
  template,
  controller,
  controllerAs: 'vm',
};

export default bigNumberComponent;

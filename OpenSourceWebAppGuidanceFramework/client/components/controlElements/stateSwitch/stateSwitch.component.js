
import controller from './stateSwitch.controller';
import './stateSwitch.web.scss';
let template = '';


  template = require('./stateSwitch.web.html');


const stateSwitchComponent = {
  restrict: 'E',
  bindings: {
    buttons: '<',
    value: '=',
    onChange: '&',
  },
  template,
  controller,
  controllerAs: 'vm',
};

export default stateSwitchComponent;

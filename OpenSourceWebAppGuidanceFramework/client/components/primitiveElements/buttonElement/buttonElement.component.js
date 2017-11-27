
import controller from './buttonElement.controller';
import './buttonElement.web.scss';
let template = '';

  template = require('./buttonElement.web.html');

const buttonElementComponent = {
  restrict: 'E',
  bindings: {
    disabled: '<',
    text: '<',
    type: '<',
    logo: '<',
    display:'<',
    onClick: '&',
  },
  template,
  controller,
  controllerAs: 'vm',
};

export default buttonElementComponent;

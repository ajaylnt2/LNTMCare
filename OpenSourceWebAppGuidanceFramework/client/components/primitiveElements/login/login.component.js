import controller from './login.controller';

let template;

  template = require('./login.web.html');
  require('./login.web.scss');


const loginComponent = {
  restrict: 'E',
  bindings: {
    alt: '<',
    logo: '<',
    tagline: '<',
  },
  template,
  controller,
  controllerAs: 'vm',
};

export default loginComponent;

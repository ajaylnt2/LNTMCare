import controller from './googleLogin.controller';

let template;

  template = require('./googleLogin.web.html');
  require('./googleLogin.web.scss');


const googleLoginComponent = {
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

export default googleLoginComponent;


import controller from './largeIcon.controller';


let template = '';


  template = require('./largeIcon.web.html');
  require('./largeIcon.web.scss');


const largeIconComponent = {
  restrict: 'E',
  bindings: {
    icon: '<',
    state: '<',
    coloron: '<',
    coloroff: '<',
    size: '<',
  },
  template,
  controller,
  controllerAs: 'vm',
};

export default largeIconComponent;

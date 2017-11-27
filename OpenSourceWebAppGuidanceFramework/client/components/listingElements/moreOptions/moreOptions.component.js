
import controller from './moreOptions.controller';
import webTemplate from './moreOptions.web.html';
require('./moreOptions.web.scss');

const moreOptionsComponent = {
  restrict: 'E',
  bindings: { options: '<' },
  template() {
    if (window.ionic) {
      return mobileTemplate;
    }
    return webTemplate;
  },
  controller,
  controllerAs: 'vm',
};

export default moreOptionsComponent;

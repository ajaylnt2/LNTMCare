
import webTemplate from './listItem.web.html';

import controller from './listItem.controller';

import './listItem.web.scss';

const listItemComponent = {
  restrict: 'E',
  bindings: {
    item: '<',
    width: '@',
  },
  template() {
    if (window.ionic) {
      return mobileTemplate;
    }
    return webTemplate;
  },
  controller,
  controllerAs: 'vm',
};

export default listItemComponent;

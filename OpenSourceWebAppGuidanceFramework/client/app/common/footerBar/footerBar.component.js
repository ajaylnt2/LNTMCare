
import template from './footerBar.html';
import controller from './footerBar.controller';
import './footerBar.scss';

let footerBarComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default footerBarComponent;

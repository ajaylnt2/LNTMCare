import controller from './normalbootstrapTable.controller';
import './normalbootstrapTable.scss';
let template = require('./normalbootstrapTable.web.html');
const normalbootstrapTableComponent = {
  restrict: 'E',
  bindings: {
    title: '<',
    rows: '<',
    rowColorFn: '&',
  },
  template,
  controller,
  controllerAs: 'vm',
};

export default normalbootstrapTableComponent;

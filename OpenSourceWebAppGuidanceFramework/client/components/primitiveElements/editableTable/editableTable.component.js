import controller from './editableTable.controller';
// import './normalbootstrapTable.scss';
let template = require('./editableTable.web.html');
const EditableTableComponent = {
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

export default EditableTableComponent;

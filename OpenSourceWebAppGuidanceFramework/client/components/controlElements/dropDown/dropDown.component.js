import controller from './dropDown.controller';
let template = '';
  template = require('./dropDown.web.html');
  require('./dropDown.web.scss');
const dropDownComponent = {
  restrict: 'E',
  bindings: {
    placeHolder: '<',
    options: '<',
    model: '=',
    label:'=',
    onChange: '&',
  },
  template,
  controller,
  controllerAs: 'vm',
};
export default dropDownComponent;

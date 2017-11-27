import controller from './customePaging.controller';
import './customePaging.scss';
let template = require('./customePaging.web.html');
const CustomePagingComponent = {
  restrict: 'E',
  bindings: {
    total: '=',
    pagesize: '=',
    page: '=',
    data: '=',
    columns: '=',    
  },
  template,
  controller,
  controllerAs: 'vm',
};

export default CustomePagingComponent;

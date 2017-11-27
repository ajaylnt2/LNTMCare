import controller from './paging.controller';
import './paging.scss';
let template = require('./paging.web.html');
const PagingComponent = {
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

export default PagingComponent;

import controller from './chartPaging.controller';
import './chartPaging.scss';
let template = require('./chartPaging.web.html');
const ChartPagingComponent = {
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

export default ChartPagingComponent;

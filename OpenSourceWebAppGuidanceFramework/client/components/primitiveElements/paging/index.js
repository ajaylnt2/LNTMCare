import PagingComponent from './paging.component';
import paging from 'angular-paging';
const PagingModule = angular.module('pagingModule', ['bw.paging'])
  .component('pagination', PagingComponent);

export default PagingModule;

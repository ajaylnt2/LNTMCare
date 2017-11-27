import ChartPagingComponent from './chartPaging.component';
import paging from 'angular-paging';
const ChartPagingModule = angular.module('chartPagingModule', ['bw.paging'])
  .component('chartPaging', ChartPagingComponent);

export default ChartPagingModule;

import CustomePagingComponent from './customePaging.component';
import paging from 'angular-paging';
const CustomePagingModule = angular.module('customePagingModule', ['bw.paging'])
  .component('customPaging', CustomePagingComponent);

export default CustomePagingModule;


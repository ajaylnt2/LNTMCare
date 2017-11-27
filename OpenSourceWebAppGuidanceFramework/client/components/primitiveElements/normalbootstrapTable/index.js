import normalbootstrapTableComponent from './normalbootstrapTable.component';

const normalbootstrapTableModule = angular.module('tableData1', [])
  .component('expoTable', normalbootstrapTableComponent);

export default normalbootstrapTableModule;

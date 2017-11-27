import editableTableComponent from './editableTable.component';

const editableTableModule = angular.module('editableTable', [])
  .component('editableTable', editableTableComponent);

export default editableTableModule;

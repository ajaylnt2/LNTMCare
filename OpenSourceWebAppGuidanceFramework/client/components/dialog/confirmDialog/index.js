import confirmDialogComponent from './confirmDialog.component';

const confirmDialogModule = angular.module('confirmDialog', [])
    .component('confirmDialog', confirmDialogComponent);

export default confirmDialogModule;
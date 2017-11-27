import alertDialogComponent from './alertDialog.component';

const alertDialogModule = angular.module('alertDialog', [])
    .component('alertDialog', alertDialogComponent);

export default alertDialogModule;
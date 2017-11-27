import promptDialogComponent from './promptDialog.component';

const promptDialogModule = angular.module('promptDialog', [])
    .component('promptDialog', promptDialogComponent);

export default promptDialogModule;
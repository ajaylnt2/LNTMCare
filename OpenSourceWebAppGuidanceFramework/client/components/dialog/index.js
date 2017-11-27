
import alertDialog from './alertDialog';
import confirmDialog from './confirmDialog';
import promptDialog from './promptDialog';

module.exports = angular
    .module('dialog', [
      alertDialog.name,
      confirmDialog.name,
      promptDialog.name,
    ])

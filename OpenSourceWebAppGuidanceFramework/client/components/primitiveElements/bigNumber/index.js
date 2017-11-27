
import bigNumberComponent from './bigNumber.component';

const bigNumberModule = angular.module('bigNumber', [])
  .component('bigNumber', bigNumberComponent);

export default bigNumberModule;

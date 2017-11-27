import loginComponent from './login.component';

const loginModule = angular.module('loginElement', [])
  .component('loginElement', loginComponent);

export default loginModule;

import angular from 'angular';
import Login from './login/login';
import Main from './main/main';

let pageModule = angular.module('app.pages', [
  Main,
  Login,
])
.name;

export default pageModule;

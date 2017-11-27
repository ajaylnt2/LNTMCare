
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import sidebarComponent from './sidebar.component';

let sidebarModule = angular.module('sidebar', [
    uiRouter
])
.config(($locationProvider) => {
    "ngInject";

    $locationProvider.html5Mode(true).hashPrefix('!');
  })

.component('sidebar', sidebarComponent)

.name;

export default sidebarModule;

import angular from 'angular';

import loginComponent from './login.component';

let loginModule = angular.module('login', [

])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";
  var footer = {
       template: '<h1>Im Footer</h1>',
       controller: function($scope) {}

  }
  $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('login', {
          url: '/login',
          template: '<login layout-fill></login>',
          params: {
            previous: 'overview',
            previousParams: {},
          },
        });
})

.component('login', loginComponent)

.name;

export default loginModule;

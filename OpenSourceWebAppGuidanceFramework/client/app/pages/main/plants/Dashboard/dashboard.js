
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import dashboardComponent from './dashboard.component';

const dashboardModule = angular.module('dashboard', [
    uiRouter

])
.config(($stateProvider) => {
    'ngInject';

    $stateProvider
        .state('dashboard', {
          parent:'plants',
            url: '/dashboard',
            component: 'dashboard'
        })
})
.component('dashboard',dashboardComponent)

.name;

export default dashboardModule;

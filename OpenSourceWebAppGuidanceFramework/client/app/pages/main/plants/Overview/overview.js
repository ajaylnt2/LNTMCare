import  overviewComponent from './overview.component';
const overviewModule = angular.module('overview', [
])
.config(($stateProvider) => {
    'ngInject';
    $stateProvider
        .state('overview', {
          parent:'plants',
            url: '/overview',
            component: 'overview'
        })
})
.component('overview', overviewComponent)
.name;

export default overviewModule;
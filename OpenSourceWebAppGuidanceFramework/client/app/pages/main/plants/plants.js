import plantsComponent from './plants.component';
import overview from './Overview/overview';
import dashboard from './Dashboard/dashboard';
const plantsModule = angular.module('plants', [
  overview,
  dashboard,
])
.config(($stateProvider) => {
    'ngInject';
    $stateProvider
        .state('plants', {
            parent:'main',
            url: 'plants',
            component: 'plants'
        })
})
.component('plants',plantsComponent)
.name;

export default plantsModule;
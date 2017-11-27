import mainComponent from './main.component';
import Plants from './plants/plants';

const mainModule = angular.module('main', [
Plants
])
.config(($stateProvider) => {
    'ngInject';

    $stateProvider
        .state('main', {
            url: '/',
            component: 'main'
        })
})
.component('main',mainComponent)
.name;

export default mainModule;

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import footerBarComponent from './footerBar.component';

let footerBarModule = angular.module('footerBar',[])

.component('footerBar', footerBarComponent)

export default footerBarModule;

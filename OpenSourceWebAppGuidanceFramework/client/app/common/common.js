import angular from 'angular';
import Navbar from './navbar/navbar';
import contentTop from './contentTop/contentTop';
import sidebar from './sidebar/sidebar';
import footerBar from './footerBar/footerBar';

let commonModule = angular.module('app.common', [
  Navbar,
  contentTop,
  sidebar,
  footerBar.name,
])

.name;

export default commonModule;

import angular from 'angular';
import route from 'angular-route';
import ChartJs from 'angular-chart.js';
import store from 'angular-storage';
import ngDialog from 'ng-dialog';
import nvd3 from 'angular-nvd3';
import xeditable from 'angular-xeditable'
import uiRouter from 'angular-ui-router';
import Common from './common/common'; //common cards
import components from '../components/components'; //widgets
import pages from './pages/pages'; //web pages
import AppComponent from './app.component';
import authManager from 'angular-jwt';
import ngGauge from 'angularjs-gauge';
import datetimepicker from 'angularjs-bootstrap-datetimepicker';

import 'normalize.css';
// require('../js/bootstrap.min');
// require('../js/jquery.min');
// api imports
import Api from './api';

angular.module('app', [
   'angularjs-gauge',
    'nvd3',
    ngDialog,
    'chart.js',
    store,
    uiRouter,
    route,
    datetimepicker,
    authManager,
    Common,
    pages,
    components.name,
    Api.name,
    'xeditable',
    'ngRadialGauge'
  ])
  .config(($locationProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .run(($rootScope,$state, $document, auth, store, jwtHelper, $location, $timeout,editableOptions,$transitions) => {
    'ngInject';
  let started = false;

// idle check
  var d = new Date();
    var n = d.getTime();  //n in ms

      $rootScope.idleEndTime = n+(20*60*1000); //set end time to 20 min from now
      $document.find('body').on('mousemove keydown DOMMouseScroll mousewheel mousedown touchstart', checkAndResetIdle); //monitor events

      function checkAndResetIdle() //user did something
      {
        var d = new Date();
        var n = d.getTime();  //n in ms

          if (n>$rootScope.idleEndTime)
          {
              $document.find('body').off('mousemove keydown DOMMouseScroll mousewheel mousedown touchstart'); //un-monitor events
              store.remove('profile');
              store.remove('token');
              auth.isAuthenticated = false;
                    $state.go("login");
          }
          else
          {
              $rootScope.idleEndTime = n+(20*60*1000); //reset end time
          }
      }

  editableOptions.theme = 'bs3';
  $transitions.onSuccess({}, function($transitions){
    var toState = $transitions.$to();

         if (toState.name !== 'login') {
           const token = store.get('profile');
           //
          //  console.log(token);
           if(token==null)
           {
              $state.go("login");
           }
           if (token) {
            //  if (!jwtHelper.isTokenExpired(token)) {
             //
            //  } else {
            //    // jwt is expired, remove token and profile and redirect to login
            //    auth.logout().then(() => {
            //      $state.go('login', { previous: toState.name, previousParams: toParams });
            //    });
            //  }
           }
         }
         if  (toState.name  ==  'main') {
          $state.go("overview");
        }
  });

  })
  .component('app', AppComponent)

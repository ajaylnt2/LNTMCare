import bigNumber from './bigNumber';
import largeIcon from './largeIcon';
import button from './buttonElement';
import login from './login';
import googleLogin from './googleLogin';
import paging from './paging';
import customePaging from './customePaging';
import chartPaging from './chartPaging';
module.exports = angular
  .module('dataVizComponents', [
    bigNumber.name,
    largeIcon.name,
    button.name,
    login.name,
    paging.name,
    googleLogin.name,
    customePaging.name,
    chartPaging.name
  ])

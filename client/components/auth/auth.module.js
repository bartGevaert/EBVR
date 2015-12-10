'use strict';

angular.module('ebvrApp.auth', [
  'ebvrApp.constants',
  'ebvrApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

'use strict';

angular.module('ebvrApp')

  .config(function ($stateProvider) {
    $stateProvider
      .state('details', {
        url: '/details/:detailId',
        templateUrl: 'app/details/details.html',
        controller: 'DetailsCtrl',
        controllerAs: 'details',//belangerijk of scope laadt niet
    
    });
  });

//Notice that we define our URL with brackets around 'id'. This means that 'id' is actually a route parameter that will be made available to our controller.
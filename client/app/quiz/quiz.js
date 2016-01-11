'use strict';

angular.module('ebvrApp')

  .config(function ($stateProvider) {
    $stateProvider
      .state('quiz', {
        url: '/quiz/:quizId',
        templateUrl: 'app/quiz/quiz.html',
        controller: 'QuizCtrl',
        controllerAs: 'quiz',//belangerijk of scope laadt niet
    
    });
  });
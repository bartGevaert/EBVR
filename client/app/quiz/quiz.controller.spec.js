'use strict';

//describe('Controller: QuizCtrl', function () {
//
//  // load the controller's module
//  beforeEach(module('ebvrApp'));
//
//  var QuizCtrl, scope;
//
//  // Initialize the controller and a mock scope
//  beforeEach(inject(function ($controller, $rootScope) {
//    scope = $rootScope.$new();
//    QuizCtrl = $controller('QuizCtrl', {
//      $scope: scope
//    });
//  }));
//
//  it('should ...', function () {
//    expect(1).toEqual(1);
//  });
//});

describe('Controller: QuizCtrl', function() {

  // load the controller's module
  beforeEach(module('ebvrApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope;
  var QuizCtrl;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    QuizCtrl = $controller('QuizCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the controller', function() {
    $httpBackend.flush();
    expect(QuizCtrl.awesomeThings.length).toBe(5);
  });
});

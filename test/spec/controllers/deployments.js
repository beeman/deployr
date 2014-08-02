'use strict';

describe('Controller: DeploymentsCtrl', function () {

  // load the controller's module
  beforeEach(module('loopbackApp'));

  var DeploymentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeploymentsCtrl = $controller('DeploymentsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

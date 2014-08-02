'use strict';

describe('Controller: TargetsCtrl', function () {

  // load the controller's module
  beforeEach(module('loopbackApp'));

  var TargetsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TargetsCtrl = $controller('TargetsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

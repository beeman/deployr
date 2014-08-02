'use strict';

describe('Controller: RepositoriesCtrl', function () {

  // load the controller's module
  beforeEach(module('loopbackApp'));

  var RepositoriesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RepositoriesCtrl = $controller('RepositoriesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TargetsCtrl
 * @description
 * # TargetsCtrl
 * Controller of the clientApp
 */
angular.module('loopbackApp')

  .config(function($stateProvider) {
    $stateProvider.state('app.targets', {
      abstract: true,
      url: '/targets',
      templateUrl: 'views/targets/main.html',
      controller: 'TargetsCtrl'
    })
    .state('app.targets.list', {
      url: '',
      templateUrl: 'views/targets/list.html',
      controller: 'TargetsCtrl'
    })
    .state('app.targets.add', {
      url: '/add',
      templateUrl: 'views/targets/form.html',
      controller: 'TargetsCtrl'
    })
    .state('app.targets.edit', {
      url: '/:id/edit',
      templateUrl: 'views/targets/form.html',
      controller: 'TargetsCtrl'
    })
    .state('app.targets.view', {
      url: '/:id',
      templateUrl: 'views/targets/view.html',
      controller: 'TargetsCtrl'
    });
  })

  .controller('TargetsCtrl', function($scope, $state, $stateParams, $notification, Target) {

  var targetId = $stateParams.id;

  if (targetId) {
    $scope.target = Target.findById({
      id: targetId
    }, function() {}, function(err) {
      console.log(err);
    });
  } else {
    $scope.target = {};
  }

  function loadItems() {
    $scope.targets = Target.find();
  }

  loadItems();

  $scope.delete = function(id) {
    // if (confirm('Are you sure?') === false) {
    //   $notification.success('Delete canceled!', 'Yay!!');
    //   return false;
    // }
    Target.deleteById(id, function() {
      $notification.success('Target deleted', 'Your target is deleted!');
      loadItems();
      $state.go('app.targets.list');
      console.log();
    }, function(err) {
      $notification.success('Error deleting target', 'Your target is target deleted! ' + err);
    });

  };

  $scope.formFields = [{
    key: 'name',
    type: 'text',
    label: 'Name',
    required: true
  }, {
    key: 'type',
    type: 'text',
    label: 'Type',
    required: true
  }, {
    key: 'path',
    type: 'text',
    label: 'Path',
    required: true
  }];

  $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: 'Save'
  };

  $scope.onSubmit = function() {
    Target.upsert($scope.target, function() {
      $notification.success('Target saved', 'Your target is safe with us!');
      $state.go('^.list');
    }, function(err) {
      console.log(err);
    });
  };

  });

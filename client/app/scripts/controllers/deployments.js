'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:DeploymentsCtrl
 * @description
 * # DeploymentsCtrl
 * Controller of the clientApp
 */
angular.module('loopbackApp')

  .config(function($stateProvider) {
    $stateProvider.state('app.deployments', {
      abstract: true,
      url: '/deployments',
      templateUrl: 'views/deployments/main.html',
      controller: 'DeploymentsCtrl'
    })
    .state('app.deployments.list', {
      url: '',
      templateUrl: 'views/deployments/list.html',
      controller: 'DeploymentsCtrl'
    })
    .state('app.deployments.add', {
      url: '/add',
      templateUrl: 'views/deployments/form.html',
      controller: 'DeploymentsCtrl'
    })
    .state('app.deployments.edit', {
      url: '/:id/edit',
      templateUrl: 'views/deployments/form.html',
      controller: 'DeploymentsCtrl'
    })
    .state('app.deployments.view', {
      url: '/:id',
      templateUrl: 'views/deployments/view.html',
      controller: 'DeploymentsCtrl'
    });
  })

  .controller('DeploymentsCtrl', function($scope, $state, $stateParams, $notification, Deployment) {

  var deploymentId = $stateParams.id;

  if (deploymentId) {
    $scope.deployment = Deployment.findById({
      id: deploymentId
    }, function() {}, function(err) {
      console.log(err);
    });
  } else {
    $scope.deployment = {};
  }

  function loadItems() {
    $scope.deployments = Deployment.find();
  }

  loadItems();

  $scope.delete = function(id) {
    // if (confirm('Are you sure?') === false) {
    //   $notification.success('Delete canceled!', 'Yay!!');
    //   return false;
    // }
    Deployment.deleteById(id, function() {
      $notification.success('Deployment deleted', 'Your deployment is deleted!');
      loadItems();
      $state.go('app.deployments.list');
      console.log();
    }, function(err) {
      $notification.success('Error deleting deployment', 'Your deployment is deployment deleted! ' + err);
    });

  };

  $scope.formFields = [{
    key: 'name',
    type: 'text',
    label: 'Name',
    required: true
  }, {
    key: 'projectId',
    type: 'text',
    label: 'Project ID',
    required: true
  }, {
    key: 'repositoryId',
    type: 'text',
    label: 'Repository ID',
    required: true
  }, {
    key: 'targetId',
    type: 'text',
    label: 'Target ID',
    required: true
  }];

  $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: 'Save'
  };

  $scope.onSubmit = function() {
    Deployment.upsert($scope.deployment, function() {
      $notification.success('Deployment saved', 'Your deployment is safe with us!');
      $state.go('^.list');
    }, function(err) {
      console.log(err);
    });
  };

  });

'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the clientApp
 */
angular.module('loopbackApp')

  .config(function($stateProvider) {
    $stateProvider.state('app.projects', {
      abstract: true,
      url: '/projects',
      templateUrl: 'views/projects/main.html',
      controller: 'ProjectsCtrl'
    })
    .state('app.projects.list', {
      url: '',
      templateUrl: 'views/projects/list.html',
      controller: 'ProjectsCtrl'
    })
    .state('app.projects.add', {
      url: '/add',
      templateUrl: 'views/projects/form.html',
      controller: 'ProjectsCtrl'
    })
    .state('app.projects.edit', {
      url: '/:id/edit',
      templateUrl: 'views/projects/form.html',
      controller: 'ProjectsCtrl'
    })
    .state('app.projects.view', {
      url: '/:id',
      templateUrl: 'views/projects/view.html',
      controller: 'ProjectsCtrl'
    });
  })

  .controller('ProjectsCtrl', function($scope, $state, $stateParams, $notification, Project) {

  var projectId = $stateParams.id;

  if (projectId) {
    $scope.project = Project.findById({
      id: projectId
    }, function() {}, function(err) {
      console.log(err);
    });
  } else {
    $scope.project = {};
  }

  function loadItems() {
    $scope.projects = Project.find();
  }

  loadItems();

  $scope.delete = function(id) {
    // if (confirm('Are you sure?') === false) {
    //   $notification.success('Delete canceled!', 'Yay!!');
    //   return false;
    // }
    Project.deleteById(id, function() {
      $notification.success('Project deleted', 'Your project is deleted!');
      loadItems();
      $state.go('app.projects.list');
      console.log();
    }, function(err) {
      $notification.success('Error deleting project', 'Your project is project deleted! ' + err);
    });

  };

  $scope.formFields = [{
    key: 'name',
    type: 'text',
    label: 'Name',
    required: true
  }];

  $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: 'Save'
  };

  $scope.onSubmit = function() {
    Project.upsert($scope.project, function() {
      $notification.success('Project saved', 'Your project is safe with us!');
      $state.go('^.list');
    }, function(err) {
      console.log(err);
    });
  };

  });

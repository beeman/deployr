'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:RepositorysCtrl
 * @description
 * # RepositorysCtrl
 * Controller of the clientApp
 */
angular.module('loopbackApp')

  .config(function($stateProvider) {
    $stateProvider.state('app.repositories', {
      abstract: true,
      url: '/repositories',
      templateUrl: 'views/repositories/main.html',
      controller: 'RepositorysCtrl'
    })
    .state('app.repositories.list', {
      url: '',
      templateUrl: 'views/repositories/list.html',
      controller: 'RepositorysCtrl'
    })
    .state('app.repositories.add', {
      url: '/add',
      templateUrl: 'views/repositories/form.html',
      controller: 'RepositorysCtrl'
    })
    .state('app.repositories.edit', {
      url: '/:id/edit',
      templateUrl: 'views/repositories/form.html',
      controller: 'RepositorysCtrl'
    })
    .state('app.repositories.view', {
      url: '/:id',
      templateUrl: 'views/repositories/view.html',
      controller: 'RepositorysCtrl'
    });
  })

  .controller('RepositorysCtrl', function($scope, $state, $stateParams, $notification, Repository) {

  var repositoryId = $stateParams.id;

  if (repositoryId) {
    $scope.repository = Repository.findById({
      id: repositoryId
    }, function() {}, function(err) {
      console.log(err);
    });
  } else {
    $scope.repository = {};
  }

  function loadItems() {
    $scope.repositories = Repository.find();
  }

  loadItems();

  $scope.delete = function(id) {
    // if (confirm('Are you sure?') === false) {
    //   $notification.success('Delete canceled!', 'Yay!!');
    //   return false;
    // }
    Repository.deleteById(id, function() {
      $notification.success('Repository deleted', 'Your repository is deleted!');
      loadItems();
      $state.go('app.repositories.list');
      console.log();
    }, function(err) {
      $notification.success('Error deleting repository', 'Your repository is repository deleted! ' + err);
    });

  };

  $scope.formFields = [{
    key: 'name',
    type: 'text',
    label: 'Name',
    required: true
  }, {
    key: 'url',
    type: 'text',
    label: 'Url',
    required: true
  }, {
    key: 'branch',
    type: 'text',
    label: 'Branch',
    required: true    
  }];

  $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: 'Save'
  };

  $scope.onSubmit = function() {
    Repository.upsert($scope.repository, function() {
      $notification.success('Repository saved', 'Your repository is safe with us!');
      $state.go('^.list');
    }, function(err) {
      console.log(err);
    });
  };

  });

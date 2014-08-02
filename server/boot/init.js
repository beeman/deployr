'use strict';

module.exports = function(app) {

  if (app.dataSources.db.name !== 'Memory') { return; }

  console.error('Started creating inital data.');

  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;


  User.create({
    email: 'admin@admin.com',
    firstName: 'System',
    lastName: 'Admin',
    password: 'admin'
  }, function (err, user) {

    if(err) { console.log('err', err); }

     Role.create({name: 'admin'}, function (err, role) {
       role.principals.create({principalType: RoleMapping.USER, principalId: user.id});
     });

  });

  User.create({
    email: 'user@user.com',
    firstName: 'App',
    lastName: 'User',
    password: 'user'
  }, function (err, user) {

    if(err) { console.log('err', err); }

     Role.create({name: 'admin'}, function (err, role) {
       role.principals.create({principalType: RoleMapping.USER, principalId: user.id});
     });

  });

  var Project = app.models.Project;
  var Target = app.models.Target;
  var Repository = app.models.Repository;
  var Deployment = app.models.Deployment;

  var project1 = { 'id': 1, 'name': 'TestProject' };

  var target1 = { 'id': 1, 'name': 'local', 'type': 'local', 'path': '/tmp/target/' };

  var repository1 = { 'id': 1, 'name': 'lb-ng-bs', 'url': 'https://github.com/beeman/lb-ng-bs.git', 'branch': 'master' };
  var repository2 = { 'id': 2, 'name': 'express-pinger', 'url': 'https://github.com/beeman/express-pinger.git', 'branch': 'master' };

  var deployment1 = { 'id': 1, 'name': 'lb-ng-bs', 'projectId': '1', 'repositoryId': '1', 'targetId': '1' };
  var deployment2 = { 'id': 2, 'name': 'express-pinger', 'projectId': '1', 'repositoryId': '2', 'targetId': '1' };

  Project.create(project1, function (err, project) {
    if(err) { console.log('err', err); }
    console.log(project);
  });
  Target.create(target1, function (err, target) {
    if(err) { console.log('err', err); }
    console.log(target);
  });
  Repository.create(repository1, function (err, repository) {
    if(err) { console.log('err', err); }
    console.log(repository);
  });
  Repository.create(repository2, function (err, repository) {
    if(err) { console.log('err', err); }
    console.log(repository);
  });
  Deployment.create(deployment1, function (err, deployment) {
    if(err) { console.log('err', err); }
    console.log(deployment);
  });
  Deployment.create(deployment2, function (err, deployment) {
    if(err) { console.log('err', err); }
    console.log(deployment);
  });

};

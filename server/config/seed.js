/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';

Thing.find({}).removeAsync()
  .then(function() {
    Thing.create({
      name: 'Vragen Reeks 1',
      info: 'Vragenreeks over .....'
    }, {
      name: 'Vragen Reeks 2',
      info: 'Nog een reeks'
    }, {
      name: 'Vragen Reeks 3',
      info: 'iets'
    }, {
      name: 'Vragen Reeks 4',
      info: 'nog iets'
    }, {
      name: 'Vragen Reeks 5',
      info: 'blabla'
    }, {
      name: 'Deployment info',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });

/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Detail from '../api/detail/detail.model';

Thing.find({}).removeAsync()
  .then(function() {
    Thing.create({
      name: 'Vragen Reeks 1',
      info: 'Vragenreeks over .....',
      password : ''
    }, {
      name: 'Vragen Reeks 2',
      info: 'Nog een reeks',
      password : ''
    }, {
      name: 'Vragen Reeks 3',
      info: 'iets',
      password : ''
    }, {
      name: 'Vragen Reeks 4',
      info: 'nog iets',
      password : ''
    }, {
      name: 'Vragen Reeks 5',
      info: 'blabla',
      password : ''
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

'use strict';

var app = require('../..');
var request = require('supertest');

var newDetail;

describe('Detail API:', function() {

  describe('GET /api/details', function() {
    var details;

    beforeEach(function(done) {
      request(app)
        .get('/api/details')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          details = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      details.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/details', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/details')
        .send({
          name: 'New Detail',
          info: 'This is the brand new detail!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newDetail = res.body;
          done();
        });
    });

    it('should respond with the newly created detail', function() {
      newDetail.name.should.equal('New Detail');
      newDetail.info.should.equal('This is the brand new detail!!!');
    });

  });

  describe('GET /api/details/:id', function() {
    var detail;

    beforeEach(function(done) {
      request(app)
        .get('/api/details/' + newDetail._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          detail = res.body;
          done();
        });
    });

    afterEach(function() {
      detail = {};
    });

    it('should respond with the requested detail', function() {
      detail.name.should.equal('New Detail');
      detail.info.should.equal('This is the brand new detail!!!');
    });

  });
    
    

  describe('PUT /api/details/:id', function() {
    var updatedDetail

    beforeEach(function(done) {
      request(app)
        .put('/api/details/' + newDetail._id)
        .send({
          name: 'Updated Detail',
          info: 'This is the updated detail!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDetail = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDetail = {};
    });

    it('should respond with the updated detail', function() {
      updatedDetail.name.should.equal('Updated Detail');
      updatedDetail.info.should.equal('This is the updated detail!!!');
    });

  });

  describe('DELETE /api/details/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/details/' + newDetail._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when detail does not exist', function(done) {
      request(app)
        .delete('/api/details/' + newDetail._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});

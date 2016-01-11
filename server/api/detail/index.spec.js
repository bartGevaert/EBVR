'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var detailCtrlStub = {
  index: 'detailCtrl.index',
  show: 'detailCtrl.show',
  create: 'detailCtrl.create',
  update: 'detailCtrl.update',
  destroy: 'detailCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var detailIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './detail.controller': detailCtrlStub
});

describe('Detail API Router:', function() {

  it('should return an express router instance', function() {
    detailIndex.should.equal(routerStub);
  });

  describe('GET /api/details', function() {

    it('should route to detail.controller.index', function() {
      routerStub.get
        .withArgs('/', 'detailCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/details/:id', function() {

    it('should route to detail.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'detailCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/details', function() {

    it('should route to detail.controller.create', function() {
      routerStub.post
        .withArgs('/', 'detailCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/details/:id', function() {

    it('should route to detail.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'detailCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/details/:id', function() {

    it('should route to detail.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'detailCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/details/:id', function() {

    it('should route to detail.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'detailCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

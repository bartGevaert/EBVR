/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/details              ->  index
 * POST    /api/details              ->  create
 * GET     /api/details/:id          ->  show
 * PUT     /api/details/:id          ->  update
 * DELETE  /api/details/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Detail = require('./detail.model');
var Thing = require ('../thing/thing.model');//.. omdat map hoger staat

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Details
exports.index = function(req, res) {
  Detail.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Detail from the DB
exports.show = function(req, res) {
  Detail.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Detail in the DB
exports.create = function(req, res) {
  Detail.createAsync(req.body)
    .then(function(result){
        res.detail = result;
        return Thing.findByIdAndUpdateAsync(req.body.detailId, {
        $push:{ details : result._id }}
        );
    })
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Detail in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Detail.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Detail from the DB
exports.destroy = function(req, res) {
  Detail.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

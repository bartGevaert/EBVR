/**
 * Detail model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Detail = require('./detail.model');
var DetailEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DetailEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Detail.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DetailEvents.emit(event + ':' + doc._id, doc);
    DetailEvents.emit(event, doc);
  }
}

module.exports = DetailEvents;

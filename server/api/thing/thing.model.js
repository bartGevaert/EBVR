'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;


var ThingSchema = new Schema({
  name: String,
  info: String,
  password: String,
  currentQuestion: Number,
  details : 
    [{
     type: Schema.Types.ObjectId,
     ref: 'Detail'
    }]
});
    
module.exports = mongoose.model('Thing', ThingSchema);

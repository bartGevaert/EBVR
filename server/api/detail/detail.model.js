'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var DetailSchema = new Schema({
    question: String,
    answer: [String],
    correctAnswer: Number,
    groupId: String,
    currentQuestion: { type : Number, default : 0},
});

module.exports = mongoose.model('Detail', DetailSchema);

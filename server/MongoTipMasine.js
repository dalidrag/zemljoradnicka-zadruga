"use strict";

var mongoose = require('mongoose');

var TipMasineSchema = new mongoose.Schema({
	id: String,
	naziv: String,
	srcSlike: String,
});
module.exports = TipMasineSchema;
"use strict";

var mongoose = require('mongoose');

var InfoImageSchema = new mongoose.Schema({
	data: Buffer,
	contentType: String
});
module.exports = InfoImageSchema;
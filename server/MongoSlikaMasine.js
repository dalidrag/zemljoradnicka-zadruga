"use strict";

var mongoose = require('mongoose');

var SlikaMasineSchema = new mongoose.Schema({
	 name: String,
	 data: {type:Buffer, required:true },
	 contentType: { type: String, required: true },
	 tmpPath: String
});

module.exports = SlikaMasineSchema;


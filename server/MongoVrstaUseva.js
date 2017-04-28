"use strict";

var mongoose = require('mongoose');

var VrstaUsevaSchema = new mongoose.Schema({
	ime: String,
	srcSlike: String
});
module.exports = VrstaUsevaSchema;
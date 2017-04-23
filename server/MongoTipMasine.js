"use strict";

var mongoose = require('mongoose');

var SlikaMasineSchema = require("./MongoSlikaMasine");
var SlikaMasineModel = mongoose.model('SlikaMasine', SlikaMasineSchema);

var TipMasineSchema = new mongoose.Schema({
	id: String,
	naziv: String,
	slikaMasine: {type: mongoose.Schema.Types.ObjectId, ref: 'SlikaMasine'}
});
module.exports = TipMasineSchema;
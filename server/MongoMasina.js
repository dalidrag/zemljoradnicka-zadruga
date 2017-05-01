"use strict";

var mongoose = require('mongoose');
var TipMasineSchema = require('./MongoTipMasine');
var TipMasineModel = mongoose.model('TipMasine', TipMasineSchema);
var UserSchema = require('./MongoUser');
var UserModel = mongoose.model('User', UserSchema);

var MasinaSchema = new mongoose.Schema({
	id: String,
	ime: String,
	tipMasine: {type: mongoose.Schema.Types.ObjectId, ref: 'TipMasine'}, // referenca na tip masine
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
module.exports = MasinaSchema;
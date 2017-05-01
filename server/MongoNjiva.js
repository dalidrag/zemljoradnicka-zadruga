"use strict";

var mongoose = require('mongoose');
var UsevSchema = require('./MongoUsev');

var NjivaSchema = new mongoose.Schema({
	ime: String,
	oblikNaMapi: Array,
	katOpstina: String,
	katBroj: String,
	osnovKoriscenja: Number, // 1-vlasnistvo, 2-zakup zemljista
	povrsina: Number,
	tipZemljista: String,
	klasaZemljista: Number, // (1-8);
	pH_KCI: Number,		// %
	pH_H20: Number,
	humus: Number,
	CaCO3: Number,
	N: Number,
	AI_P2O5: Number,
	AI_K20: Number,
	usevi: [UsevSchema]
});
module.exports = NjivaSchema;
"use strict";

var mongoose = require('mongoose');
var TipMasineSchema = require('./MongoTipMasine');
var TipMasineModel = mongoose.model('TipMasine', TipMasineSchema);

var InfoSchema = new mongoose.Schema({
	id: String,
	naslov: String,
	clanak: String,
	tipMasine: {type: mongoose.Schema.Types.ObjectId, ref: 'TipMasine'},
	marka: String,
	model: String,
	podTip1: String,
	podTip2: String,
	podTip3: String,
	tipAktivnosti: String,
	podTip: String,
	metaAktivnosti1: String, // imena njiva (Array)
	metaAktivnosti2: String, // ime sirovine (vrsta useva, vrsta djubriva, vrsta hemikalije)
	metaAktivnosti3: String, // ime masine
	metaAktivnosti4: String, // ime dodatka za masinu
	metaAktivnosti5: String, // imena skladista (Array)
	vrstaUseva: String,	// TODO: bice referenca
	vrstaZemljista: String 
});
module.exports = InfoSchema;
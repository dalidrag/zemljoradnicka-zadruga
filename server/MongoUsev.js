"use strict";

var mongoose = require('mongoose');

var UsevSchema = new mongoose.Schema({
	vrstaUseva: String,	// TODO ref -> Vrsta Useva
	kolicinaUseva: Number,
	procenatNjivePodUsevom: Number,
	datumSejanja: Date,
	ocekivaniDatumPrinosa: Date,
	ocekivaniPrinos: Date,
	poznjevenoVlaga: Number, // %
	poznjevenoHektolitarskaMasa: Number,
	poznjevenoDigestija: Number,
	poznjevenoSadrzajUlja: Number
});
module.exports = UsevSchema;
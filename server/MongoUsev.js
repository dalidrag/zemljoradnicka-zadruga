"use strict";

var mongoose = require('mongoose');

var UsevSchema = new mongoose.Schema({
	vrsta_useva: String,	// TODO ref -> Vrsta Useva
	kolicina_useva: Number,
	datum_sejanja: Date,
	ocekivani_datum_prinosa: Date,
	ocekivani_prinos: Date,
	poznjeveno_vlaga: Number, // %
	poznjeveno_hektolitarska_masa: Number,
	poznjeveno_digestija: Number,
	poznjeveno_sadrzaj_ulja: Number
});
module.exports = UsevSchema;
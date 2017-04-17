"use strict";

var mongoose = require('mongoose');
var UsevSchema = require('./MongoUsev');

var NjivaSchema = new mongoose.Schema({
	ime: String,
	koordinate: Array,
	katastarska_opstina: String,
	osnov_koriscenja: Number,
	tip_zemljista: String,
	klasa_zemljista: Number, // (1-8);
/*	analiza_zemljista: {
		Datum: date,
		pH-KCI_dubina: number,	// cm
		pH-KCI: number,		// %
		pH-H20_dubina: number,
		pH-H20: number,
		Humus_dubina: number,
		Humus: number,
		CaCO3_dubina: number,
		CaCO3: number,
		N_dubina: number,
		N: number,
		AI-P2O5_dubina: number,
		AI-P2O5: number,
		AI-K20_dubina: number,
		AI-K20: number,
	}, */
	usevi: [UsevSchema]
});
module.exports = NjivaSchema;
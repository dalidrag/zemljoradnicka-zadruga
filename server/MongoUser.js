"use strict";

var mongoose = require('mongoose');

var NjivaSchema = require('./MongoNjiva');

var UserSchema = mongoose.Schema({
	username: String,
	ime_i_prezime: String,
	prebivaliste: String,
	JBMG:	String,
	/* Iznos novcanog uloga ili clanarine, odnosno opis vrste i vrednost nenovcanog uloga
		Vreme uplate, odnosno nacin i vreme unošenja nenovcanog uloga	
		Slika;
		Zadruga: reference(Zadruga) */
	njive: [NjivaSchema]
		/* Masine, Aktivnosti - (1),
		Skladista, Djubrivo, Pesticidi, Ostala imovina -  svi Array.
		Zabeleske - Array, deo Clana Zadruge u MongoDB-u. */
});
module.exports = UserSchema;

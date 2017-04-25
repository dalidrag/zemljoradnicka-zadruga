"use strict";

var mongoose = require( 'mongoose' );

var mongoDBConfig = require('./MongoDBTestConfig');

// Create the database connection
mongoose.connect(mongoDBConfig.dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function() {
	console.log('Mongoose default connection open to ' + mongoDBConfig.dbURI);
});
// When Node server exits
process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});
});

var TipMasineSchema = require("./MongoTipMasine");
var TipMasineModel = mongoose.model('TipMasine', TipMasineSchema);
var InfoSchema = require("./MongoInfo");
var InfoModel = mongoose.model('Info', InfoSchema);

// 4 info objekta: traktor, IMT traktor, kombajn i akcija sejanje
TipMasineModel.findOne({naziv: 'Трактор'}, (err, traktor) => {
	if (err) console.log(err);
	console.log('Traktor: ' + traktor);
			
	var info1Model = new InfoModel({
		naslov: "О тракторима",
		clanak: "<p>Тракотри су кул.</p>",
		tipMasine: traktor
	});
	info1Model.save(function (err) {
		if (err) console.log(err);
	});

	var info2Model = new InfoModel({
		naslov: "О  IMT тракторима",
		clanak: "<p>IMT тракотри су кул.</p>",
		tipMasine: traktor,
		marka: 'IMT'
	});
	info2Model.save(function (err) {
		if (err) console.log(err);
	});
});

TipMasineModel.findOne({naziv: 'Комбајн'}, (err, kombajn) => {
	if (err) console.log(err);

	var info3Model = new InfoModel({
		naslov: "О комбајнима",
		clanak: "<p>Комбајни су кул.</p>",
		tipMasine: kombajn
	});
	info3Model.save(function (err) {
		if (err) console.log(err);
	});
}); 

var info4Model = new InfoModel({
	naslov: "О сејању",
	clanak: "<p>Сејање је кул.</p>",
	tipAktivnosti: 'Sejanje'
});
info4Model.save(function (err) {
	if (err) console.log(err);
});

var info5Model = new InfoModel({
	naslov: "О жетви",
	clanak: "<p>Жетва је најбоља!</p>",
	tipAktivnosti: 'Zetva'
});
info5Model.save(function (err) {
	if (err) console.log(err);
});

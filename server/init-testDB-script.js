/* This code creates initial 'zadruga-test' database for 'sample' user */
"use strict";

var mongoose = require( 'mongoose' );
var fs=require('fs');

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

var NjivaSchema = require("./MongoNjiva");
var UserSchema = require("./MongoUser");
var TipMasineSchema = require("./MongoTipMasine");
var MasinaSchema = require("./MongoMasina");
var SlikaMasineSchema = require("./MongoSlikaMasine");
var VrstaUsevaSchema = require("./MongoVrstaUseva");

/*******************************************************************/

var SlikaMasineModel = mongoose.model('SlikaMasine', SlikaMasineSchema);
var slikeMasina = [];
let slikeLokacija = ['../src/assets/images/masine/traktor.jpg', '../src/assets/images/masine/kombajn.jpg', '../src/assets/images/masine/motokultivator.jpg'];
slikeLokacija.forEach((lokacijaSlike) => {
	slikeMasina.push(new SlikaMasineModel({
		data: fs.readFileSync(lokacijaSlike),
		contentType: 'image/jpg',
		name: "placeholder",
		tmpPath: __dirname + lokacijaSlike
	}));
	slikeMasina[slikeMasina.length - 1].save(function(err){
		if (err) console.log(err);
	});
});

var TipMasineModel = mongoose.model('TipMasine', TipMasineSchema);
var tipoviMasinaData = [
      {id: 1, naziv: "Трактор", slikaMasine: slikeMasina[0] },
      {id: 2, naziv: "Комбајн", slikaMasine: slikeMasina[1] },
      {id: 3, naziv: "Мотокултиватор", slikaMasine: slikeMasina[2] },
      {id: 4, naziv: "Додатак за трактор" },
      {id: 5, naziv: "Комбајн адаптер" },
      {id: 6, naziv: "Прикључак за мотокултиватор" }
    ];
var tipoviMasina = tipoviMasinaData.map(tipMasine => {
	return new TipMasineModel(tipMasine);
});
tipoviMasina.forEach(tipMasine => {
	tipMasine.save(err => {
		if (err) console.log(err);
	});
});

var vrsteUsevaData = [
    	{id: 1, ime: "Пшеница", srcSlike: 'vrste-useva/psenica.jpg' },
    	{id: 2, ime: "Кукуруз", srcSlike: 'vrste-useva/kukuruz.jpg' },
    	{id: 3, ime: "Соја", srcSlike: 'vrste-useva/soja.jpg' },
    	{id: 4, ime: "Пасуљ", srcSlike: 'vrste-useva/pasulj.jpg' },
    	{id: 5, ime: "Мак", srcSlike: 'vrste-useva/mak.jpg' },
    	{id: 6, ime: "Сунцокрет", srcSlike: 'vrste-useva/suncokret.jpg' }
    ];
var VrstaUsevaModel = mongoose.model('VrstaUseva', VrstaUsevaSchema);
var vrsteUseva = vrsteUsevaData.map(vrstaUseva => {
	return new VrstaUsevaModel(vrstaUseva);
});
vrsteUseva.forEach(vrstaUseva => {
	vrstaUseva.save(err => {
		if (err) console.log(err);
	});
});

var NjivaModel = mongoose.model('Njiva', NjivaSchema);
var njivaModel = new NjivaModel({
	ime: 'prva',
	klasa_zemljista: 8,
	usevi: []
});

var MasinaModel = mongoose.model('Masina', MasinaSchema);

var UserModel = mongoose.model('User', UserSchema);
var userModel = new UserModel({
	username: 'sample1',
	prebivaliste: 'Dobrica',
	njive:[njivaModel], 
	masine: []
});

userModel.save(function (err) {
	if (err) {
		console.log(err);
	}
	else {
		console.log('User uspesno snimljen.');
	}
});


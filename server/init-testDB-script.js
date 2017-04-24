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
var brojSnimljenihMasina = 0;
tipoviMasina.forEach(tipMasine => {
	tipMasine.save(err => {
		if (err) console.log(err);
		brojSnimljenihMasina++;
	});
});

var NjivaModel = mongoose.model('Njiva', NjivaSchema);
var njivaModel = new NjivaModel({
	ime: 'prva',
	klasa_zemljista: 8
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


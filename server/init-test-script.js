/* This code creates initial 'zadruga-test' database for 'sample' user */
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

var NjivaSchema = require("./MongoNjiva");
var UserSchema = require("./MongoUser");
var TipMasineSchema = require("./MongoTipMasine");
var MasinaSchema = require("./MongoMasina");

var TipMasineModel = mongoose.model('TipMasine', TipMasineSchema);
var tipoviMasinaData = [
      {id: 1, naziv: "Трактор", srcSlike: 'masine/traktor.jpg' },
      {id: 2, naziv: "Комбајн", srcSlike: 'masine/kombajn.jpg' },
      {id: 3, naziv: "Мотокултиватор", srcSlike: 'masine/motokultivator.jpg' },
      {id: 4, naziv: "Додатак за трактор: плуг грабуље за копачицу", srcSlike: 'masine/plug-grabulje-za-kopacicu.jpg'},
      {id: 5, naziv: "Комбајн сунцокретни адаптер", srcSlike: 'masine/kombajn-suncokretni-adapter.jpg' },
      {id: 6, naziv: "Прскалица прикључак за мотокултиватор", srcSlike: 'masine/prikljucak-prskalica.jpg' }
    ];
var tipoviMasina = tipoviMasinaData.map(tipMasine => {
	return new TipMasineModel(tipMasine);
});
tipoviMasina.forEach(tipMasine => {
	tipMasine.save(err => {
		if (err) console.log(err);
	})
})
/*
var NjivaModel = mongoose.model('Njiva', NjivaSchema);
var njivaModel = new NjivaModel({
	ime: 'prva',
	klasa_zemljista: 8
});
*/
var MasinaModel = mongoose.model('Masina', MasinaSchema);

var UserModel = mongoose.model('User', UserSchema);
var userModel = new UserModel({
	username: 'sample1',
	prebivaliste: 'Dobrica',
	njive:[], 
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


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

var NjivaSchema = require("./MongoNjiva");
var UserSchema = require("./MongoUser");

var NjivaModel = mongoose.model('Njiva', NjivaSchema);
var njivaModel = new NjivaModel({
	ime: 'prva',
	klasa_zemljista: 8
});
var UserModel = mongoose.model('User', UserSchema);
var userModel = new UserModel({
	username: 'sample1',
	prebivaliste: 'Dobrica',
	njive:[njivaModel]
});

userModel.save(function (err) {
	if (err) {
		console.log(err);
		mongoose.connection.close();
	}
	else {
		console.log('User uspesno snimljen.');
		mongoose.connection.close();
	}
});


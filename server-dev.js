'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// var session = require('express-session');

var mongoose = require( 'mongoose' );

var mongoDBTestConfig = require('./server/MongoDBTestConfig');
var DBLink = require('./server/DBLink.js');

var app = express();

app.set('port', process.env.PORT || 3000);

// app.use(express.static(__dirname + '/public'));

app.use(cors());	// For development only

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/*
app.use(session({
    secret: 'cookieSecret',
    saveUninitialized: false,
    resave: false
}));
*/

/*************************************/
/* Zadruga REST API end points */
/*************************************/
// Vrati sve njive datog korisnika
app.get('/api/njive', (req, res) => {
	DBLink.getNjive('sample1').then((njive) => {
		var data = njive.map((njiva) => {
  	         			let oNjiva = njiva.toObject();
  	         			oNjiva.id = oNjiva._id;
  	             	return oNjiva;
  	           });
		res.send({ok: true, data: data});
	})
	.catch(err => handleError(err, res));
});
// Dodaj novu njivu datom korisniku
app.post('/api/njive', (req, res) => {
	var novaNjiva = {
		ime: req.body.ime,
		klasa_zemljista: req.body.klasaZemljista
	}
	DBLink.addNjiva('sample1', novaNjiva).then(savedNjiva => {
		let oSavedNjiva = savedNjiva.toObject();
		oSavedNjiva.id = oSavedNjiva._id;

		res.send({ok: true, data: oSavedNjiva});
	})
	.catch(err => handleError(err, res));
});



var handleError = function (err, res) {
	console.log("Error: " + err);	// TODO
	res.sendStatus(500);
}

// For HTML5 pushstate produced URLs
/* app.get('*', function(request, response) {
	response.sendFile(__dirname + '/public/index.html');
}); */

/***************/
/* Error pages */
/***************/
// custom 404 page
app.use((req, res) => {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

// custom 500 page
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
	console.log('Mongoose default connection open to ' + mongoDBTestConfig.dbURI);
});
// If the connection throws an error
mongoose.connection.on('error', err => {
	console.log('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose default connection disconnected');
} );
// When Node server exits
process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});
});

mongoose.connect(mongoDBTestConfig.dbURI);

app.listen(app.get('port'), () => {
	console.log( 'Express started on http://localhost:' +
	app.get('port') + '; press Ctrl-C to terminate.' );
});

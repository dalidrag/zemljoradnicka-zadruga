'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var formidable = require('formidable');
var cors = require('cors');
var session = require('express-session');

var mongoose = require( 'mongoose' );

var mongoDBTestConfig = require('./server/MongoDBTestConfig');
var DBLink = require('./server/DBLink.js');

var InfoImageSchema = require("./server/MongoInfoSlika");
var InfoImageModel = mongoose.model('InfoImage', InfoImageSchema);

var app = express();

app.set('port', process.env.PORT || 3000);

// app.use(express.static(__dirname + '/public'));

app.use(cors());	// For development only

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// korisnicke sesije
app.use(session({
    secret: 'cookieSecret',
    saveUninitialized: false,
    resave: false
}));




/*************************************/
/* Zadruga REST API end points */
/*************************************/

// Log in based on user name
app.post('/api/login', (req, res) => {
	DBLink.getUser(req.body.username).then(user => {
		if (user) {
			req.session.username = user.username;
			res.send({userId: user._id});
		}
		else
			res.send({userId: false});
	})
	.catch(err => handleError(err, res));
});
// Log out 
app.get('/api/logout', (req, res) => {
	delete req.session.username;
	res.send({ok: 'true'});
});
// Vrati datog korisnika
app.get('/api/users', (req, res) => {
	DBLink.getUser('sample1')
	.then(user => res.send({ok: true, data: user}))
	.catch(err => handleError(err, res));
});
// Vrati sve korisnike
app.get('/api/users/all', (req, res) => {
	DBLink.getAllUsers()
	.then(users => res.send({ok: true, data: users}))
	.catch(err => handleError(err, res));
});
// Dodaj korisnika
// TODO

/* Update korisnika TODO
app.put('/api/users', (req, res) => {
	let user = {};
	user._id = req.body._id;
	user.masine = req.body.masine;
	user.username = req.body.username;
	DBLink.updateUser(user).then(updatedUser => {
		updatedUser.masine = updatedUser.masine.map((masina) => {
  	         			let oMasina = masina.toObject();
  	         			oMasina.id = oMasina._id;
  	             	return oMasina;
  	           });
		res.send({ok: true, data: updatedUser});
	})
	.catch(err => handleError(err, res));
}); */

// Vrati sve njive datog korisnika
app.get('/api/njive', (req, res) => {
	DBLink.getNjive('sample1')
	.then(njive => res.send({ok: true, data: njive}))
	.catch(err => handleError(err, res));
});
// Dodaj novu njivu datom korisniku
app.post('/api/njive', (req, res) => {
	var novaNjiva = {
		ime: req.body.ime,
		oblikNaMapi: req.body.oblikNaMapi,
		katOpstina: req.body.katOpstina,
		katBroj: req.body.katBroj,
		osnovKoriscenja: req.body.osnovKoriscenja,
		povrsina: req.body.povrsina,
		tipZemljista: req.body.tipZemljista,
		klasaZemljista: req.body.klasaZemljista,
		pH_KCI: req.body.pH_KCI,		// %
		pH_H20: req.body.pH_H20,
		humus: req.body.humus,
		CaCO3: req.body.CaCO3,
		N: req.body.N,
		AI_P2O5: req.body.AI_P2O5,
		AI_K20: req.body.AI_K20,
		usevi: []
	}

	ukloniFalsyVrednosti(novaNjiva);

	DBLink.addNjiva('sample1', novaNjiva)
	.then(savedNjiva => res.send({ok: true, data: savedNjiva}))
	.catch(err => handleError(err, res));
});
// Azuriraj postojecu njivu

// Vrati sve vrste useva
app.get('/api/vrsteUseva', (req, res) => {
	DBLink.getVrsteUseva()
	.then(vrsteUseva => res.send({ok: true, data: vrsteUseva}))
	.catch(err => handleError(err, res));
});
// Snimi novi usev //TODO
app.post('/api/njive/noviUsev', (req, res) => {
	var noviUsev = {
		vrstaUseva: req.body.vrstaUseva
	}
	DBLink.noviUsev('sample1', req.body.njivaId, noviUsev)
	.then(snimljeniUsev => res.send({ok: true, data: snimljeniUsev}))
	.catch(err => handleError(err, res));
});

// Skini sliku tipa masine sa datim id-om
app.get('/api/masine/:idTipMasine/slika', function (req, res) {
	DBLink.getSlikaMasine(req.params.idTipMasine).then(img => {
		res.contentType(img.contentType);
		res.end(img.data);
	})
	.catch(err => handleError(err, res));
});
// Vrati sve tipove masina
app.get('/api/masine/tipovi', function(req, res) {
	DBLink.getTipoveMasina()
	.then(tipoviMasina => res.send({ok: true, data: tipoviMasina}))
	.catch(err => handleError(err, res));
});
// Vrati sve masine ulogovanog korisnika //TODO
app.get('/api/masine', (req, res) => {
	DBLink.getMasine('sample1')
	.then(masine => res.send({ok: true, data: masine}))
	.catch(err => handleError(err, res));
});
// Dodaj masinu ulogovanom korisniku //TODO
app.post('/api/masine', (req, res) => {
	var novaMasina = {
		ime: req.body.ime,
		tipMasine: req.body.tipMasine
	}
	DBLink.dodajMasinu('sample1', novaMasina)
	.then(savedMasina => res.send({ok: true, data: savedMasina}))
	.catch(err => handleError(err, res));
});


// Vrati array naslova HTML stranica o datoj temi
app.post('/api/info/getTopics', (req, res) => {
	var query = {
		tipMasine: req.body.tipMasine,
		marka: req.body.marka,
		tipAktivnosti: req.body.tipAktivnosti
	}
	ukloniFalsyVrednosti(query);
	DBLink.getInfoTopics(query)
	.then(infoPages => res.send({ok: true, data: infoPages}))
	.catch(err => handleError(err, res));
});
// Vrati sadrzaj clanka
app.get('/api/info/getHTML/:id', (req, res) => {
	DBLink.getInfoHTML(req.params.id)
	.then(clanak => res.send({ok: true, data: clanak}))
	.catch(err => handleError(err, res));
});
// Dodaj novi info clanak
app.post('/api/info/novaTema', (req, res) => {
	let noviClanak = {
		naslov: req.body.naslov,
		clanak: req.body.HTML,
		tipAktivnosti: req.body.tipAktivnosti
	}
	DBLink.addNewInfo(noviClanak)
	.then(clanak => res.send({ok: true, data: clanak}))
	.catch(err => handleError(err, res));
});
// Upload info slike
app.post('/api/info/upload-image', (req, res) => {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		if(err) handleError(err, res);

		var newImageModel = new InfoImageModel;
		newImageModel.data = fs.readFileSync(files.file.path);
		newImageModel.contentType = files.file.type;
		newImageModel.save((err, savedImage) => {
			if (err) handleError(err, res);

			res.send({link: 'http://localhost:3000/api/info/get-image/' + savedImage._id});
		});
	});
});
// Vrati info sliku
app.get('/api/info/get-image/:id', (req, res) => {
	InfoImageModel.findById(req.params.id, (err, img) => {
		if(err) handleError(err, res);

		res.contentType(img.contentType);
		res.send(img.data);
	});
});

/**
 	* Uklanja object properties sa vrednoscu undefined
 	*
 	* @method ukloniUndefined
 	* @param object
 	*/
 var ukloniFalsyVrednosti = function(object) {
 		for (let key of Object.keys(object)) {
			if (!object[key]) delete object[key];
		}
  }

/**
 * Rukuje nastalom greskom
 *
 * @method handleError
 */
var handleError = function (err, res) {
	console.log("Error: " + err);	// TODO: log error server-side
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

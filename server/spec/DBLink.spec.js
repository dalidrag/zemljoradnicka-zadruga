"use strict";

var mongoose = require( 'mongoose' );
var mongoDBConfig = require('../MongoDBTestConfig');

// Create the database connection
mongoose.connect(mongoDBConfig.dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function() {
	console.log('Mongoose default connection open to ' + mongoDBConfig.dbURI);
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


// Unit under test
var DBLink = require('../DBLink.js');

describe('DBLink object', () => {
	it('should exist', () => {
		expect(DBLink).toBeDefined();
	});

	describe('getUser method', () => {
		it('should exist', () => {
			expect(DBLink.getUser).toBeDefined();
		});
		// it('should return a Promise', () => {
		// 	expect(DBLink.getUser('') instanceof Promise).toBe(true);
		// });
		it('should return correct data from the test base', (done) => {
			DBLink.getUser('sample1')
			.then((data) => {
				expect(data.prebivaliste).toBe('Dobrica');
				done();
			})
			.catch((error) => {
				console.log(error);
				done();
			});
		});
	});

	describe('addUser method', () => {
		it('should exist', () => {
			expect(DBLink.addUser).toBeDefined();
		});
		// it('should return a Promise', () => {
		// 	expect(DBLink.addUser('') instanceof Promise).toBe(true);
		// });
		it('should add new user', (done) => {
			DBLink.addUser('noviUser')
			.then((dodatiUser) => {
				expect(dodatiUser._id).toBeDefined();
				done();
			})
			.catch(error => {
				console.log(error);
				done();
			});
		});
	});

	describe('getNjive method', () => {
		it('should exist', () => {
			expect(DBLink.getNjive).toBeDefined();
		});
		// it('should return a Promise', () => {
		// 	expect(DBLink.getNjive('') instanceof Promise).toBe(true);
		// });
		it('should return a Promise resolved to an array', (done) => {
			DBLink.getNjive('sample1')
			.then(njive => {
				expect(njive instanceof Array).toBe(true);
				done();
			})
		});
		it('should return a Promise resolved to MongoNjiva[]', (done) => {
			DBLink.getNjive('sample1')
			.then(njive => {
				expect(njive.length).toBe(1);
				done();
			})
		});
	});
	describe('addNjiva method', () => {
		it('should exist', () => {
			expect(DBLink.addNjiva).toBeDefined();
		});
		// it('should return a Promise', () => {
		// 	expect(DBLink.addNjiva('noviUser', null) instanceof Promise).toBe(true);
		// });
		it('should add njiva', (done) => {
			let novaNjiva = {
				ime: 'Prva njiva',
				klasa_zemljista: 5
			}
			DBLink.addNjiva('noviUser', novaNjiva)
			.then(dodataNjiva => {
				expect(dodataNjiva._id).toBeDefined();
				expect(dodataNjiva.ime).toBe('Prva njiva');
				done();
			})
			.catch(error => {
				console.log('Add njiva: ' + error);
				done();
			});
		});
	});
	describe('getSveNjive method', () => {
		it('should exist', () => {
			expect(DBLink.getSveNjive).toBeDefined();
		});
		// it('should return a promise', () => {
		// 	expect(DBLink.getSveNjive('') instanceof Promise).toBe(true);
		// });
		it('should return all njive', (done) => {
			DBLink.getSveNjive().then((sveNjive) => {
				expect(sveNjive.length).toBe(2);
				done();
			})
		});
	});
});

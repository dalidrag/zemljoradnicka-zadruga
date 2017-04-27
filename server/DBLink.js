"use strict";

var mongoose = require('mongoose');

var UserSchema = require('./MongoUser');
var UserModel = mongoose.model('User', UserSchema);
var NjivaSchema = require('./MongoNjiva');
var NjivaModel = mongoose.model('Njiva', NjivaSchema);
var SlikaMasineSchema = require("./MongoSlikaMasine");
var SlikaMasineModel = mongoose.model('SlikaMasine', SlikaMasineSchema);
var TipMasineSchema = require("./MongoTipMasine");
var TipMasineModel = mongoose.model('TipMasine', TipMasineSchema);
var MasinaSchema = require("./MongoMasina");
var MasinaModel = mongoose.model('Masina', MasinaSchema);
var InfoSchema = require("./MongoInfo");
var InfoModel = mongoose.model('Info', InfoSchema);

/**
* This class marshals CRUD operations against MongoDB Database
*
* @class DBLink //
*/
var DBLink = {
	/**
	 * Accepts a user name as a parameter and returns
	 * data of this user as a Promise
	 *
	 * @method getUser
	 * @param username
	 * @return {User}
	 */
		getUser: function (username) {
			return new Promise((resolve, reject) => {
				UserModel
					.findOne({username: username})
					.exec((err, foundUser) => {
						if (err) reject(err);
						else resolve(foundUser);
					});
				});
		},

/**
 * Create new user
 *
 * @method addUser
 * @param username
 * @return {Promise(UserModel)} returns newly created user as a Mongoose model
 */
 addUser: function(username) {
 	return new Promise((resolve, reject) => {
 		if (!username) reject("Prazan username");
 		else {
	 		UserModel.findOne({username:username}, (err, user) =>{
	 			if (err) reject(err);
	 			if (user) {
	 				reject("User name already exists.");
	 				return;
	 			}
		 		let newUser = new UserModel({
		 			username: username
		 		});
		 		newUser.save((err, addedUser) => {
		 			if (err) reject(err);
		 			resolve(addedUser);
		 		});
	 		});
	 	}
 	});
 },
 /**
 * Update existing user
 *
 * @method updateUser
 * @param updatedUser
 * @return {Promise(UserModel)} returns newly created user as a Mongoose model
 */ /*
 updateUser(updatedUser) {
 	return new Promise((reject, resolve) => {
 		if (!updatedUser) reject("Prazan user prosledjen kao argument");
 		else {
 			UserModel.findById(updatedUser._id, (err, foundUser) => {
 				if (err) reject(err);

 				foundUser.masine = updatedUser.masine;
 				foundUser.save((err, updatedUser) => {
				 	if (err) reject(err);
 					resolve(updatedUser);
 				});
 			});
 		}
 	});
 }, */

 /**
 * Vraca sve usere
 *
 * @method getAllUsers
 * @return {Promise<UserModel[]>}
 */
 // TODO: samo zadruge kojoj pripada dati korisnik
 getAllUsers() {
 	return new Promise((resolve, reject) => {
 			UserModel
 				.find({})
 				.exec((err, users) => {
 					if (err) reject(err);
 					resolve(users);
 				});

 	});
 },

	/**
	* Uzima korisnicko ime kao parametar i vraca
	* sve njive ovog korisnika
	*
	* @method getNjive
	* @param username
	* @return {MongoNjiva[]}
	*/
	getNjive: function (username) {
		return new Promise((resolve, reject) => {
				UserModel
					.findOne({'username': username})
					.exec((err, foundUser) => {
						if (err) reject(err);
						else {
							resolve(foundUser.njive)
						}
					});
				});
	},
/**
 * Dodaje novu njivu
 *
 * @method addNjiva
 * @param username
 * @param novaNjiva
 * @return {Promise<NjivaModel>}
 */
	addNjiva: function(username, novaNjiva) {
		var novaNjivaModel = new NjivaModel(novaNjiva);
		return new Promise((resolve, reject) => {
				if (!novaNjiva) reject("Njiva prazna");
				else {
					UserModel
						.findOne({'username': username})
						.exec((err, foundUser) => {
							if (err) reject(err);
							else {
								foundUser.njive.push(novaNjivaModel);
								foundUser.save((err, updatedUser) => {
									if (err) reject(err);
									resolve(updatedUser.njive[updatedUser.njive.length-1]);
								})
							}
						});
				}
		});
	},

	/* Provizorni metod */
	getSlikaMasine: function(idTipMasine) {
		return new Promise((resolve, reject) => {
			if (!idTipMasine) 
				reject(new ReferenceError("Parameter must be non-empty string"));
			TipMasineModel
			.findById(idTipMasine)
			.populate('slikaMasine')
			.exec((err, tipMasine) => {
				if (err) reject(err);
				// slikaMasine ce biti null ako ne postoji
				if (tipMasine) resolve(tipMasine.slikaMasine);
				else
					reject(new ReferenceError("Slika masine ne postoji"));
			});
		});
	},
 /**
  * Vraca sve tipove masina iz baze
  *
  * @method getTipoveMasina
  * @return Array[]
  */
	getTipoveMasina: function() {
		return new Promise((resolve, reject) => {
			TipMasineModel.find({}, (err, tipoviMasina) => {
				if (err) reject(err);
				resolve(tipoviMasina);
			});
		});
	},
	/**
  * Vraca sve masine datog user-a
  *
  * @param MongoUserId
  * @method getMasine
  * @return Array[MongoMasina]
  */
  getMasine(userName) {
  	return new Promise((resolve, reject) => {
  		UserModel.findOne({'username': userName}, (err, user) => {
  			if (err) reject(err);
  			resolve(user.masine);
  		});
  	});
  },
	/**
 * Dodaje novu masinu
 *
 * @method dodajMasinu
 * @param username
 * @param novaMasina
 * @return {Promise<MasinaModel>}
 */
	dodajMasinu: function(username, novaMasina) {
		var novaMasinaModel = new MasinaModel(novaMasina);
		return new Promise((resolve, reject) => {
			if (!novaMasina) reject("Masina prazna");
			else {
				UserModel
					.findOne({'username': username})
					.exec((err, foundUser) => {
						if (err) reject(err);
						else {
							TipMasineModel.findById(novaMasinaModel.tipMasine, (err, tipMasine) => {
								if (err) reject(err);

								novaMasinaModel.tipMasine = tipMasine;
								foundUser.masine.push(novaMasinaModel);
								foundUser.save((err, updatedUser) => {
									if (err) reject(err);
									resolve(updatedUser.masine[updatedUser.masine.length-1]);
								})
							})
						}
					});
			}
		});
	},
 /**
  * Accepts a query object and returns info for all DB objects
  * that match the query
  *
  *	@method getInfoTopics
  * @param queryObject	MongoDB will use this for searching
  * @return [infoPagesTopics]	All topics that match the query
  * @
	*/
	getInfoTopics(queryObject) {
		return new Promise((resolve, reject) => {
			InfoModel.find(queryObject, (err, infoPages) => {
				if (err) reject(err);
				var infoPagesTopics = infoPages.map(infoPage => {
					return {id: infoPage._id, naslov: infoPage.naslov}
				});
				resolve(infoPagesTopics);
			});
		});
	},
	getInfoHTML(id) {
		return new Promise((resolve, reject) => {
			InfoModel.findById(id, (err, infoPage) => {
				if (err) reject(err);
				resolve('<h1>' + infoPage.naslov + '</h1>' + infoPage.clanak);
			})
		});
	},
	addNewInfo(noviClanak) {
		return new Promise((resolve, reject) => {
			let clanakToSave = new InfoModel(noviClanak);
			clanakToSave.save(clanakToSave, (err, snimljeniClanak) => {
				if (err) reject(err);
				resolve(snimljeniClanak);
			});	
		});
	}
}
module.exports = DBLink;
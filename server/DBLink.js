"use strict";

var mongoose = require('mongoose');

var UserSchema = require('./MongoUser');
var UserModel = mongoose.model('User', UserSchema);
var NjivaSchema = require('./MongoNjiva');
var NjivaModel = mongoose.model('Njiva', NjivaSchema);

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
 * Vraca sve usere
 *
 * @method getAllUsers
 * @return {Promise<UserModel[]>}
 */
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
}
module.exports = DBLink;
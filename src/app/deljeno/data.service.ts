
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './tipovi-podataka/user';
import { VrstaUseva} from './tipovi-podataka/vrsta-useva';
import { TipMasine } from './tipovi-podataka/tip-masine';

import { Njiva } from './tipovi-podataka/njiva';
import { Aktivnost } from './tipovi-podataka/aktivnost';
import { Masina } from './tipovi-podataka/masina';

class DataCache {
	data = null;
	dirty = true;
}

/**
 * Omogucuje razmenu podataka sa HTTP serverom
 * Jedan metod rukuje svim eventualnim greskama
 *
 * @class DataService
 */
@Injectable()
export class DataService {
	private headers = new Headers({'Content-Type': 'application/json'});
	// URLs to web api
	private njiveUrl = 'http://localhost:3000/api/njive';
	private aktivnostiUrl = 'http://localhost:3000/api/aktivnosti';
	private masineUrl = 'http://localhost:3000/api/masine';
	private vrsteUsevaUrl = 'http://localhost:3000/api/vrsteUseva';
	private usersUrl = 'http://localhost:3000/api/users'
	private infoUrl = 'http://localhost:3000/api/info';
	
	njiveCache = new DataCache();
	aktivnostiCache = new DataCache();
	masineCache = new DataCache();
	
	usersCache = new DataCache();
	vrsteUsevaCache = new DataCache();
	tipoviMasinaCache = new DataCache();
  
  constructor(private http: Http) { }

  /**
	 * Vrati ulogovanog usera
	 *
	 * @method getUser
	 * @return {Promise<User>} Vraca user objekat kao Promise
	 */
	getUser() {
		if (!this.usersCache.dirty) {
			return Promise.resolve(this.usersCache.data);
		}
		else
			return this.http.get(this.usersUrl)
		  	             .toPromise()		// Because Angular http service returns observable
		  	             .then(response => {
		  	             		this.usersCache.data = response.json().data as User;
		  	             		this.usersCache.dirty = false;
		  	             		return response.json().data as User;
		  	             })
		  	             .catch(this.handleError)
	}

  /**
	 * Update user
	 *
	 * @method updateUser
	 * @return {Promise<boolean>} Vraca preuzete vrste useva kao Promise
	 */ /*
	 updateUser(user) {
	 			return this.http.put(this.usersUrl, JSON.stringify(user), {headers: this.headers})
	 		  	             .toPromise()		// Because Angular http service returns observable
	 		  	             .then(response => {
	 		  	             		this.usersCache.dirty = true;
	 		  	             		return response.json().data as User;
	 		  	             })
	 		  	             .catch(this.handleError)
	 } */

  /**
	 * Preuzima vrste useva
	 *
	 * @method preuzmiVrsteUseva
	 * @return {Promise<VrstaUseva[]>} Vraca preuzete vrste useva kao Promise
	 */
	preuzmiVrsteUseva() {
		if (!this.vrsteUsevaCache.dirty) {
			return Promise.resolve(this.vrsteUsevaCache.data);
		}
		else
			return this.http.get(this.vrsteUsevaUrl)
		  	             .toPromise()		// Because Angular http service returns observable
		  	             .then(response => {
		  	             		this.vrsteUsevaCache.data = response.json().data as VrstaUseva[];
		  	             		this.vrsteUsevaCache.dirty = false;
		  	             		return response.json().data as VrstaUseva[];
		  	             })
		  	             .catch(this.handleError)
	}

	/**
	 * Preuzima tipove masina
	 *
	 * @method preuzmiTipoveMasina
	 * @return {Promise<TipMasine[]>} Vraca preuzete tipova masina kao Promise
	 */
	preuzmiTipoveMasina() {
		if (!this.tipoviMasinaCache.dirty) {
			return Promise.resolve(this.tipoviMasinaCache.data);
		}
		return this.http.get(this.masineUrl + '/tipovi')
		  	             .toPromise()		// Because Angular http service returns observable
		  	             .then(response => {
		  	             		this.tipoviMasinaCache.data = response.json().data as TipMasine[];
		  	             		this.tipoviMasinaCache.dirty = false;
		  	             		return response.json().data as TipMasine[];
		  	             })
		  	             .catch(this.handleError)
	}

  /**
	 * Preuzima podatke o njivama prijavljenog clana zadruge
	 *
	 * @method preuzmiNjive
	 * @return {Promise<Njiva[]>} Vraca preuzete njive kao Promise
	 */
	preuzmiNjive() {
		if (!this.njiveCache.dirty) {
			return Promise.resolve(this.njiveCache.data);
		}
		return this.http.get(this.njiveUrl)
		  	             .toPromise()		// Because Angular http service returns observable
		  	             .then(response => {
		  	             		this.njiveCache.data = response.json().data as Njiva[];
		  	             		this.njiveCache.dirty = false;
		  	             		return response.json().data as Njiva[];
		  	             })
		  	             .catch(this.handleError)
	}

	/**
	 * Dodaje novu njivu
	 *
	 * @method dodajNjivu
	 * @param novaNjiva Njiva koju treba dodati
	 * @return {Promise<Njiva>} Dodata njiva kao Promise; id polje je automatski dodato
	 */
	dodajNjivu(novaNjiva: Njiva): Promise<Njiva> {
		return this.http
			.post(this.njiveUrl, JSON.stringify(novaNjiva), {headers: this.headers})
			.toPromise()
			.then(response => {
				this.njiveCache.dirty = true;
				return response.json().data as Njiva
			})
			.catch(this.handleError);
	}

	/**
	 * Azurira postojecu njivu
	 *
	 * @method azurirajNjivu
	 * @param azuriranaNjiva Novi sadzaj njive
	 * @return {Promise<any>}
	 */
	azurirajNjivu(azuriranaNjiva: Njiva): Promise<any> {
		return this.http
			.put(this.njiveUrl + '/' + azuriranaNjiva.id, JSON.stringify(azuriranaNjiva), {headers: this.headers})
			.toPromise()
			.then(response => {
				this.njiveCache.dirty = true;
				return response;
			})
			.catch(this.handleError);
	}

/**
	 * Preuzima sve masine prijavljenog clana zadruge
	 *
	 * @method preuzmiMasine
	 * @return {Promise<Masina[]>} Vraca preuzete masine kao Promise
	 */
	preuzmiMasine() {
		if (!this.masineCache.dirty) {
			return Promise.resolve(this.masineCache.data);
		}
		return this.http.get(this.masineUrl)
		  	             .toPromise()		// Because Angular http service returns observable
		  	             .then(response => {
		  	             		this.masineCache.data = response.json().data as Masina[];
		  	             		this.masineCache.dirty = false;
		  	             		return response.json().data as Masina[];
		  	             })
		  	             .catch(this.handleError)
	}
	/**
	 * Dodaje novu masinu
	 *
	 * @method dodajMasinu
	 * @param novaMasina Masina koju treba dodati
	 * @return {Promise<Masina>} Dodata masina kao Promise; id polje je automatski dodato
	 */
	dodajMasinu(novaMasina: Masina): Promise<Masina> {
		return this.http
			.post(this.masineUrl, JSON.stringify(novaMasina), {headers: this.headers})
			.toPromise()
			.then(response => {
				this.masineCache.dirty = true;
				return response.json().data as Masina
			})
			.catch(this.handleError);
	}

	/**
	 * Preuzima sve aktivnosti prijavljenog clana zadruge
	 *
	 * @method preuzmiAktivnosti
	 * @return {Promise<Aktivnost[]>} Vraca preuzete aktivnosti kao Promise
	 */
	 preuzmiAktivnosti() {
	 	if (!this.aktivnostiCache.dirty) {
			return Promise.resolve(this.aktivnostiCache.data);
		}
	 	return this.http.get(this.aktivnostiUrl)
	 	  	             .toPromise()		// Because Angular http service returns observable
	 	  	             .then(response => {
	 	  	             		this.aktivnostiCache.data = response.json().data as Aktivnost[];
		  	             		this.aktivnostiCache.dirty = false;
	 	  	             		return response.json().data as Aktivnost[];
	 	  	             })
	 	  	             .catch(this.handleError)
	 }

	 /**
	 * Dodaje aktivnost
	 *
	 * @method dodajAktivnost
	 * @param novaAktinovst Aktivnost koju treba dodati
	 * @return {Promise<Aktivnost>} Dodata aktivnost kao Promise; id polje je automatski dodato
	 */
	dodajAktivnost(novaAktivnost: Aktivnost): Promise<Aktivnost> {
		return this.http
			.post(this.aktivnostiUrl, JSON.stringify(novaAktivnost), {headers: this.headers})
			.toPromise()
			.then(response => {
				this.aktivnostiCache.dirty = true;
				return response.json().data as Aktivnost
			})
			.catch(this.handleError);
	}

	vratiTeme(query): Promise<any> {
		return this.http
			.post(this.infoUrl + '/getTopics', JSON.stringify(query), {headers: this.headers})
			.toPromise()
			.then(response => response.json().data)
			.catch(this.handleError);
	}
	vratiHTMLTeme(id): Promise<string> {
		return this.http
			.get(this.infoUrl + '/getHTML/' + id)
			.toPromise()
			.then(response => response.json().data)
			.catch(this.handleError);
	}

	clearCache() {
		this.njiveCache.dirty = true;
		this.aktivnostiCache.dirty = true;
		this.masineCache.dirty = true;
		this.vrsteUsevaCache.dirty = true;
		this.tipoviMasinaCache.dirty = true;
	}

	private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error.statusText || error);
  }
}

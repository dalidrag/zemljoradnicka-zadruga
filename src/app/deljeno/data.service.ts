import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Njiva } from './tipovi-podataka/njiva';
import { Aktivnost } from './tipovi-podataka/aktivnost';
import { VrstaUseva} from './tipovi-podataka/vrsta-useva';
import { TipMasine } from './tipovi-podataka/tip-masine';
import { Masina } from './tipovi-podataka/masina';

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
	private njiveUrl = 'http://localhost:4200/api/njive';
	private aktivnostiUrl = 'http://localhost:4200/api/aktivnosti';
	private vrsteUsevaUrl = 'http://localhost:4200/api/vrsteUseva';
	private tipoviMasinaUrl = 'http://localhost:4200/api/tipoviMasina';
	private masineUrl = 'http://localhost:4200/api/masine';
  
  constructor(private http: Http) { }

  /**
	 * Preuzima vrste useva
	 *
	 * @method preuzmiVrsteUseva
	 * @return {Promise<VrstaUseva[]>} Vraca preuzete vrste useva kao Promise
	 */
	preuzmiVrsteUseva() {
		return this.http.get(this.vrsteUsevaUrl)
		  	             .toPromise()		// Because Angular http service returns observable
		  	             .then(response => {
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
		return this.http.get(this.tipoviMasinaUrl)
		  	             .toPromise()		// Because Angular http service returns observable
		  	             .then(response => {
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
		return this.http.get(this.njiveUrl)
		  	             .toPromise()		// Because Angular http service returns observable
		  	             .then(response => {
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
		return this.http.get(this.masineUrl)
		  	             .toPromise()		// Because Angular http service returns observable
		  	             .then(response => {
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
	 	return this.http.get(this.aktivnostiUrl)
	 	  	             .toPromise()		// Because Angular http service returns observable
	 	  	             .then(response => {
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
				return response.json().data as Aktivnost
			})
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error.statusText || error);
  }
}

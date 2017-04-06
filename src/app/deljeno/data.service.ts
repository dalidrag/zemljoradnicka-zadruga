import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Njiva } from './tipovi-podataka/njiva';

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
  
  constructor(private http: Http) { }

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

	private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error.statusText || error);
  }
}

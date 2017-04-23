import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { DataService } from './data.service';
/**
 * Sadrzi metode vezane za autentifikaciju, kao sto je
 * ulogujSe() ili ulogovan()
 *
 * @class AuthService
 */
@Injectable()
export class AuthService {
  private authUrl = 'http://localhost:3000/api/';
	private headers = new Headers({'Content-Type': 'application/json'});
  public userId = '';

  constructor(private http: Http, private dataService: DataService) { }

  /**
	 * Pokusava da se prijavi
	 *
	 * @method prijaviSe
   * @param username String
	 * @return {Promise<boolean>} true ako je prijavljivanje uspelo, inace false
   */
  prijaviSe(username: string): Promise<boolean> {
  	return this.http
      .post(this.authUrl + 'login', JSON.stringify({username: username}), {headers: this.headers})
      .toPromise()    // Because Angular http service returns observable
      .then(response => {
        if (response.json().userId) {
          this.userId = response.json().userId;
          return true;
        }
        else
          return false;
      })                                                  
      .catch(this.handleError);  // a single method deals with error in this class
  }

  /**
   * Tries to log out a user
   *
   * @method logout
   * @return {Promise<boolean>} Will resolve to true if log out succeeded
   */
  logout(): Promise<boolean> {
    return this.http.get(this.authUrl + 'logout')
            .toPromise()
            .then(response => {
              if (response.json().ok === 'true') {
                  this.userId = '';
                  this.dataService.clearCache();
                  return true;
              }
               else return false;
            })
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error.statusText || error);
  }
}

import { Injectable } from '@angular/core';

/**
 * Sadrzi metode vezane za autentifikaciju, kao sto je
 * ulogujSe() ili ulogovan()
 *
 * @class AuthService
 */
@Injectable()
export class AuthService {
	prijavljenost = false;

  constructor() { }

  /**
	 * Pokusava da se prijavi
	 *
	 * @method prijaviSe
	 * @return {boolean} true ako je prijavljivanje uspelo, inace false
   */
  prijaviSe(): boolean {
  	this.prijavljenost = true;
  	return true;
  }

  /**
	 * Pokusava da se odjavi
	 *
	 * @method odjaviSe
	 * @return {boolean} true ako je odjavljivanje uspelo, inace false
   */
  odjaviSe(): boolean {
  	this.prijavljenost = false;
  	return true;
  }

  /**
	 * Proverava da li smo prijavljeni
	 *
	 * @method prijavljen
	 * @return {boolean} true ako smo prijavljeni, inace false
   */
  prijavljen(): boolean {
  	return this.prijavljenost;
  }
}

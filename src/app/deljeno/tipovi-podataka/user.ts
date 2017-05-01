import { Njiva } from './njiva';
import { Masina } from './masina';

/**
 * User kolekcija
 *
 * @class User
 */
export class User {
	_id: string;
	username: string;
	imeIPrezime: string;
	njive: Array<Njiva>;
	masine: Array<Masina>;
	/* Aktivnosti - (1),
		Skladista, Djubrivo, Pesticidi, Ostala imovina -  svi Array.
		Zabeleske - Array, deo Clana Zadruge u MongoDB-u. */
}
/**
 * Usev je deo strukture Njiva
 *
 * @class Usev
 */
export class Usev {
	id: string;
	vrsta_useva: string; // TODO: bice referenca na vrstu useva
	kolicina_useva: number; // kg po aru
	datum_sejanja: Date;
	ocekivani_datum_prinosa: Date;
	ocekivani_prinos: number; // kg po aru
}
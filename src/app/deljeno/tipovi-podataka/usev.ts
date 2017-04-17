/**
 * Usev je deo strukture Njiva
 *
 * @class Usev
 */
export class Usev {
	id: string;
	vrsta_useva: string; // referenca na vrstu useva (id)
	kolicina_useva: number; // kg po aru
	datum_sejanja: Date;
	ocekivani_datum_prinosa: Date;
	ocekivani_prinos: number; // kg po aru
}
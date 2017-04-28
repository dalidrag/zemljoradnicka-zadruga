/**
 * Usev je deo strukture Njiva
 *
 * @class Usev
 */
export class Usev {
	id: string;
	vrstaUseva: string; // referenca na vrstu useva (id)
	kolicinaUseva: number; // kg po aru
	datumSejanja: Date;
	ocekivaniDatumPrinosa: Date;
	ocekivaniPrinos: number; // kg po aru
}
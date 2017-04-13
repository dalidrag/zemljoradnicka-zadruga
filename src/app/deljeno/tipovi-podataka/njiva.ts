import { Usev } from './usev';

/**
 * Osnovni tip imovine
 *
 * @class Njiva
 */
export class Njiva {
	id: string;
	oblikNaMapi = [];
	ime: string;
	katOpstina: string;
	klasaZemljista: number;
	usevi: Array<Usev> = [];
}
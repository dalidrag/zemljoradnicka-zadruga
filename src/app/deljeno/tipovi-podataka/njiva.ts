import { Usev } from './usev';

/**
 * Osnovni tip imovine
 *
 * @class Njiva
 */
export class Njiva {
	_id: string;
	oblikNaMapi = [];
	ime: string;
	katOpstina: string;
	katBroj: string;
	osnovKoriscenja: number; // 1-vlasnistvo, 2-zakup zemljista
	povrsina: number;
	tipZemljista: string;
	klasaZemljista: number;
	pH_KCI: number;		// %
	pH_H20: number;
	humus: number;
	CaCO3: number;
	N: number;
	AI_P2O5: number;
	AI_K20: number;
	usevi: Array<Usev> = [];
}
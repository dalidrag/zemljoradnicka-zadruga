/**
 * Genericki tip koji pokriva sve vrste aktivnosti
 *
 * @class Aktivnost
 */
export class Aktivnost {
	id: string;
	tip: string;
	// Mete su reference prema imovini koja je deo aktivnosti
	// Najivse pet; ako to nije dovoljno onda je aktivnost isuvise slozena
	// i korisnik treba da je razbije na vise manjih aktivnosti
	// ovo se moze desiti samo kod korisnicki definisanih aktivnosti	
	// jer sve ugradjene aktivnosti ne koriste vise od pet imovinskih objekata
	meta1: any;
	meta2: any;
	meta3: any;
	meta4: any;
	meta5: any;
}
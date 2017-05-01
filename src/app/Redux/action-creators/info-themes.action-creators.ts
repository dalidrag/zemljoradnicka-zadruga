import { Inject } from '@angular/core';
import { Store } from 'redux';
import { IAppState } from '../index';

export class InfoThemesActionCreators {
	constructor(@Inject('AppStore') private appStore: Store<IAppState>) { }

	static PRIKAZI_INFO = 'PRIKAZI_INFO';
	static UKLONI_INFO = 'UKLONI_INFO';
	static DODAJ_TEMU = 'DODAJ_TEMU';

	prikaziInfoPages(infoThemes: Array<any>, coords: ClientRect, query: any) {
		this.appStore.dispatch({
			type: InfoThemesActionCreators.PRIKAZI_INFO,
			infoThemes: infoThemes,	// teme clanaka
			coords: coords,					// ekranske koordinate gde ce pop up biti prikazan
			query: query	// DB query je potreban jer pop up komponenta sadzri opciju za dodavanje nove teme
		});
	}
	ukloniInfoPages() {
		this.appStore.dispatch({
			type: InfoThemesActionCreators.UKLONI_INFO
		});
	}
	dodajTemu(query: any) {
		this.appStore.dispatch({
			type: InfoThemesActionCreators.DODAJ_TEMU,
			query: query
		});
	}
}
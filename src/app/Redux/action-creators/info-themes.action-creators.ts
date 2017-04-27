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
			infoThemes: infoThemes,
			coords: coords,
			query: query
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
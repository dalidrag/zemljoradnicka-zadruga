import { Inject } from '@angular/core';
import { Store } from 'redux';
import { IAppState } from '../index';

export class InfoThemesActionCreators {
	constructor(@Inject('AppStore') private appStore: Store<IAppState>) { }

	static PRIKAZI_INFO = 'PRIKAZI_INFO';
	static UKLONI_INFO = 'UKLONI_INFO';

	prikaziInfoPages(infoThemes: Array<any>, coords: ClientRect) {
		this.appStore.dispatch({
			type: InfoThemesActionCreators.PRIKAZI_INFO,
			infoThemes: infoThemes,
			coords: coords
		});
	}
	ukloniInfoPages() {
		this.appStore.dispatch({
			type: InfoThemesActionCreators.UKLONI_INFO
		});
	}
}
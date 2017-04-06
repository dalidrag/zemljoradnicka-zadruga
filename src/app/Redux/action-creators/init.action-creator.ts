import { Inject } from '@angular/core';
import { Store } from 'redux';
import { IAppState } from '../index';

/**
 * Sluzi da inicijalizuje Redux state manager
 * Okinuce default u svim reducer switch-evima
 * i tako jednostavno vratiti inicijalno stanje svih reducera
 *
 * @class InitActionCreator
 */
export class InitActionCreator {
	constructor(@Inject('AppStore') private appStore: Store<IAppState>) { }

	inicijalizuj() {
		this.appStore.dispatch({
			type: 'inicijalizacija'
		});
	}
}
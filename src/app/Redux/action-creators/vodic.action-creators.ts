import { Inject } from '@angular/core';
import { Store } from 'redux';
import { IAppState } from '../index';

export class VodicActionCreators {
	constructor(@Inject('AppStore') private appStore: Store<IAppState>) { }

	static IMANJE = 'IMANJE';
	static AKTIVNOSTI = 'AKTIVNOSTI';

	imanje() {
		this.appStore.dispatch({
			type: VodicActionCreators.IMANJE
		});
	}
	aktivnosti() {
		this.appStore.dispatch({
			type: VodicActionCreators.AKTIVNOSTI
		});
	}
}
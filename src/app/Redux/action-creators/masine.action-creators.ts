import { Inject } from '@angular/core';
import { Store } from 'redux';
import { IAppState } from '../index';

export class MasineActionCreators {
	constructor(@Inject('AppStore') private appStore: Store<IAppState>) { }

	static NOVA_MASINA = 'NOVA_MASINA';
	static NOVA_MASINA_PRIKAZANA = 'NOVA_MASINA_PRIKAZANA';

	novaMasina(novaMasinaId: string) {
		this.appStore.dispatch({
			type: MasineActionCreators.NOVA_MASINA,
			novaMasinaId: novaMasinaId
		});
	}
	novaMasinaPrikazana() {
		this.appStore.dispatch({
			type: MasineActionCreators.NOVA_MASINA_PRIKAZANA
		});
	}
}
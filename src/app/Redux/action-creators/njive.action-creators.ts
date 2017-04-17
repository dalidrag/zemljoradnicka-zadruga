import { Inject } from '@angular/core';
import { Store } from 'redux';
import { IAppState } from '../index';

export class NjiveActionCreators {
	constructor(@Inject('AppStore') private appStore: Store<IAppState>) { }

	static NOVA_NJIVA = 'NOVA_NJIVA';
	static NOVA_NJIVA_PRIKAZANA = 'NOVA_NJIVA_PRIKAZANA';
	static NOVI_USEV = 'NOVI_USEV';
	static NOVI_USEV_PRIKAZAN = 'NOVI_USEV_PRIKAZAN';

	novaNjiva(novaNjivaId: string) {
		this.appStore.dispatch({
			type: NjiveActionCreators.NOVA_NJIVA,
			novaNjivaId: novaNjivaId
		});
	}
	novaNjivaPrikazana() {
		this.appStore.dispatch({
			type: NjiveActionCreators.NOVA_NJIVA_PRIKAZANA
		});
	}
	noviUsev(noviUsevId: string) {
		this.appStore.dispatch({
			type: NjiveActionCreators.NOVI_USEV,
			noviUsevId: noviUsevId
		});
	}
	noviUsevPrikazan() {
		this.appStore.dispatch({
			type: NjiveActionCreators.NOVI_USEV_PRIKAZAN
		});
	}
}
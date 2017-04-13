import { Inject } from '@angular/core';
import { Store } from 'redux';
import { IAppState } from '../index';

export class VodicActionCreators {
	constructor(@Inject('AppStore') private appStore: Store<IAppState>) { }

	static IMANJE = 'IMANJE';
	static AKTIVNOSTI = 'AKTIVNOSTI';
	static GRAFIKONI = 'GRAFIKONI';
	static ZABELESKE = 'ZABELESKE';
	static LOGO = 'LOGO';
	static KORISNIK = 'KORISNIK';
	static KRAJ = 'KRAJ';
	static ZAVRSI = 'ZAVRSI';

	static GMAPSZOOM = 'GMAPSZOOM';
	
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
	grafikoni() {
		this.appStore.dispatch({
			type: VodicActionCreators.GRAFIKONI
		})
	}
	zabeleske() {
		this.appStore.dispatch({
			type: VodicActionCreators.ZABELESKE
		})
	}
	logo() {
		this.appStore.dispatch({
			type: VodicActionCreators.LOGO
		})
	}
	korisnik() {
		this.appStore.dispatch({
			type: VodicActionCreators.KORISNIK
		})
	}
	kraj() {
		this.appStore.dispatch({
			type: VodicActionCreators.KRAJ
		})
	}
	zavrsi() {
		this.appStore.dispatch({
			type: VodicActionCreators.ZAVRSI
		})
	}
	gMapsZoom() {
		this.appStore.dispatch({
			type: VodicActionCreators.GMAPSZOOM
		})
	}
}
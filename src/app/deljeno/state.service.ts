import { Injectable, Inject } from '@angular/core';

import { Store } from 'redux';
import { IAppState } from '../Redux/index';

import { InitActionCreator } from '../Redux/action-creators/init.action-creator';

/**
 * Reaguje na promene Redux storea i nudi public properties
 * iz kojih ostale komponente mogu videti ove promene
 * Mnogo bolje nego da komponente same osluskuju Store 
 *
 * @class StateService
 */
@Injectable()
export class StateService {
	public state: any;

  constructor(@Inject('AppStore') private appStore: Store<IAppState>, private initActionCreator: InitActionCreator) { }

  inicijalizuj() {
  	//subscribe to Redux store state changes
  	this.appStore.subscribe(() => {
  	  this.state = this.appStore.getState();
  	});
  	// Okini akciju koja ce jednostavno inicijalizovati Redux store
  	this.initActionCreator.inicijalizuj();
  }
}

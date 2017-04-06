import { Injectable, Inject } from '@angular/core';

import { Store } from 'redux';
import { IAppState } from '../Redux/index';

/**
 * Reaguje na promene Redux storea i nudi public properties
 * iz kojih ostale komponente mogu videti ove promene
 * Mnogo bolje nego da komponente same osluskuju Store 
 *
 * @class StateService
 */
@Injectable()
export class StateService {
	public novaNjivaId: string = '0';

  constructor(@Inject('AppStore') private appStore: Store<IAppState>) { }

  inicijalizuj() {
  	//subscribe to Redux store state changes
  	this.appStore.subscribe(() => {
  	  let state = this.appStore.getState();
  	  this.novaNjivaId = state.njive.novaNjivaId;
  	});
  }
}

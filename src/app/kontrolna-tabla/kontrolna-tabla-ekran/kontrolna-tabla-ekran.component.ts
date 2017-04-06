import { Component, OnInit, Inject } from '@angular/core';

import { Store } from 'redux';
import { IAppState } from '../../Redux/index';

import { VodicActionCreators } from '../../Redux/action-creators/vodic.action-creators';

/**
 * Sadrzi ekran kontrolna tabla
 *
 * @class KontrolnaTablaEkranComponent
 */
@Component({
  selector: 'app-kontrolna-tabla-ekran',
  templateUrl: './kontrolna-tabla-ekran.component.html',
  styleUrls: ['./kontrolna-tabla-ekran.component.css']
})
export class KontrolnaTablaEkranComponent implements OnInit {
	unsubsribeStore;

  constructor(@Inject('AppStore') private appStore: Store<IAppState>, private vodicActionCreators: VodicActionCreators) { }

  ngOnInit() {
  	this.unsubsribeStore = this.appStore.subscribe(() => {
  	  let state = this.appStore.getState();
  	  let faza = state.vodic.faza;

  	  switch (faza) {
  	  	case 1:
  	  		window.confirm('Имање је фина опција.');
  	  		this.vodicActionCreators.aktivnosti();
  	  		break;
  	  	case 2:
  	  		window.confirm('Активности су кул.');
  	  		break;
  	  }
  	});
  	this.vodicActionCreators.imanje();
  }

}

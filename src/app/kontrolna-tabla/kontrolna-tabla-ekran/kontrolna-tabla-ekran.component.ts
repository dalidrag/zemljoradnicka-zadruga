/***********************************************************************************/
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';

import { Store } from 'redux';
import { IAppState } from '../../Redux/index';
import { VodicActionCreators } from '../../Redux/action-creators/vodic.action-creators';

import { User } from '../../deljeno/tipovi-podataka/user';
/***********************************************************************************/

/**
 * Sadrzi ceo ekran kontrolna tabla
 *
 * @class KontrolnaTablaEkranComponent
 */
@Component({
  selector: 'app-kontrolna-tabla-ekran',
  templateUrl: './kontrolna-tabla-ekran.component.html',
  styleUrls: ['./kontrolna-tabla-ekran.component.css']
})
export class KontrolnaTablaEkranComponent implements OnInit {
  user: User;
  vodicFaza: number;  // sadrzi redni broj faze pomoc-vodica, 0 ako je deaktiviran
	unsubscribe;
	unsubsribeStore;

  constructor(@Inject('AppStore') private appStore: Store<IAppState>, private vodicActionCreators: VodicActionCreators, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.unsubsribeStore = this.appStore.subscribe(() => {
  	  let state = this.appStore.getState();
  	  this.vodicFaza = state.vodic.faza;
  	});

    this.unsubscribe = this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
		});

		if (this.route.snapshot.queryParams['vodic'] === 'true') {
			this.vodicActionCreators.imanje();
		  this.router.navigate(['/kontrolna-tabla', 'imovina', {outlets: {'njive': ['njive-prikaz'], 'masine': ['masine-prikaz']}}]);
		}
  }

  vodicAktivnosti() {
    this.vodicActionCreators.aktivnosti();
    this.router.navigate(['/kontrolna-tabla', 'akcije', {outlets: { 'akcije-njive':['akcije-meni-njive'], 'akcije-masine':['akcije-meni-masine']}}]);
  }

  vodicGrafikoni() {
    this.vodicActionCreators.grafikoni();
    this.router.navigate(['/kontrolna-tabla', 'grafikoni']);
  }

  vodicZabeleske() {
    this.vodicActionCreators.zabeleske();
    this.router.navigate(['/kontrolna-tabla', 'zabeleske']);
  }

  vodicZadruga() {
    this.vodicActionCreators.logo();
    this.router.navigate(['/kontrolna-tabla']);
  }

  vodicKorisnik() {
    this.vodicActionCreators.korisnik();
  }

  vodicKraj() {
    this.vodicActionCreators.kraj();
    this.router.navigate(['/kontrolna-tabla', 'imovina', {outlets: {'njive': ['njive-prikaz'], 'masine': ['masine-prikaz']}}]);
  }

  vodicZavrsi() {
    this.vodicActionCreators.zavrsi();
  }

  //TODO
  // ngOnDestroy
}

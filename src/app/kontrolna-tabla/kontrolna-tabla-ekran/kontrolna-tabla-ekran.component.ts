/***********************************************************************************/
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';

import { Store } from 'redux';
import { IAppState } from '../../Redux/index';
import { VodicActionCreators } from '../../Redux/action-creators/vodic.action-creators';
import { InfoThemesActionCreators } from '../../Redux/action-creators/info-themes.action-creators';

import { User } from '../../deljeno/tipovi-podataka/user';
/***********************************************************************************/

/**
 * Sadrzi ceo ekran kontrolne table
 *
 * @class KontrolnaTablaEkranComponent
 */
@Component({
  selector: 'app-kontrolna-tabla-ekran',
  templateUrl: './kontrolna-tabla-ekran.component.html',
  styleUrls: ['./kontrolna-tabla-ekran.component.css']
})
export class KontrolnaTablaEkranComponent implements OnInit, OnDestroy {
  user: User;
  vodicFaza: number;  // sadrzi redni broj faze pomoc-vodica, 0 ako je deaktiviran
	infoThemes: Array<any> = [];
  coords: ClientRect;
  themeId: string;
  unsubscribe;
	unsubsribeStore;

  constructor(@Inject('AppStore') private appStore: Store<IAppState>, private infoThemesActionCreators: InfoThemesActionCreators, private vodicActionCreators: VodicActionCreators, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.unsubsribeStore = this.appStore.subscribe(() => {
  	  let state = this.appStore.getState();
      
      // Za pop up koji prikazuje listu naslova clanaka
      this.infoThemes = state.infoThemes.infoThemes;
      this.coords = state.infoThemes.coords;

      // Za vodic koji se prikazuje kada se korisnik prvi put susrece sa aplikacijom
  	  this.vodicFaza = state.vodic.faza;
  	});

    // Ucitaj sve podatke o korisniku
    this.unsubscribe = this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
		});

    // Ako ruta sardzi "?vodic=true" parametar, zapocni sa vodicem kroz kontrolnu tablu
		if (this.route.snapshot.queryParams['vodic'] === 'true') {
			this.vodicActionCreators.imanje();
		  this.router.navigate(['/kontrolna-tabla', 'imovina', {outlets: {'njive': ['njive-prikaz'], 'masine': ['masine-prikaz']}}]);
		}
  }

 /**
  * Prikazuje modalni prozor sa prikazanom izabranom temom
  *
  * @method infoPrikaz
  * @param themeId String koji identifikuje temu za prikaz
  */
  infoPrikaz(themeId: string) {
    this.themeId = themeId;
  }
/**
  * Sklanja prikazanu info temu
  *
  * @method ukloniInfo
  */
  ukloniInfo() {
    this.themeId = "";
  }

/**
  * Uklanja pop up sa listom naslova tema
  *
  * @method skloniPopUp
  */
  skloniPopUp() {
    this.infoThemesActionCreators.ukloniInfoPages();
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

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
    this.unsubsribeStore();
  }
}

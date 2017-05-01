/************************************************************************/
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'

import { NjiveActionCreators } from '../../../Redux/action-creators/njive.action-creators';

import { Njiva } from '../../../deljeno/tipovi-podataka/njiva';

import { DodajNjivuMapComponent } from '../../../gmaps/dodaj-njivu-map/dodaj-njivu-map.component';

import { DataService } from '../../../deljeno/data.service';
import { StateService } from '../../../deljeno/state.service';
import { ModalPopupService } from '../../../deljeno/modal-popup.service';
import { UtilitiesService } from '../../../deljeno/utilities.service';
import { NotificationHubService, HubNotificationType } from '../../../deljeno/event-hub.service';
/************************************************************************/

/**
 * Komponenta za dodavanje njive. Sastoji se od dva dela: pod-komponente za
 * crtanje njive na mapi, i HTML forme za unosenje ostalih informacija o njivi
 *
 * @class DodajNjivuComponent
 */

@Component({
  selector: 'app-dodaj-njivu',
  templateUrl: './dodaj-njivu.component.html',
  styleUrls: ['./dodaj-njivu.component.css']
})
export class DodajNjivuComponent implements OnInit, OnDestroy {
	dodajNjivuForma: FormGroup;
  @Output() onNjivaDodata = new EventEmitter<boolean>();
  njivaCoords = [];
  njive: Njiva[];

  vodicFaza = 0;
  unsubscribe;

  constructor(public actionCreators: NjiveActionCreators, private stateService: StateService,
              private fb: FormBuilder, private dataService: DataService,
              private router: Router, private route: ActivatedRoute,
              private utilitiesService: UtilitiesService, private notificationHubService: NotificationHubService,
              private modalPopupService: ModalPopupService) { }

  ngOnInit() {
  	this.unsubscribe = this.route.data.subscribe((data: { njive: Njiva[] }) => {
      this.njive = data.njive;
    });

    this.notificationHubService.emit(HubNotificationType.AppState, 'Додавање њиве');
    
    this.vodicFaza = this.stateService.state.vodic.faza;

    this.dodajNjivuForma = this.fb.group({  
  		'ime': ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
  		'katOpstina': ['',  Validators.compose([Validators.required, Validators.maxLength(30)])],
      'katBroj': [''],
      'osnovKoriscenja': [''],
      'ha': [0], 'ar': [0], 'm2': [0],
  		'tipZemljista': [''],
      'klasaZemljista': [''], // TODO: Write custom validator for number range 1-8
      'pH_KCI': [''],
      'pH_H20': [''],
      'humus': [''],
      'CaCO3': [''],
      'N': [''],
      'AI_P2O5': [''],
      'AI_K20': ['']
    });
    // TODO: dodaj katastarski broj polja

    // Dodaje svakom input elementu logiku koja preko CSS klase
    // cuva podatak o tome da li polje sadrzi neki tekst
    [].slice.call( document.querySelectorAll('input.input__field') ).forEach((inputEl) => {
      // ako je input polje vec popunjeno..
      if (inputEl.value.trim() !== '') {
        inputEl.classList.add('input--filled');
      }
      // events:
      inputEl.addEventListener('focus', this.onInputFocus);
      inputEl.addEventListener('blur', this.onInputBlur);
    });
  }

  vodicCrtanjeMape() {
    this.vodicFaza = 11;
  }
  pocniSaCrtanjem() {
    this.vodicFaza = 0; 
  }
  /**
	 * Nakon sto je njiva iscrtana, prikazuje formu za unosenje ostalih podataka
	 *
	 * @param oblikNjiveNaMapi Gmaps poligon koji predstavlja njivu na mapi
	 * @method onShapeDrawn
   */
  onShapeDrawn(nacrtanaNjiva) {
  	if (nacrtanaNjiva.oblikNjiveNaMapi) {
  		nacrtanaNjiva.oblikNjiveNaMapi.getPath().forEach((element) => {
  			this.njivaCoords.push([element.lat(), element.lng()]);
  		});

  		// Popuni input polja za povrsinu polja
      let povrsinaUHa = this.utilitiesService.m2toha(nacrtanaNjiva.area);
      let haEl = document.getElementById('ha') as HTMLInputElement;
      haEl.value = povrsinaUHa.ha;
      haEl.classList.add('input--filled');
      haEl.dispatchEvent(new Event('input'));
      let arEl = document.getElementById('ar') as HTMLInputElement;
      arEl.value = povrsinaUHa.ar;
      arEl.classList.add('input--filled');
      arEl.dispatchEvent(new Event('input'));
      let m2El = document.getElementById('m2') as HTMLInputElement;
      m2El.value = povrsinaUHa.m2;
      m2El.classList.add('input--filled');
      m2El.dispatchEvent(new Event('input'));
      // prikazi formu
      let forma = document.getElementsByTagName('form')[0] as HTMLElement;
  		forma.style.display = 'block';  

      // skroluj formu u vidno polje
      let inputEl = document.getElementById('ime-njive') as HTMLElement;
      inputEl.scrollIntoView({behavior: "smooth", block: "start"});
  	}
  }

  /**
	 * Upisuje pokupljene vrednosti iz forme u bazu podataka
	 *
	 * @param formValues
	 * @method onSubmit
	 */
	onSubmit(formValues: any): void { 
		let novaNjiva = new Njiva();
		novaNjiva.ime = formValues.ime;
    novaNjiva.katOpstina = formValues.katOpstina;
    novaNjiva.katBroj = formValues.katBroj;
    novaNjiva.osnovKoriscenja = formValues.osnovKoriscenja;
    novaNjiva.povrsina = formValues.ha * 10000 + formValues.ar * 100 + formValues.m2;
    novaNjiva.tipZemljista = formValues.tipZemljista;
    novaNjiva.klasaZemljista = formValues.klasaZemljista;
    novaNjiva.pH_KCI = formValues.pH_KCI;
    novaNjiva.pH_H20 = formValues.pH_H20;
    novaNjiva.humus = formValues.humus;
    novaNjiva.CaCO3 = formValues.CaCO3;
    novaNjiva.N = formValues.N;
    novaNjiva.AI_P2O5 = formValues.AI_P2O5;
    novaNjiva.AI_K20 = formValues.AI_K20;
    novaNjiva.oblikNaMapi = this.njivaCoords;

    this.dataService.dodajNjivu(novaNjiva).then((dodataNjiva) => {
			this.notificationHubService.emit(HubNotificationType.AppState, 'logo');
      this.notificationHubService.emit(HubNotificationType.Success, 'Додата нова њива');
			this.actionCreators.novaNjiva(dodataNjiva._id);
			this.router.navigate(['/kontrolna-tabla', 'imovina', {outlets: {'njive': ['njiva-prikaz', dodataNjiva._id]}}]);
      this.onNjivaDodata.emit(true);
		})
		.catch(error => this.utilitiesService.handleError(error));
	}

  // Sledeca dva metoda su potrebna zbog specijalnih efekata nad input poljima
  onInputFocus(ev) {
    ev.target.classList.add('input--filled');
  }

  onInputBlur(ev) {
     if (ev.target.value.trim() === '') {
       ev.target.classList.remove('input--filled');
     }
  }

  /**
   * Listens for escape key pressed to quit the component
   *
   * @param event:any
   * @method onKey
   */
   onKey(event:any): void { // without type info
     if (event.key === 'Escape') {  // escape key was pressed
	     // Simply navigate back to 'njive'
       this.router.navigate(['/kontrolna-tabla', 'imovina', {outlets: {'njive': ['njive-prikaz']}}]);
     } 
   }

   ngOnDestroy() {
     // Izlazak iz ove komponente uvek vodi na osnovni ekran kontrolne table:
     this.unsubscribe.unsubscribe();
     this.notificationHubService.emit(HubNotificationType.AppState, 'logo');
   }
}

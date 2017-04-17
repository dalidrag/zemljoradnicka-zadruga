/************************************************************************/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'

import { MasineActionCreators } from '../../../Redux/action-creators/masine.action-creators';

import { TipMasine } from '../../../deljeno/tipovi-podataka/tip-masine';
import { Masina } from '../../../deljeno/tipovi-podataka/masina';

import { DataService } from '../../../deljeno/data.service';
import { UtilitiesService } from '../../../deljeno/utilities.service';
import { NotificationHubService, HubNotificationType } from '../../../deljeno/event-hub.service';
/************************************************************************/

/**
 * Komponenta za dodavanje masine.
 *
 * @class DodajMasinuComponent
 */
@Component({
  selector: 'app-dodaj-masinu',
  templateUrl: './dodaj-masinu.component.html',
  styleUrls: ['./dodaj-masinu.component.css']
})
export class DodajMasinuComponent implements OnInit, OnDestroy {
	dodajMasinuForma: FormGroup;
	tipoviMasina: TipMasine[];
	unsubscribe;

  constructor(public actionCreators: MasineActionCreators, private fb: FormBuilder, private dataService: DataService, private router: Router, private route: ActivatedRoute, private utilitiesService: UtilitiesService, private notificationHubService: NotificationHubService) { }

  ngOnInit() {
  	this.notificationHubService.emit(HubNotificationType.AppState, 'Додавање машине');
    this.unsubscribe = this.route.data.subscribe((data: { tipoviMasina: TipMasine[] }) => {
  		this.tipoviMasina = data.tipoviMasina;
  	});
    this.dodajMasinuForma = this.fb.group({  
  		'ime': ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
  		'tipMasine': ['',  Validators.required]
    });

    // Dodaje svakom input elementu logiku koja preko CSS klase
    // cuva podatak o tome da li polje sadrzi neki tekst
    [].slice.call(document.querySelectorAll('input.input__field')).forEach((inputEl) => {
      // ako je input polje vec popunjeno..
      if (inputEl.value.trim() !== '') {
        inputEl.classList.add('input--filled');
      }
      // events:
      inputEl.addEventListener('focus', this.onInputFocus);
      inputEl.addEventListener('blur', this.onInputBlur);
    });

    // skroluj formu u vidno polje
    let inputEl = document.getElementById('ime-masine') as HTMLElement;
    inputEl.scrollIntoView({behavior: "smooth", block: "start"});
  }
 
  /**
	 * Upisuje pokupljene vrednosti iz forme u bazu podataka
	 *
	 * @param formValues
	 * @method onSubmit
	 */
	onSubmit(formValues: any): void { 
		let novaMasina = new Masina();
		novaMasina.ime = formValues.ime;
		novaMasina.tipMasine = formValues.tipMasine;

		this.dataService.dodajMasinu(novaMasina).then((dodataMasina) => {
			this.notificationHubService.emit(HubNotificationType.AppState, 'logo');
      this.notificationHubService.emit(HubNotificationType.Success, 'Додата нова машина');
			this.actionCreators.novaMasina(dodataMasina.id);
			this.router.navigate(['/kontrolna-tabla', 'imovina', {outlets: {'masine': ['masine-prikaz']}}]);
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
	     // Simply navigate back to 'masine'
       this.router.navigate(['/kontrolna-tabla', 'imovina', {outlets: {'masine': ['masine-prikaz']}}]);
     } 
   }

  ngOnDestroy() {
     this.unsubscribe.unsubscribe();
     // Izlazak iz ove komponente uvek vodi na osnovni ekran kontrolne table:
     this.notificationHubService.emit(HubNotificationType.AppState, 'logo');
   }
}

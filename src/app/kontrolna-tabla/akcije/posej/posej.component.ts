/************************************************************************/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'

import { Aktivnost } from '../../../deljeno/tipovi-podataka/aktivnost';
import { Njiva } from '../../../deljeno/tipovi-podataka/njiva';
import { VrstaUseva } from '../../../deljeno/tipovi-podataka/vrsta-useva';
import { Usev } from '../../../deljeno/tipovi-podataka/usev';

import { NjiveActionCreators } from '../../../Redux/action-creators/njive.action-creators';

import { DataService } from '../../../deljeno/data.service';
import { UtilitiesService } from '../../../deljeno/utilities.service';
import { NotificationHubService, HubNotificationType } from '../../../deljeno/event-hub.service';
/************************************************************************/

@Component({
  selector: 'app-posej',
  templateUrl: './posej.component.html',
  styleUrls: ['./posej.component.css']
})
export class PosejComponent implements OnInit, OnDestroy {
	posejForma: FormGroup;
	njive: Njiva[];
	vrsteUseva: VrstaUseva[];
	unsubscribe;

  constructor(private fb: FormBuilder, private dataService: DataService, private utilitiesService: UtilitiesService, private router: Router, private route: ActivatedRoute, private actionCreators: NjiveActionCreators, private notificationHubService: NotificationHubService) { }

  ngOnInit() {
	  this.notificationHubService.emit(HubNotificationType.AppState, 'Сејање');
	  this.unsubscribe = this.route.data.subscribe((data: { njive: Njiva[], vrsteUseva: VrstaUseva[] }) => {
			this.njive = data.njive;
			this.vrsteUseva = data.vrsteUseva;
		});
	 	this.posejForma = this.fb.group({  
	 		'usev': ['', Validators.required],
	 		'njiva': ['', Validators.required]
	   });

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

  /**
	 * Upisuje pokupljene vrednosti iz forme u bazu podataka
	 *
	 * @param formValues
	 * @method onSubmit
	 */
	onSubmit(formValues: any): void { 
		let izabrana_njiva: Njiva;

		for (let njiva of this.njive) {
			if (njiva.id == formValues.njiva) {
				izabrana_njiva = njiva;
				break;
			}
		}
		
		let novi_usev = new Usev();
		novi_usev.vrsta_useva = formValues.usev;
		novi_usev.id = (izabrana_njiva.usevi.length + 1).toString();
		izabrana_njiva.usevi.push(novi_usev);

		this.dataService.azurirajNjivu(izabrana_njiva).then(() => {
			this.actionCreators.noviUsev(novi_usev.id); // za fade-in efekat u komponenti njive

			let novaAktivnost = new Aktivnost();
			novaAktivnost.tip = "посејано";
			novaAktivnost.meta2 = formValues.usev;

			this.dataService.dodajAktivnost(novaAktivnost);
		})
		.then((dodataAktivnost) => {
			this.notificationHubService.emit(HubNotificationType.Success, 'Усев посејан');
			this.router.navigate(['/kontrolna-tabla/akcije']);
		})
		.catch(error => this.utilitiesService.handleError(error));
	}

	onInputFocus(ev) {
		ev.target.classList.add('input--filled');
	}

	onInputBlur(ev) {
 		if( ev.target.value.trim() === '' ) {
 			ev.target.classList.remove('input--filled');
 		}
	}

	ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}

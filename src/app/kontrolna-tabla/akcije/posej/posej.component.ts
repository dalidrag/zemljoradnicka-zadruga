/************************************************************************/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'

import { Aktivnost } from '../../../deljeno/tipovi-podataka/aktivnost';
import { Njiva } from '../../../deljeno/tipovi-podataka/njiva';
import { Usev } from '../../../deljeno/tipovi-podataka/usev';

import { NjiveActionCreators } from '../../../Redux/action-creators/njive.action-creators';

import { DataService } from '../../../deljeno/data.service';
import { UtilitiesService } from '../../../deljeno/utilities.service';
/************************************************************************/

@Component({
  selector: 'app-posej',
  templateUrl: './posej.component.html',
  styleUrls: ['./posej.component.css']
})
export class PosejComponent implements OnInit, OnDestroy {
	posejForma: FormGroup;
	njive: Njiva[];
	unsubscribe;

  constructor(private fb: FormBuilder, private dataService: DataService, private utilitiesService: UtilitiesService, private router: Router, private route: ActivatedRoute, private actionCreators: NjiveActionCreators) { }

  ngOnInit() {
	  this.unsubscribe = this.route.data.subscribe((data: { njive: Njiva[] }) => {
			this.njive = data.njive;
		});
	 	this.posejForma = this.fb.group({  
	 		'usev': ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
	 		'njiva': ['', Validators.required]
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

			this.dataService.dodajAktivnost(novaAktivnost)
		})
		.then((dodataAktivnost) => {
			// this.notificationHubService.emit(HubNotificationType.Success, 'Активност додата');
			this.router.navigate(['/kontrolna-tabla/akcije']);
		})
		.catch(error => this.utilitiesService.handleError(error));
	}

	ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
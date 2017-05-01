/****************************************************************************/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { Masina } from '../../../deljeno/tipovi-podataka/masina';
import { TipMasine } from '../../../deljeno/tipovi-podataka/tip-masine';

import { MasineActionCreators } from '../../../Redux/action-creators/masine.action-creators';
import { StateService } from '../../../deljeno/state.service';
/****************************************************************************/

/**
 * Prikazuje sve masine clana zadruge
 * a ako je tako selektovano, kombinovano sa masinama zadruge
 *
 * @class MasineComponent
 */
@Component({
  selector: 'app-masine',
  templateUrl: './masine.component.html',
  styleUrls: ['./masine.component.css']
})
export class MasineComponent implements OnInit, OnDestroy {
	masine: Masina[];
	tipoviMasina: TipMasine[];
	tipoviMasinaPoId: TipMasine[] = [];
	novaMasinaId: string; // sluzi da aktivira fade-in efekat za novododatu masinu
	unsubscribe;

  constructor(private route: ActivatedRoute, private stateService: StateService, private actionCreators: MasineActionCreators) { }

  ngOnInit() {
	  this.unsubscribe = this.route.data.subscribe((data: { masine: Masina[], tipoviMasina: TipMasine[]}) => {
			this.masine = data.masine;
	    this.tipoviMasina = data.tipoviMasina;
	    for (let tipMasine of this.tipoviMasina) {
	      this.tipoviMasinaPoId[tipMasine._id] = tipMasine;
	    }
		});
		if (this.stateService.state.masine.novaMasinaId !== '0') {  // ako je upravo dodata nova masina
		  this.novaMasinaId = this.stateService.state.masine.novaMasinaId;
		  this.actionCreators.novaMasinaPrikazana();
		}
  }

  ngOnDestroy() {
    // this.unsubscribe.unsubscribe();
  }
}

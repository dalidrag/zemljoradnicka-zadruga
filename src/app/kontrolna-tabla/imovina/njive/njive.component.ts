/****************************************************************************/
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { NjiveActionCreators } from '../../../Redux/action-creators/njive.action-creators';

import { Njiva } from '../../../deljeno/tipovi-podataka/njiva';
import { VrstaUseva } from '../../../deljeno/tipovi-podataka/vrsta-useva';

import { StateService } from '../../../deljeno/state.service';
import { ModalPopupService} from '../../../deljeno/modal-popup.service';
/****************************************************************************/

/**
 * Prikazuje sve njive u posedu prijavljenog korisnika
 *
 * @class NjiveComponent
 */
@Component({
  selector: 'app-njive',
  templateUrl: './njive.component.html',
  styleUrls: ['./njive.component.css']
})
export class NjiveComponent implements OnInit, OnDestroy {
	njive: Njiva[];
  vrsteUseva: VrstaUseva[];
  vrsteUsevaPoId: VrstaUseva[] = [];
  novaNjivaId: string;  // sluzi da aktivira fade-in efekat za novododatu njivu
  noviUsevId: string;  // sluzi da aktivira fade-in efekat za novododati usev
  unsubscribe;

  constructor(private route: ActivatedRoute, private router: Router, private stateService: StateService, private actionCreators: NjiveActionCreators, private modalPopupService: ModalPopupService) { }

  ngOnInit() {
    this.unsubscribe = this.route.data.subscribe((data: { njive: Njiva[], vrsteUseva: VrstaUseva[] }) => {
  		this.njive = data.njive;
      this.vrsteUseva = data.vrsteUseva;
      for (let vrstaUseva of this.vrsteUseva) {
        this.vrsteUsevaPoId[vrstaUseva.id] = vrstaUseva;
      }
  	});
    if (this.stateService.state.njive.novaNjivaId !== '0') {  // ako je upravo dodata nova njiva
      this.novaNjivaId = this.stateService.state.njive.novaNjivaId;
      this.actionCreators.novaNjivaPrikazana();
    }
    if (this.stateService.state.njive.noviUsevId !== '0') {  // ako je upravo dodata nova njiva
      this.noviUsevId = this.stateService.state.njive.noviUsevId;
      this.actionCreators.noviUsevPrikazan();
    }
  }

  prikaziNjivu(njivaId) {
  	this.router.navigate(['kontrolna-tabla', 'imovina', {outlets: {'njive': ['njiva-prikaz', njivaId]}}]);
  }

  prikaziInformacije() {
    this.modalPopupService.open();
    let infoButton = document.getElementById('info-dugme') as HTMLElement;
    let dataSet = infoButton.dataset as any;
    this.modalPopupService.insertHTML(`<h1>Naslov</h1><p>${dataSet.tema}</p>`);
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}

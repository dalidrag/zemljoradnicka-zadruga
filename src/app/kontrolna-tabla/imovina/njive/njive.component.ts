/****************************************************************************/
import { Component, OnInit, OnDestroy, Inject  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { NjiveActionCreators } from '../../../Redux/action-creators/njive.action-creators';

import { Njiva } from '../../../deljeno/tipovi-podataka/njiva';

import { StateService } from '../../../deljeno/state.service';
/****************************************************************************/

/**
 * Prikazuje listu svih njiva u posedu prijavljenog korisnika
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
  novaNjivaId: string;  // sluzi da aktivira fade-in efekat za novododatu njivu
  unsubscribeStore;
	unsubscribe;

  constructor(private route: ActivatedRoute, private router: Router, private stateService: StateService, private actionCreators: NjiveActionCreators) { }

  ngOnInit() {
    this.unsubscribe = this.route.data.subscribe((data: { njive: Njiva[] }) => {
  		this.njive = data.njive;
  	});
    if (this.stateService.novaNjivaId !== '0') {  // ako je upravo dodata nova njiva
      this.novaNjivaId = this.stateService.novaNjivaId;
      this.actionCreators.novaNjivaPrikazana();
    }
  }

  prikaziNjivu(njivaId) {
  	this.router.navigate(['kontrolna-tabla', 'imovina', {outlets: {'njive': ['njiva-prikaz', njivaId]}}]);
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}

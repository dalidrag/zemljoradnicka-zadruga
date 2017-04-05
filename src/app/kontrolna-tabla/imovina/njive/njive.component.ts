import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { Njiva } from '../../../deljeno/tipovi-podataka/njiva';

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
	unsubscribe;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  	this.unsubscribe = this.route.data.subscribe((data: { njive: Njiva[] }) => {
  		this.njive = data.njive;
  	});
  }

  prikaziNjivu(njivaId) {
  	this.router.navigate(['kontrolna-tabla', 'imovina', {outlets: {'njive': ['njiva-prikaz', njivaId]}}]);
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Njiva } from '../../../../deljeno/tipovi-podataka/njiva';

/**
 * Prikazuje detalje jedne njive
 *
 * @class NjivaComponent
 */
@Component({
  selector: 'app-njiva',
  templateUrl: './njiva.component.html',
  styleUrls: ['./njiva.component.css']
})
export class NjivaComponent implements OnInit, OnDestroy {
	njive: Njiva[];
	njiva: Njiva;
	unsubscribe;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	this.unsubscribe = this.route.data.subscribe((data: { njive: Njiva[] }) => {
  		this.njive = data.njive;
  	});
  	let njivaId = +this.route.snapshot.params['id'];
    for (let njiva of this.njive) {
      if (+njiva.id === njivaId) {
        this.njiva = njiva;
        break;
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}

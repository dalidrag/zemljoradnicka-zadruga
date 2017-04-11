import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Aktivnost } from '../../../deljeno/tipovi-podataka/aktivnost';

/**
 * Prikazuje sve akcije clana zadruge
 * a ako je selektovano, kombinovano sa zajednickim akcijama zadruge
 *
 * @class AkcijeListaComponent
 */
@Component({
  selector: 'app-akcije-lista',
  templateUrl: './akcije-lista.component.html',
  styleUrls: ['./akcije-lista.component.css']
})
export class AkcijeListaComponent implements OnInit {
	aktivnosti: Aktivnost[];
	unsubscribe;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	this.unsubscribe = this.route.data.subscribe((data: { aktivnosti: Aktivnost[] }) => {
			this.aktivnosti = data.aktivnosti;
		});
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}

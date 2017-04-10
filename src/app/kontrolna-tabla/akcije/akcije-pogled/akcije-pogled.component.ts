import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { Aktivnost } from '../../../deljeno/tipovi-podataka/aktivnost';

/**
 * Ovaj pogled prikazuje sve akcije clana zadruge
 * ako je selektovano, kombinovano sa zajednickim akcijama zadruge
 *
 * @class AkcijePogledComponent
 */
@Component({
  selector: 'app-akcije-pogled',
  templateUrl: './akcije-pogled.component.html',
  styleUrls: ['./akcije-pogled.component.css']
})
export class AkcijePogledComponent implements OnInit {
	aktivnosti: Aktivnost[];
	unsubscribe;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
	  this.unsubscribe = this.route.data.subscribe((data: { aktivnosti: Aktivnost[] }) => {
			this.aktivnosti = data.aktivnosti;
		});
  }

  // ngOnDestroy() {
  //   this.unsubscribe.unsubscribe();
  // }
}

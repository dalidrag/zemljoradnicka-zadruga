/**************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InfoThemesActionCreators} from '../../../Redux/action-creators/info-themes.action-creators';

import { DataService } from '../../../deljeno/data.service';
/**************************************************************/


/**
 * Prikazuje opcije za aktivnosti na njivama
 *
 * @class AkcijeNjiveComponent
 */
@Component({
  selector: 'app-akcije-njive',
  templateUrl: './akcije-njive.component.html',
  styleUrls: ['./akcije-njive.component.css']
})
export class AkcijeNjiveComponent implements OnInit {
	private oranjeTeme: Array<any>;
	private sejanjeTeme: Array<any>;
	private navodnjavanjeTeme: Array<any>;
	private djubrenjeTeme: Array<any>;
	private prskanjeTeme: Array<any>;
	private zetvaTeme: Array<any>;

  constructor(private infoThemesActionCreators: InfoThemesActionCreators, private dataService: DataService, private router: Router) { }

  ngOnInit() {
  	this.dataService.vratiTeme({tipAktivnosti: 'Sejanje'}).then(infoTeme =>
  	{
  		if (infoTeme.length > 0) this.sejanjeTeme = infoTeme;
  	});
  	this.dataService.vratiTeme({tipAktivnosti: 'Oranje'}).then(infoTeme =>
  	{
  		if (infoTeme.length > 0) this.oranjeTeme = infoTeme;
  	});
  }

  sejanje() {
    this.router.navigate(['kontrolna-tabla', 'akcije', {outlets: {'akcije-njive': ['sejanje']}}]);
  }

  sejanjeInfoTeme() {
  	this.infoThemesActionCreators.prikaziInfoPages(this.sejanjeTeme);
  }
}

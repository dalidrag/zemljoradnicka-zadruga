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
    this.dataService.vratiTeme({tipAktivnosti: 'Zetva'}).then(infoTeme =>
    {
      if (infoTeme.length > 0) this.zetvaTeme = infoTeme;
    });
    this.dataService.vratiTeme({tipAktivnosti: 'Navodnjavanje'}).then(infoTeme =>
    {
      if (infoTeme.length > 0) this.navodnjavanjeTeme = infoTeme;
    });
    
  }

  sejanje() {
    this.router.navigate(['kontrolna-tabla', 'akcije', {outlets: {'akcije-njive': ['sejanje']}}]);
  }

  sejanjeInfoTeme() {
    let coords = this.vratiBoundingRect('sejanje-info-button');
    this.infoThemesActionCreators.ukloniInfoPages();
    this.infoThemesActionCreators.prikaziInfoPages(this.sejanjeTeme, coords, {tipAktivnosti: 'Sejanje'});
  }
  oranjeInfoTeme() {
    let coords = this.vratiBoundingRect('oranje-info-button');
    this.infoThemesActionCreators.ukloniInfoPages();
    this.infoThemesActionCreators.prikaziInfoPages(this.oranjeTeme, coords, {tipAktivnosti: 'Oranje'});
  }
  navodnjavanjeInfoTeme() {
    let coords = this.vratiBoundingRect('navodnjavanje-info-button');
    this.infoThemesActionCreators.ukloniInfoPages();
    this.infoThemesActionCreators.prikaziInfoPages(this.navodnjavanjeTeme, coords, {tipAktivnosti: 'Navodnjavanje'});
  }

  zetvaInfoTeme() {
    let coords = this.vratiBoundingRect('zetva-info-button');
    this.infoThemesActionCreators.ukloniInfoPages();
    this.infoThemesActionCreators.prikaziInfoPages(this.zetvaTeme, coords, {tipAktivnosti: 'Zetva'});
  }

  oranjeDodajInfo() {
    this.infoThemesActionCreators.ukloniInfoPages();
    this.infoThemesActionCreators.dodajTemu({tipAktivnosti: 'Oranje'});
    this.router.navigate(['kontrolna-tabla', 'akcije', { outlets: {'akcije-njive': ['dodaj-info-akcije-njive']}}]);
  }
  navodnjavanjeDodajInfo() {
    this.infoThemesActionCreators.ukloniInfoPages();
    this.infoThemesActionCreators.dodajTemu({tipAktivnosti: 'Navodnjavanje'});
    this.router.navigate(['kontrolna-tabla', 'akcije', { outlets: {'akcije-njive': ['dodaj-info-akcije-njive']}}]);
  }

  vratiBoundingRect(cssId) {
    let element = document.getElementById(cssId) as HTMLElement;
    return element.getBoundingClientRect();
  }
}

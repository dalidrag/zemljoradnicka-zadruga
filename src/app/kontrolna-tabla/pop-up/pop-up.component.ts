import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { InfoThemesActionCreators} from '../../Redux/action-creators/info-themes.action-creators';

import { DataService } from '../../deljeno/data.service';
import { StateService } from '../../deljeno/state.service';
import { ModalPopupService } from '../../deljeno/modal-popup.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit, OnChanges {
	@Input()
	infoThemes;
  @Input()
  coords; 
  @Output()
  infoPrikaz = new EventEmitter<string>();

  constructor(private dataService: DataService, private stateService: StateService, private infoThemesActionCreators: InfoThemesActionCreators, private modalPopupService: ModalPopupService, private router: Router) { }

  // pozicionira pop up prozor odmah ispod dugmeta koje ga je aktiviralo
  ngOnChanges(changes: SimpleChanges) {
    if (changes.coords) {
     let element = document.getElementsByClassName('info-pop-up')[0] as HTMLElement;
     let pageWidth = document.documentElement.offsetWidth;

     element.style.top = this.coords.bottom +'px';
     if (pageWidth/2 > this.coords.left) {  // ako je dugme na levoj strani ekrana
       element.style.right = 'auto';
       element.style.left = this.coords.left +'px';
     }
     else {
       element.style.right = pageWidth - this.coords.right +'px';
       element.style.left = 'auto';
     }
    }
  }

  ngOnInit() {
     
  }

  clicked(themeId) {
    this.infoPrikaz.emit(themeId);
  }

  dodajTemu() {
    this.infoThemesActionCreators.ukloniInfoPages();
    this.infoThemesActionCreators.dodajTemu(this.stateService.state.infoThemes.query);
    this.router.navigate(['kontrolna-tabla', 'akcije', { outlets: {'akcije-njive': ['dodaj-info-akcije-njive']}}]);
  }
}

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { DataService } from '../../deljeno/data.service';
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

  constructor(private dataService: DataService, private modalPopupService: ModalPopupService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.coords) {
     let element = document.getElementsByClassName('info-pop-up')[0] as HTMLElement;
     let pageWidth = document.documentElement.offsetWidth;

     element.style.top = this.coords.bottom +'px';
     if (pageWidth/2 > this.coords.left) {
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
  	this.dataService.vratiHTMLTeme(themeId).then(HTMLstring => {
      this.modalPopupService.open();
      this.modalPopupService.insertHTML(HTMLstring);
    });
  }
}

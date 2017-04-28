import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../deljeno/data.service';

@Component({
  selector: 'app-info-prikaz',
  templateUrl: './info-prikaz.component.html',
  styleUrls: ['./info-prikaz.component.css']
})
export class InfoPrikazComponent implements OnInit {
	@Input()
	infoThemes;
	@Input()
	themeId;
	@Output()
	ukloni = new EventEmitter<any>();
	themeIndex;

	infoContentElement: HTMLElement;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  	this.dataService.vratiHTMLTeme(this.themeId).then(HTMLstring => {
      this.infoContentElement = document.getElementsByClassName('modal-content')[0] as HTMLElement;
      this.infoContentElement.innerHTML = HTMLstring;
    });
  	for (let i = 0; i < this.infoThemes.length; ++i) {
  		if (this.infoThemes[i].id === this.themeId) {
  			this.themeIndex = i;
  			break;
  		}
  	}
  }

  sledeciClanak() {
  	++this.themeIndex;
  	this.dataService.vratiHTMLTeme(this.infoThemes[this.themeIndex].id).then(HTMLstring => {
  		this.infoContentElement.innerHTML = HTMLstring;
    });
  }

  prethodniClanak() {
  	--this.themeIndex;
  	this.dataService.vratiHTMLTeme(this.infoThemes[this.themeIndex].id).then(HTMLstring => {
  		this.infoContentElement.innerHTML = HTMLstring;
    });
  }

  zatvori() {
  	this.ukloni.emit(true);
  }

}

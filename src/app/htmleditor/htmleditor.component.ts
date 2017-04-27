import { Component, OnInit } from '@angular/core';

import { Info } from '../deljeno/tipovi-podataka/info-tema';

import { DataService } from '../deljeno/data.service';
import { UtilitiesService } from '../deljeno/utilities.service';

@Component({
  selector: 'app-htmleditor',
  templateUrl: './htmleditor.component.html',
  styleUrls: ['./htmleditor.component.css']
})
export class HTMLEditorComponent implements OnInit {
	public editorContent: string = 'Наслов';

  constructor(private dataService: DataService, private utilitiesService: UtilitiesService) { }

  ngOnInit() {
  }

  process() {
  	/* let parser = new DOMParser();
  	let doc = parser.parseFromString(this.editorContent, "text/xml");
  	let imgEl = doc.getElementsByTagName('img')[0] as HTMLImageElement;
  	console.log('imgEl: ' + imgEl);
  	let url = imgEl.src;
  	
  	let xhr = new XMLHttpRequest();
  	xhr.open('get', url);
  	xhr.responseType = 'blob';
  	xhr.onload = () => {
  		let fr = new FileReader();
  		fr.onload = function() {
  			console.log(this.result);
  		}
  		fr.readAsDataURL(xhr.response);
  	}
  	xhr.send(); */
  	let infoClanak = new Info();
  	let inputEl = document.getElementById('naslov-teme') as HTMLInputElement;
  	infoClanak.naslov = inputEl.value;
  	infoClanak.HTML = this.editorContent;
  	infoClanak.tipAktivnosti = 'Oranje';

  	this.dataService.dodajTemu(infoClanak).then(dodatiClanak => {
  		window.alert(dodatiClanak.id);
  	})
  	.catch(error => this.utilitiesService.handleError(error));
  }

}

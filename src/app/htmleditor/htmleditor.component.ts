import { Component, OnInit } from '@angular/core';

import { Info } from '../deljeno/tipovi-podataka/info-tema';

import { DataService } from '../deljeno/data.service';
import { StateService } from '../deljeno/state.service';
import { UtilitiesService } from '../deljeno/utilities.service';

@Component({
  selector: 'app-htmleditor',
  templateUrl: './htmleditor.component.html',
  styleUrls: ['./htmleditor.component.css']
})
export class HTMLEditorComponent implements OnInit {
	public editorContent: string = 'Наслов';

	// toolbar buttons to show; will include images, video and file uploads in the future
	// The list of buttons that appear in the rich text editor's toolbar on small devices (≥ 768px).
	public toolbarButtonsSM = ['bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'insertLink', 'formatOL', 'formatUL', 'insertImage', 'insertTable', 'undo', 'redo'];
	// The list of buttons that appear in the rich text editor's toolbar on medium devices (≥ 992px).
	public toolbarButtonsMD = ['bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'color', 'paragraphStyle', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', 'insertLink', 'insertImage', 'insertTable', 'undo', 'redo', 'clearFormatting'];
	// The list of buttons that appear in the rich text editor's toolbar on large devices (≥ 1200px).
	public toolbarButtons = ['print', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'specialCharacters', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', '-', 'insertLink', 'insertImage', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'];
	// List of fonts that will appear under the rich text editor's toolbar 'fonts' buttons
	public fontFamily = {
		'Gabriela, serif': 'Gabriela',
		'naturalFont, serif': 'Natural',
		'Arial,Helvetica,sans-serif': 'Arial',
		'Georgia,serif': 'Georgia',
		'Impact,Charcoal,sans-serif': 'Impact',
		'Tahoma,Geneva,sans-serif': 'Tahoma',
		"'Times New Roman',Times,serif": 'Times New Roman',
		'Verdana,Geneva,sans-serif': 'Verdana'
	}

	public froalaOptions = {
		toolbarButtonsSM: this.toolbarButtonsSM,
		toolbarButtonsMD: this.toolbarButtonsMD,
		toolbarButtons: this.toolbarButtons,
		fontFamily: this.fontFamily,
		imageUploadURL: 'http://localhost:3000/api/info/upload-image'
	}

  constructor(private dataService: DataService, private stateService: StateService, private utilitiesService: UtilitiesService) { }

  ngOnInit() {
  }

  process() {
  	let infoClanak = new Info();
  	let inputEl = document.getElementById('naslov-teme') as HTMLInputElement;
  	infoClanak.naslov = inputEl.value;
  	infoClanak.HTML = this.editorContent;

  	let query = this.stateService.state.infoThemes.query;
  	for (let key of Object.keys(query)) 
			infoClanak[key] = query[key];

  	this.dataService.dodajTemu(infoClanak).then(dodatiClanak => {
  		window.history.back();
  	})
  	.catch(error => this.utilitiesService.handleError(error));
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-htmleditor',
  templateUrl: './htmleditor.component.html',
  styleUrls: ['./htmleditor.component.css']
})
export class HTMLEditorComponent implements OnInit {
	public editorContent: string = 'Наслов';

  constructor() { }

  ngOnInit() {
  }

  process() {
  	console.log(this.editorContent);
  }

}

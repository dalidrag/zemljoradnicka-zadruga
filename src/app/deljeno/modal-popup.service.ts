import { Injectable } from '@angular/core';

@Injectable()
export class ModalPopupService {
	private body: HTMLElement;
	private modalPopup: HTMLElement;

  constructor() {
  	this.body = document.getElementsByTagName('body')[0] as HTMLElement;
  }

  open() {
 		// add 'modal-de-emphasised' class to <app-root>

 		this.modalPopup = document.createElement('div') as HTMLElement;
 		this.modalPopup.className = "modal-backdrop";
 		this.modalPopup.innerHTML = `
    		<div class="modal-content">
      		Loading content...
    		</div>
    		<button id="dismiss">Close</button>
  			`;

  	this.body.appendChild(this.modalPopup);
  	
  	let button = document.getElementById('dismiss') as HTMLElement;
  	button.addEventListener("click", this.close);
  }

  insertHTML(html_template: string) {
  	let content = document.getElementsByClassName('modal-content')[0] as HTMLElement;
  	content.innerHTML = html_template;
  }

  close() {
  	let body = document.getElementsByTagName('body')[0] as HTMLElement;
  	let modalPopup = document.getElementsByClassName('modal-backdrop')[0];
  	body.removeChild(modalPopup);

  	// remove 'modal-de-emphasised' class from <app-root>
  }

}

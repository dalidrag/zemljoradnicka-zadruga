import { Injectable } from '@angular/core';

@Injectable()
export class ModalPopupService {
	private body: HTMLElement;
	private modalPopup: HTMLElement;
 	appRootElement = document.getElementById('app-root-element') as HTMLElement;
  blurBackground: boolean = false;

  constructor() {
    this.body = document.getElementsByTagName('body')[0] as HTMLElement;
  }

  open(blurBackground?: boolean) {
    this.blurBackground = blurBackground
    if (blurBackground) {
      // add 'modal-de-emphasised' class to <app-root>
      this.appRootElement.classList.add('modal-de-emphasised');
    }

 		this.modalPopup = document.createElement('div') as HTMLElement;
 		this.modalPopup.className = "modal-backdrop";
 		this.modalPopup.innerHTML = `
    		<div class="modal-window">
          <div class="modal-content">
        		Loading content...
          </div>
      		<button id="dismiss">Close</button>
        </div>
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

  	if (this.blurBackground) {
      // remove 'modal-de-emphasised' class from <app-root>
      this.appRootElement.classList.remove('modal-de-emphasised');
    }
  }

}

import { Injectable } from '@angular/core';

@Injectable()
export class ModalPopupService {
	private body: HTMLElement;
	private modalPopup: HTMLElement;
 	static appRootElement;

  constructor() {
    this.body = document.getElementsByTagName('body')[0] as HTMLElement;
  }

  open(blurBackground?: boolean) {
    ModalPopupService.appRootElement = ModalPopupService.appRootElement || document.getElementById('app-root-element') as HTMLElement;
    if (blurBackground) {
      // add 'modal-de-emphasised' class to <app-root>
      ModalPopupService.appRootElement.classList.add('modal-de-emphasised');
    }

 		this.modalPopup = document.createElement('div') as HTMLElement;
 		this.modalPopup.className = "modal-backdrop";
 		this.modalPopup.innerHTML = `
    		<div class="modal-window">
          <div class="modal-content" style="font-family: Gabriela; font-size: 0.8rem; padding: 0.5rem; max-width: 30rem;">
        		Учитавам текст...
          </div>
      		<button id="dismiss">Затвори</button>
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

    // remove 'modal-de-emphasised' class from <app-root>
    ModalPopupService.appRootElement.classList.remove('modal-de-emphasised');
  }

}

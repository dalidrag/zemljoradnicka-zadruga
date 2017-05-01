import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationHubService, HubNotificationType } from './event-hub.service';

/**
 * Contains common utility services such as handling errors
 *
 * @class UtilitiesService
 */
@Injectable()
export class UtilitiesService {
//	public avatarURLFragment: string = '';

 	constructor(private notificationHubService: NotificationHubService, private router: Router) {}

 /**
  * Konvertuje m2 u hektar, ar, m2
  *
  * @method m2toha
  * @param m2
  * @return {Object} Object.ha, Object.ar, Object.m2
  */
  m2toha(m2) {
  	m2 = Math.round(m2);
  	let result: any = {};
  	result.ha = Math.floor(m2 / 10000);
  	m2 -= result.ha * 10000;
  	result.ar = Math.floor(m2 / 100);
  	m2 -= result.ar * 100;
  	result.m2 = m2;
  	return result;
  }

 /**
 	* Prikazuje poruku o gresci 
 	*
 	* @method handleError
 	* @param error
 	*/
  handleError(error): void {
		let message = error.message || error.statusText || 'unknown error';

		this.notificationHubService.emit(HubNotificationType.UnknownError, 'Error: ' + message);

		// this.router.navigate(['/']);
	}
}

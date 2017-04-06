import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// import { NotificationHubService, HubNotificationType } from './event-hub.service';

/**
 * Contains common utility services such as handling errors
 *
 * @class UtilitiesService
 */
@Injectable()
export class UtilitiesService {
//	public avatarURLFragment: string = '';

 	constructor(/* private notificationHubService: NotificationHubService, */ private router: Router) {}

  handleError(error): void {
		let message = error.message || error.statusText || 'unknown error';

	//	this.notificationHubService.emit(HubNotificationType.UnknownError, 'Error: ' + message);
		window.alert(message);	// TODO: delete

		this.router.navigate(['/']);
	}
}

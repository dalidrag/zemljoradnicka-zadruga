/***********************************************************************************/
import { Component, OnInit } from '@angular/core';

import { NotificationHubService, HubNotificationType } from '../../deljeno/event-hub.service';
/***********************************************************************************/

/**
 * Prikazuje logo aplikacije ili status aplikacije, i ime korisnika
 *
 * @class StatusnaTablaComponent
 */
@Component({
  selector: 'app-statusna-tabla',
  templateUrl: './statusna-tabla.component.html',
  styleUrls: ['./statusna-tabla.component.css']
})
export class StatusnaTablaComponent implements OnInit {
	statusMessage: string = '<a id="logo" routerLink="/kontrolna-tabla">Задруга</a>';
	notificationMessage: string = '';
	notificationType: HubNotificationType;
	fadingOut: boolean = false;

  constructor(private notificationHubService: NotificationHubService) { }

  ngOnInit() {
  	this.notificationHubService.eventStream.subscribe(value => {	// Show messages as they arrive
			if (value.eventType !== HubNotificationType.AppState) // if not AppState message
				this.notificationType = value.eventType;  // set a new message type
			// Fading out message types
      if (value.eventType === HubNotificationType.Success || value.eventType === HubNotificationType.Error) {
				this.notificationMessage = value.message;
				this.scheduleNotificationFadeOut();
			}
			// Fading out UnknownError message type
      else if (value.eventType === HubNotificationType.UnknownError) {
				value.message ? this.notificationMessage = value.message : this.notificationMessage = 'Error';
				this.scheduleNotificationFadeOut();
			}
      // Persistent message type (AppState)
			else if (value.eventType === HubNotificationType.AppState) {
				this.statusMessage = value.message;
			}
		});
  }

  /** 
  * Starts fade out of notification message after 4 seconds
  *
  * @method scheduleNotificationFadeOut
  */
  scheduleNotificationFadeOut() {
  	setTimeout(() => {
  		this.fadingOut = true;
  		this.scheduleNotificationClearing();
  	}, 3000)
  }
  
 /**
  * Clears notification message after 1.5 seconds
  * 
  * @method scheduleNotificationClearing
  */
  scheduleNotificationClearing() {
    setTimeout(() => {
      this.notificationMessage = '';
      this.fadingOut = false;
    }, 1500);
  }
}

/***********************************************************************************/
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { User } from '../deljeno/tipovi-podataka/user';
import { DataService } from '../deljeno/data.service';

import { NotificationHubService, HubNotificationType } from '../deljeno/event-hub.service';
import { UtilitiesService } from '../deljeno/utilities.service';
/***********************************************************************************/


@Injectable()
export class UserResolve implements Resolve<User[]> {
	constructor(private dataService: DataService, private router: Router, private utilitiesService: UtilitiesService, private notificationHubService: NotificationHubService) {}

  // preuzima podatke za masine
  resolve(route: ActivatedRouteSnapshot): Promise<User[]> {
    return this.dataService.getUser().then(user => {
      if (user) {
        return user;
      } else { // greska
        this.notificationHubService.emit(HubNotificationType.Error, 'Грешка у преузимању корисничких података!');
        this.router.navigate(['/']); 
        return null; 
      }
    })
    .catch(error => this.utilitiesService.handleError(error));
  }
}
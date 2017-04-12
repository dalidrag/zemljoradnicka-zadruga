/***********************************************************************************/
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Njiva } from '../deljeno/tipovi-podataka/njiva';
import { DataService } from '../deljeno/data.service';

import { NotificationHubService, HubNotificationType } from '../deljeno/event-hub.service';
import { UtilitiesService } from '../deljeno/utilities.service';
/***********************************************************************************/


@Injectable()
export class NjiveResolve implements Resolve<Njiva[]> {
	constructor(private dataService: DataService, private router: Router, private utilitiesService: UtilitiesService, private notificationHubService: NotificationHubService) {}

  // preuzima podatke za njive
  resolve(route: ActivatedRouteSnapshot): Promise<Njiva[]> {
    return this.dataService.preuzmiNjive().then(njive => {
      if (njive) {
        return njive;
      } else { // greska
        this.notificationHubService.emit(HubNotificationType.Error, 'Грешка у преузимању њива!');
        this.router.navigate(['/']); 
        return null; 
      }
    })
    .catch(error => this.utilitiesService.handleError(error));
  }
}
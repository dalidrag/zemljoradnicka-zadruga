/***********************************************************************************/
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Aktivnost } from '../deljeno/tipovi-podataka/aktivnost';
import { DataService } from '../deljeno/data.service';

import { NotificationHubService, HubNotificationType } from '../deljeno/event-hub.service';
import { UtilitiesService } from '../deljeno/utilities.service';
/***********************************************************************************/


@Injectable()
export class AkcijeResolve implements Resolve<Aktivnost[]> {
	constructor(private dataService: DataService, private router: Router, private utilitiesService: UtilitiesService, private notificationHubService: NotificationHubService) {}

  // preuzima podatke za aktivnosti
  resolve(route: ActivatedRouteSnapshot): Promise<Aktivnost[]> {
    return this.dataService.preuzmiAktivnosti().then(aktivnosti => {
      if (aktivnosti) {
        return aktivnosti;
      } else { // greska
        this.notificationHubService.emit(HubNotificationType.Error, 'Грешка у преузимању активности!');
        this.router.navigate(['/']); 
        return null; 
      }
    })
    .catch(error => this.utilitiesService.handleError(error));
  }
}
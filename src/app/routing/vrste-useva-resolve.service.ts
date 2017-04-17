/***********************************************************************************/
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { VrstaUseva } from '../deljeno/tipovi-podataka/vrsta-useva';
import { DataService } from '../deljeno/data.service';

import { NotificationHubService, HubNotificationType } from '../deljeno/event-hub.service';
import { UtilitiesService } from '../deljeno/utilities.service';
/***********************************************************************************/


@Injectable()
export class VrsteUsevaResolve implements Resolve<VrstaUseva[]> {
	constructor(private dataService: DataService, private router: Router, private utilitiesService: UtilitiesService, private notificationHubService: NotificationHubService) {}

  // preuzima podatke za njive
  resolve(route: ActivatedRouteSnapshot): Promise<VrstaUseva[]> {
    return this.dataService.preuzmiVrsteUseva().then(vrsteUseva => {
      if (vrsteUseva) {
        return vrsteUseva;
      } else { // greska
        this.notificationHubService.emit(HubNotificationType.Error, 'Грешка у преузимању врста усева!');
        this.router.navigate(['/']); 
        return null; 
      }
    })
    .catch(error => this.utilitiesService.handleError(error));
  }
}
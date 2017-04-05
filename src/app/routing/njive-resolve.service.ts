/***********************************************************************************/
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Njiva } from '../deljeno/tipovi-podataka/njiva';
import { DataService } from '../deljeno/data.service';

/* import { NotificationHubService, HubNotificationType } from '../common/event-hub.service';
import { UtilitiesService } from '../common/utilities.service'; */
/***********************************************************************************/


@Injectable()
export class NjiveResolve implements Resolve<Njiva[]> {
	constructor(private dataService: DataService /*, private utilitiesService: UtilitiesService, private notificationHubService: NotificationHubService, private router: Router */ ) {}

  // preuzima podatke za njive
  resolve(route: ActivatedRouteSnapshot): Promise<Njiva[]> {
    return this.dataService.preuzmiNjive().then(njive => {
      if (njive) {
        return njive;
      } else { // greska
/*        this.notificationHubService.emit(HubNotificationType.Error, 'Error while fetching cars!');
        this.router.navigate(['/']); 
        return false; */
      }
    })
    .catch(error => /* this.utilitiesService.handleError(error) */ console.log(error));
  }
}
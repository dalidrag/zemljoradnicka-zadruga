/***********************************************************************************/
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { TipMasine } from '../deljeno/tipovi-podataka/tip-masine';
import { DataService } from '../deljeno/data.service';

import { NotificationHubService, HubNotificationType } from '../deljeno/event-hub.service';
import { UtilitiesService } from '../deljeno/utilities.service';
/***********************************************************************************/


@Injectable()
export class TipoviMasinaResolve implements Resolve<TipMasine[]> {
	constructor(private dataService: DataService, private router: Router, private utilitiesService: UtilitiesService, private notificationHubService: NotificationHubService) {}

  // preuzima podatke za njive
  resolve(route: ActivatedRouteSnapshot): Promise<TipMasine[]> {
    return this.dataService.preuzmiTipoveMasina().then(tipoviMasina => {
      if (tipoviMasina) {
        return tipoviMasina;
      } else { // greska
        this.notificationHubService.emit(HubNotificationType.Error, 'Грешка у преузимању типова машина!');
        this.router.navigate(['/']); 
        return null; 
      }
    })
    .catch(error => this.utilitiesService.handleError(error));
  }
}
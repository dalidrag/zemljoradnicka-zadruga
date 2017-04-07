import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../deljeno/auth.service';
import { NotificationHubService, HubNotificationType } from '../../deljeno/event-hub.service';
/**
 * Sadrzi pocetni ekran
 *
 * @class PocetnaStranaEkranComponent
 */
@Component({
  selector: 'app-pocetna-strana-ekran',
  templateUrl: './pocetna-strana-ekran.component.html',
  styleUrls: ['./pocetna-strana-ekran.component.css']
})
export class PocetnaStranaEkranComponent implements OnInit {

  constructor( private authService: AuthService, private notificationHubService: NotificationHubService, private router: Router ) { }

  ngOnInit() {
  }

  prijava() {
  	if ( this.authService.prijaviSe() )
  		// if broj ari undefined:
      this.router.navigate(['/vodic-broj-ari']);
      // else if nema njiva
      
  	else
  		this.notificationHubService.emit(HubNotificationType.Error, 'Грешка приликом пријављивања на апликацију!');
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../deljeno/auth.service';
import { NotificationHubService, HubNotificationType } from '../../deljeno/event-hub.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
	username = '';
	showError = false;

  constructor(private authService: AuthService, private notificationHubService: NotificationHubService, private router: Router) { }

  ngOnInit() {
  }

  prijava() {
  	if (!this.username) return;  // we are not interested in empty user-name

  	this.authService.prijaviSe(this.username).then(loggedIn => {
  		if (!loggedIn) this.showError = true;  // show that name is taken
  		else {
  			// if broj ari undefined:
      	this.router.navigate(['/vodic-broj-ari']);
      	// else if nema njiva
      	// else
      	// this.router.navigate(['/']);  // go to application
  		}
  	})
  	.catch(error => {
  		this.notificationHubService.emit(HubNotificationType.Error, 'Грешка приликом пријављивања на апликацију!');
  	})
  }
}

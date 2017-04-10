import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd }   from '@angular/router';

/**
 * Prikazuje meni aplikacije
 *
 * @class MeniTablaComponent
 */
@Component({
  selector: 'app-meni-tabla',
  templateUrl: './meni-tabla.component.html',
  styleUrls: ['./meni-tabla.component.css']
})
export class MeniTablaComponent implements OnInit, OnDestroy {
	izabranaOpcija: number;
	unsubscribeRouterEvents;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.unsubscribeRouterEvents = this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) { // kraj navigacije
        if (this.route.children[0].snapshot.url[0]) {  // proveri ima li pod-ruta
          switch(this.route.children[0].snapshot.url[0].toString()) {
          	case 'imovina':
          		this.izabranaOpcija = 1;
          		break;
          	case 'akcije':
          		this.izabranaOpcija = 2;
          		break;
          	case 'grafikoni':
          		this.izabranaOpcija = 3;
          		break;
          	case 'zabeleske':
          		this.izabranaOpcija = 4;
          		break;
          }
        }
        else  { // nema pod-ruta, nijedna opcija sa menija nije izabrana
          this.izabranaOpcija = 0;
        }
      } 
  	});
  }

  ngOnDestroy() {
    this.unsubscribeRouterEvents.unsubscribe();
  }

}

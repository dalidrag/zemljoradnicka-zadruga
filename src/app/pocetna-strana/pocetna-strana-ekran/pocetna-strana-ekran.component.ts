import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../deljeno/auth.service';

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

  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit() {
  }

  prijava() {
  	if ( this.authService.prijaviSe() )
  		this.router.navigate(['']);
  	else
  		window.alert('Doslo je do greske prilikom prijavljivanja na aplikaciju!'); // TODO
  }

}

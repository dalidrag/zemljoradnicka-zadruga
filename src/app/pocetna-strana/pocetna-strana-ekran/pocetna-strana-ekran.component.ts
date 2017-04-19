import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  prijava() {
    this.router.navigate(['/login']);
  }
}

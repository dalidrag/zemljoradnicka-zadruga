import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Prikazuje opcije za aktivnosti na njivama
 *
 * @class AkcijeNjiveComponent
 */
@Component({
  selector: 'app-akcije-njive',
  templateUrl: './akcije-njive.component.html',
  styleUrls: ['./akcije-njive.component.css']
})
export class AkcijeNjiveComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sejanje() {
    this.router.navigate(['kontrolna-tabla', 'akcije', {outlets: {'akcije-njive': ['sejanje']}}]);
  }
}

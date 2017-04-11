import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Ovaj pogled prikazuje ikone za selektovanje akcija
 *
 * @class AkcijePogledComponent
 */
@Component({
  selector: 'app-akcije-pogled',
  templateUrl: './akcije-pogled.component.html',
  styleUrls: ['./akcije-pogled.component.css']
})
export class AkcijePogledComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  posej() {
    this.router.navigate(['/kontrolna-tabla/posej']);
  }
}

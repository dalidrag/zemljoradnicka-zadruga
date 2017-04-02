import { Component, OnInit } from '@angular/core';

/**
 * Ovaj pogled prikazuje sve akcije clana zadruge
 * ako je selektovano, kombinovano sa zajednickim akcijama zadruge
 *
 * @class AkcijePogledComponent
 */
@Component({
  selector: 'app-akcije-pogled',
  templateUrl: './akcije-pogled.component.html',
  styleUrls: ['./akcije-pogled.component.css']
})
export class AkcijePogledComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

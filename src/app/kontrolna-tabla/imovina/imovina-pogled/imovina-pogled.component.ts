import { Component, OnInit } from '@angular/core';

/**
 * Ovaj pogled prikazuje svu imovinu clana zadruge
 * ako je selektovano, kombinovano sa imovinom same zadruge
 *
 * @class ImovinaPogledComponent
 */
@Component({
  selector: 'app-imovina-pogled',
  templateUrl: './imovina-pogled.component.html',
  styleUrls: ['./imovina-pogled.component.css']
})
export class ImovinaPogledComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

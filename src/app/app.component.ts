import { Component, OnInit } from '@angular/core';

import { StateService } from './deljeno/state.service';
/**
 * Root komponenta aplikacije
 *
 * @class AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private stateService: StateService ) { }

  ngOnInit() {
  	this.stateService.inicijalizuj();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-broj-ari',
  templateUrl: './broj-ari.component.html',
  styleUrls: ['./broj-ari.component.css']
})
export class BrojAriComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  unosPrveNjive() {
  	this.router.navigate(['/vodic-prva-njiva']);
  }

}

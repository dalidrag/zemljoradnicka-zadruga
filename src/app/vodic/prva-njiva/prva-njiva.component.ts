import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prva-njiva',
  templateUrl: './prva-njiva.component.html',
  styleUrls: ['./prva-njiva.component.css']
})
export class PrvaNjivaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  	window.alert('Хајде да пронађемо ваше њиве.');
  }

  vodicPomoc() {
  	this.router.navigate(['/kontrolna-tabla'], { queryParams: { vodic: 'true' } });
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Njiva } from '../../../../deljeno/tipovi-podataka/njiva';

@Component({
  selector: 'app-njiva',
  templateUrl: './njiva.component.html',
  styleUrls: ['./njiva.component.css']
})
export class NjivaComponent implements OnInit, OnDestroy {
	njive: Njiva[];
	njivaId: number;
	unsubscribe;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	this.unsubscribe = this.route.data.subscribe((data: { njive: Njiva[] }) => {
  		this.njive = data.njive;
  	});
  	this.njivaId = +this.route.snapshot.params['id'];
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}

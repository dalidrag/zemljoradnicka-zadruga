import { Component, OnInit } from '@angular/core';
import { GmapsService } from '../gmaps.service';

@Component({
  selector: 'app-njiva-map',
  templateUrl: './njiva-map.component.html',
  styleUrls: ['./njiva-map.component.css']
})
export class NjivaMapComponent implements OnInit {

  constructor(private gmapsService: GmapsService) { }

  ngOnInit() {
  	if (!this.gmapsService.google) {
  		this.gmapsService.initGoogleMaps([]).then(() => {
  			this.inicijalizujMapu()
  		});
  	}
  	else {
//  		if (!this.gmapsService.map)
  			this.inicijalizujMapu();
  	}
  }

  inicijalizujMapu() {
  	//Setting starting options of map
  	let mapOptions = {
  		center: new this.gmapsService.google.maps.LatLng(44.404551, 20.877572), 
  		zoom: 7,
  		minZoom: 7,
  		mapTypeId: this.gmapsService.google.maps.MapTypeId.HYBRID,
  		disableDefaultUI: true
		};

		//Getting map DOM element
		let mapElement = document.getElementById('mapDiv') as HTMLElement;

		this.gmapsService.initMap(mapElement, mapOptions);
  }

}
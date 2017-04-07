import { Component, OnInit } from '@angular/core';
import { GmapsService } from '../gmaps.service';

@Component({
  selector: 'app-dodaj-njivu-map',
  templateUrl: './dodaj-njivu-map.component.html',
  styleUrls: ['./dodaj-njivu-map.component.css']
})
export class DodajNjivuMapComponent implements OnInit {

  constructor(private gmapsService: GmapsService) { }

  ngOnInit() {
  	if (!this.gmapsService.google) {
  		this.gmapsService.initGoogleMaps(['drawing']).then(() => {
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

		let drawingManager = new this.gmapsService.google.maps.drawing.DrawingManager({
	    drawingMode: this.gmapsService.google.maps.drawing.OverlayType.POLYGON,
	    drawingControl: true,
	    drawingControlOptions: {
	      drawingModes: ['polygon', 'rectangle']
	    },
	  });
		drawingManager.setMap(this.gmapsService.map);
  }

}

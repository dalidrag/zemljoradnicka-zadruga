import { Component, OnInit, Input } from '@angular/core';
import { GmapsService } from '../gmaps.service';

import { Njiva } from '../../deljeno/tipovi-podataka/njiva';

@Component({
  selector: 'app-njiva-map',
  templateUrl: './njiva-map.component.html',
  styleUrls: ['./njiva-map.component.css']
})
export class NjivaMapComponent implements OnInit {
  @Input()
  njivaCoords = [];

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
    this.prikaziNjivu();
  }

  /**
   * Prikazuje njivu prethodno memorisanu kao niz geografskih koordinata
   *
   * @param njivaCoords [[lat, lng], ..., [lat, lng]]
   * @method prikaziNjivu
   */
  prikaziNjivu() {
    let swLat = 1000;
    let swLng = 1000;
    let neLat = -1000;
    let neLng = -1000;

    this.njivaCoords.forEach((latLng) => {
      if (swLat > latLng[0]) swLat = latLng[0];
      if (swLng > latLng[1]) swLng = latLng[1];
      if (neLat < latLng[0]) neLat = latLng[0];
      if (neLng < latLng[1]) neLng = latLng[1];
    });

    // donji levi ugao mape
    let sw = new this.gmapsService.google.maps.LatLng(swLat, swLng);
    // gornji desni ugao mape
    let ne = new this.gmapsService.google.maps.LatLng(neLat, neLng);
    let njivaMapBounds = new this.gmapsService.google.maps.LatLngBounds(sw, ne);
    this.gmapsService.map.fitBounds(njivaMapBounds);

    // Nacrtaj njivu
    let polygonPath = [];
    let tempLatLng;
    this.njivaCoords.forEach((latLng) => {
      tempLatLng = new this.gmapsService.google.maps.LatLng(latLng[0], latLng[1]);
      polygonPath.push(tempLatLng);
    });
    let polygonOptions = {
      paths: polygonPath,
      strokeColor: '#A52A2A',
      strokeOpacity: 0.9,
      strokeWeight: 3,
      fillColor: '#A52A2A',
      fillOpacity: 0.25
    }
    let polygon = new this.gmapsService.google.maps.Polygon(polygonOptions);
    polygon.setMap(this.gmapsService.map);
  }

}

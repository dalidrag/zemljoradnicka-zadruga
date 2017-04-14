import { Injectable } from '@angular/core';
import * as GoogleMapsLoader from 'google-maps';

@Injectable()
export class GmapsService {
	public google;
	public map;

	public dodataNjivaOblik;

  constructor() { }

  /**
	 * Inicijalizuje Google mapu
	 *
	 * @method initGoogleMaps
	 * @param libraries		niz stringova koji identifikuju dodatne biblioteke, npr. ['geometry', 'places']
	 * @return {Promise}
	 */
  initGoogleMaps(libraries) {
  	GoogleMapsLoader.KEY = 'AIzaSyAfHf7VCPHO_swS31b-ANaWdxvjfeulRBE';
  	GoogleMapsLoader.LIBRARIES = libraries;
  	GoogleMapsLoader.LANGUAGE = 'sr';
  	GoogleMapsLoader.REGION = 'sr';

  	return new Promise((Resolve, Reject) => {
  		let self = this;
  		GoogleMapsLoader.load(function(google) {
  	  	//Enabling new cartography and themes
				google.maps.visualRefresh = true;

  	  	self.google = google;
  	  	Resolve();
  		});
  	});	
  }

	/**
	 * Inicijalizuje Google mapu
	 *
	 * @method initMap
	 * @param mapElement	HTMLElement u kome ce mapa biti prikazana; mora da ima definisanu visinu
	 * @param mapOptions	Google Map API opcije za inicijalizaciju mape
	 */	
  initMap(mapElement, mapOptions) {
  	this.map = new this.google.maps.Map(mapElement, mapOptions);
  }

  /**
   * Zumira njivu prethodno memorisanu kao niz geografskih koordinata
   *
   * @param njivaCoords [[lat, lng], ..., [lat, lng]]
   * @method prikaziNjivu
   */
  zumirajNjivu(njivaCoords) {
    let swLat = 1000;
    let swLng = 1000;
    let neLat = -1000;
    let neLng = -1000;

    njivaCoords.forEach((latLng) => {
      if (swLat > latLng[0]) swLat = latLng[0];
      if (swLng > latLng[1]) swLng = latLng[1];
      if (neLat < latLng[0]) neLat = latLng[0];
      if (neLng < latLng[1]) neLng = latLng[1];
    });

    // donji levi ugao mape
    let sw = new this.google.maps.LatLng(swLat, swLng);
    // gornji desni ugao mape
    let ne = new this.google.maps.LatLng(neLat, neLng);
    let njivaMapBounds = new this.google.maps.LatLngBounds(sw, ne);
    this.map.fitBounds(njivaMapBounds);
  }


  /**
   * Crta njive na mapi
   *
   * @param njive  Njiva[]
   * @method prikaziNjive
   */
   prikaziNjive(njiveCoords) {
    njiveCoords.forEach((njivaCoords) => {
      // Nacrtaj njivu
      let polygonPath = [];
      let tempLatLng;
      njivaCoords.forEach((latLng) => {
        tempLatLng = new this.google.maps.LatLng(latLng[0], latLng[1]);
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
      let polygon = new this.google.maps.Polygon(polygonOptions);
      polygon.setMap(this.map);
    })
  }
}

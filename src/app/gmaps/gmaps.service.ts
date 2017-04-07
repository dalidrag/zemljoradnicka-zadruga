import { Injectable } from '@angular/core';
import * as GoogleMapsLoader from 'google-maps';

@Injectable()
export class GmapsService {
	public google;
	public map;

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

}

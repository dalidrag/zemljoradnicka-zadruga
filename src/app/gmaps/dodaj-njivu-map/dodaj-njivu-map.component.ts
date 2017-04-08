import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GmapsService } from '../gmaps.service';

@Component({
  selector: 'app-dodaj-njivu-map',
  templateUrl: './dodaj-njivu-map.component.html',
  styleUrls: ['./dodaj-njivu-map.component.css']
})
export class DodajNjivuMapComponent implements OnInit {
	@Output() onShapeDrawn = new EventEmitter<any>();

  constructor(private gmapsService: GmapsService) { }

  ngOnInit() {
  	if (!this.gmapsService.google) {
  		this.gmapsService.initGoogleMaps(['drawing']).then(() => {
  			this.inicijalizujMapu()
  		});
  	}
  	else
  		this.inicijalizujMapu();
  }

  /**
	 * Inicijalizuje mapu za crtanje jedne njive, kao poligona
	 *
	 * @method inicijalizujMapu
   */
  inicijalizujMapu() {
  	// Pocetne opcije za mapu, koje prikazuju celu Srbiju
  	let mapOptions = {
  		center: new this.gmapsService.google.maps.LatLng(44.404551, 20.877572), 
  		zoom: 7,
  		minZoom: 7,
  		mapTypeId: this.gmapsService.google.maps.MapTypeId.HYBRID
		};

		//Getting map DOM element
		let mapElement = document.getElementById('mapDiv') as HTMLElement;

		this.gmapsService.initMap(mapElement, mapOptions);

		let drawingManager = new this.gmapsService.google.maps.drawing.DrawingManager({
	    drawingMode: this.gmapsService.google.maps.drawing.OverlayType.POLYGON,
	    drawingControl: true,
	    drawingControlOptions: {
	      drawingModes: ['polygon']
	    },
	  });
		drawingManager.setMap(this.gmapsService.map);
  
  	let self = this;
		// dodaj event listener koji ce se aktivirati kada je crtanje poligona zavrseno
		this.gmapsService.google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
      // Prebaci se u mod bez crtackih opcija
      drawingManager.setDrawingMode(null);
      // Sakrij crtacke ikone na mapi
      drawingManager.setOptions({
        drawingControl: false
      });

      let oblikNjiveNaMapi = e.overlay;
      // oblikNjiveNaMapi.type = e.type;

      self.onShapeDrawn.emit(oblikNjiveNaMapi);
	  });
  } // kraj metoda

}

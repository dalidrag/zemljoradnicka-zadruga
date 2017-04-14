import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { GmapsService } from '../gmaps.service';

@Component({
  selector: 'app-dodaj-njivu-map',
  templateUrl: './dodaj-njivu-map.component.html',
  styleUrls: ['./dodaj-njivu-map.component.css']
})
export class DodajNjivuMapComponent implements OnInit {
	@Output() onShapeDrawn = new EventEmitter<any>();
  @Input() njive;
  static gmaps;

  constructor(private gmapsService: GmapsService) { }

  ngOnInit() {
  	if (!this.gmapsService.google) {
  		this.gmapsService.initGoogleMaps(['drawing', 'geometry']).then(() => {
        DodajNjivuMapComponent.gmaps = this.gmapsService;
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

    // Ako ima vec unetih njiva, zumiraj mapu na poslednju njivu korisnika
    if (this.njive) {
      let njiveCoords = this.njive.map((njiva) => njiva.oblikNaMapi);
      this.gmapsService.zumirajNjivu(njiveCoords[njiveCoords.length-1]);
      this.gmapsService.prikaziNjive(njiveCoords);
    }

		let drawingManager = new this.gmapsService.google.maps.drawing.DrawingManager({
	    drawingMode: this.gmapsService.google.maps.drawing.OverlayType.POLYGON,
	    drawingControl: true,
	    drawingControlOptions: {
	      drawingModes: ['polygon']
	    },
      polygonOptions: {
        strokeColor: '#A52A2A',
        strokeOpacity: 0.9,
        strokeWeight: 3,
        fillColor: '#A52A2A',
        fillOpacity: 0.25
      }
	  });
		drawingManager.setMap(this.gmapsService.map);
  
  	let self = this;
		// dodaj event listener koji ce se aktivirati kada je crtanje poligona zavrseno
		this.gmapsService.google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
      let oblikNjiveNaMapi = e.overlay;

      // konvertuj oblik njive u niz LatLng Google maps objekata
      let njivaLatLng = [];
      oblikNjiveNaMapi.getPath().forEach((element) => {
        njivaLatLng.push(new self.gmapsService.google.maps.LatLng(element.lat(), element.lng()));
      });

      // izracunaj povrsinu njive
      let area = self.gmapsService.google.maps.geometry.spherical.computeArea(njivaLatLng);

      // Prebaci se u mod bez crtackih opcija
      drawingManager.setDrawingMode(null);
      // Sakrij crtacke ikone na mapi
      drawingManager.setOptions({
        drawingControl: false
      });

      // javi parent komponenti da je njiva nacrtana i posalji koordinate
      self.onShapeDrawn.emit({oblikNjiveNaMapi, area});

	  });
  } // kraj metoda

}

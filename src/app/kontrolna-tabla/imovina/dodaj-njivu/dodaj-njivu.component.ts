/************************************************************************/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { Njiva } from '../../../deljeno/tipovi-podataka/njiva';

import { DataService } from '../../../deljeno/data.service';
import { UtilitiesService } from '../../../deljeno/utilities.service';
/************************************************************************/

/**
 * Forma za dodavanje njive
 *
 * @class DodajNjivuComponent
 */

@Component({
  selector: 'app-dodaj-njivu',
  templateUrl: './dodaj-njivu.component.html',
  styleUrls: ['./dodaj-njivu.component.css']
})
export class DodajNjivuComponent implements OnInit {
	dodajNjivuForma: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router, private utilitiesService: UtilitiesService) { }

  ngOnInit() {
  	this.dodajNjivuForma = this.fb.group({  
  		'ime': ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
  		'katOpstina': ['',  Validators.compose([Validators.required, Validators.maxLength(30)])],
  		'klasaZemljista': [''] // TODO: Write custom validator for number range 1-7
    });
  }
	
	/**
	 * Upisuje pokupljene vrednosti iz forme u bazu podataka
	 *
	 * @param formValues
	 * @method onSubmit
	 */

	onSubmit(formValues: any): void { 
		let novaNjiva = new Njiva();
		novaNjiva.ime = formValues.ime;
		novaNjiva.katOpstina = formValues.katOpstina;
		novaNjiva.klasaZemljista = formValues.klasaZemljista;

		this.dataService.dodajNjivu(novaNjiva).then(() => {
			this.router.navigate(['/kontrolna-tabla', 'imovina', {outlets: {'njive': ['njive-prikaz']}}]);
		})
		.catch(error => this.utilitiesService.handleError(error));
	}

	/**
	 * Trimuje input polja kada izgube fokus
	 *
	 * @param event:any
	 * @method onBlur
	 */
	onBlur(event: any) {
    event.target.value = event.target.value.trim();
  }

  /**
   * Listens for escape key pressed to quit the component
   *
   * @param event:any
   * @method onKey
   */
   onKey(event:any): void { // without type info
     if (event.key === 'Escape') {  // escape key was pressed
	     // Simply navigate back to njive
       this.router.navigate(['/kontrolna-tabla', 'imovina', {outlets: {'njive': ['njive-prikaz']}}]);
     } 
   }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../routing/app-routing.module';

import { KorisnickiEkranComponent } from './korisnicki-ekran/korisnicki-ekran.component';

/**
 * Ovaj modul sadrzi svu funkcionalnost vezanu za
 * licne podatke i podesavanja programa korisnika
 *
 * @class KorisnikModule
 */
@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [KorisnickiEkranComponent]
})
export class KorisnikModule { }

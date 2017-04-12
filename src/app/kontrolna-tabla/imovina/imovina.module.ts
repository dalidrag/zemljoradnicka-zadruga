import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule} from '../../routing/app-routing.module';
import { GmapsModule } from '../../gmaps/gmaps.module';

import { ImovinaPogledComponent } from './imovina-pogled/imovina-pogled.component';
import { NjiveComponent } from './njive/njive.component';
import { MasineComponent } from './masine/masine.component';
import { NjivaComponent } from './njive/njiva/njiva.component';
import { DodajNjivuComponent } from './dodaj-njivu/dodaj-njivu.component';
import { DodajMasinuComponent } from './dodaj-masinu/dodaj-masinu.component';

/**
 * Sadzi svu funkcionalost pogleda 'imovina'
 *
 * @class ImovinaModule
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GmapsModule,
  ],
  declarations: [ImovinaPogledComponent, NjiveComponent, MasineComponent, NjivaComponent, DodajNjivuComponent, DodajMasinuComponent]
})
export class ImovinaModule { }

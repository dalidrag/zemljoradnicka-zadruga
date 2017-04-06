import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule} from '../../routing/app-routing.module';

import { ImovinaPogledComponent } from './imovina-pogled/imovina-pogled.component';
import { NjiveComponent } from './njive/njive.component';
import { MasineComponent } from './masine/masine.component';
import { NjivaComponent } from './njive/njiva/njiva.component';
import { DodajNjivuComponent } from './dodaj-njivu/dodaj-njivu.component';

/**
 * Sadzi svu funkcionalost pogleda 'imovina'
 *
 * @class ImovinaModule
 */
@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ImovinaPogledComponent, NjiveComponent, MasineComponent, NjivaComponent, DodajNjivuComponent]
})
export class ImovinaModule { }

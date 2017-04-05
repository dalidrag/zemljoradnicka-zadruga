import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule} from '../../routing/app-routing.module';

import { ImovinaPogledComponent } from './imovina-pogled/imovina-pogled.component';
import { NjiveComponent } from './njive/njive.component';
import { MasineComponent } from './masine/masine.component';
import { NjivaComponent } from './njive/njiva/njiva.component';

/**
 * Ovaj modul sadzi svu funkcionalost pogleda 'imovina'
 *
 * @class ImovinaModule
 */
@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [ImovinaPogledComponent, NjiveComponent, MasineComponent, NjivaComponent]
})
export class ImovinaModule { }

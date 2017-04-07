import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GmapsService } from './gmaps.service';
import { NjivaMapComponent } from './njiva-map/njiva-map.component';
import { DodajNjivuMapComponent } from './dodaj-njivu-map/dodaj-njivu-map.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NjivaMapComponent, DodajNjivuMapComponent],
  exports: [NjivaMapComponent, DodajNjivuMapComponent],
  providers: [GmapsService]
})
export class GmapsModule { }

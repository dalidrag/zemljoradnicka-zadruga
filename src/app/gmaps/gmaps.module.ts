import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GmapsService } from './gmaps.service';
import { NjivaMapComponent } from './njiva-map/njiva-map.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NjivaMapComponent],
  exports: [NjivaMapComponent],
  providers: [GmapsService]
})
export class GmapsModule { }

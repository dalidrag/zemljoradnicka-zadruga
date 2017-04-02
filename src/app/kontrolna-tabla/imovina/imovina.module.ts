import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImovinaPogledComponent } from './imovina-pogled/imovina-pogled.component';

/**
 * Ovaj modul sadzi svu funkcionalost pogleda 'imovina'
 *
 * @class ImovinaModule
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImovinaPogledComponent]
})
export class ImovinaModule { }

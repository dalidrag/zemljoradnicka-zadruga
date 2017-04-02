import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrafikoniPogledComponent } from './grafikoni-pogled/grafikoni-pogled.component';

/**
 * Ovaj modul sadzi svu funkcionalost pogleda 'grafikoni'
 *
 * @class GrafikoniModule
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GrafikoniPogledComponent]
})
export class GrafikoniModule { }

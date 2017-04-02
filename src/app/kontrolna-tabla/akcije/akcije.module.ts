import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AkcijePogledComponent } from './akcije-pogled/akcije-pogled.component';

/**
 * Ovaj modul sadzi svu funkcionalost pogleda 'akcije'
 *
 * @class AkcijeModule
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AkcijePogledComponent]
})
export class AkcijeModule { }

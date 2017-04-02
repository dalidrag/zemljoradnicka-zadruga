import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZabeleskePogledComponent } from './zabeleske-pogled/zabeleske-pogled.component';

/**
 * Ovaj modul sadzi svu funkcionalost pogleda 'grafikoni'
 *
 * @class ZabeleskeModule
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ZabeleskePogledComponent]
})
export class ZabeleskeModule { }

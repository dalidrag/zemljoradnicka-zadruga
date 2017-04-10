import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule} from '../../routing/app-routing.module';

import { AkcijePogledComponent } from './akcije-pogled/akcije-pogled.component';
import { PosejComponent } from './posej/posej.component';

/**
 * Ovaj modul sadzi svu funkcionalost pogleda 'akcije'
 *
 * @class AkcijeModule
 */
@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [AkcijePogledComponent, PosejComponent]
})
export class AkcijeModule { }

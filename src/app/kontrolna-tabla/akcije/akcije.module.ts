import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule} from '../../routing/app-routing.module';

import { AkcijePogledComponent } from './akcije-pogled/akcije-pogled.component';
import { PosejComponent } from './posej/posej.component';
import { AkcijeListaComponent } from './akcije-lista/akcije-lista.component';
import { AkcijeNjiveComponent } from './akcije-njive/akcije-njive.component';
import { AkcijeMasineComponent } from './akcije-masine/akcije-masine.component';

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
  declarations: [AkcijePogledComponent, PosejComponent, AkcijeListaComponent, AkcijeNjiveComponent, AkcijeMasineComponent]
})
export class AkcijeModule { }

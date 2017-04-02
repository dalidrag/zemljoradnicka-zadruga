import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PocetnaStranaEkranComponent } from '../pocetna-strana/pocetna-strana-ekran/pocetna-strana-ekran.component';
import { KontrolnaTablaEkranComponent } from '../kontrolna-tabla/kontrolna-tabla-ekran/kontrolna-tabla-ekran.component';
import { KontrolnaTablaPogledComponent } from '../kontrolna-tabla/kontrolna-tabla-pogled/kontrolna-tabla-pogled.component';
import { ImovinaPogledComponent} from '../kontrolna-tabla/imovina/imovina-pogled/imovina-pogled.component';
import { AkcijePogledComponent } from '../kontrolna-tabla/akcije/akcije-pogled/akcije-pogled.component';
import { GrafikoniPogledComponent } from '../kontrolna-tabla/grafikoni/grafikoni-pogled/grafikoni-pogled.component';
import { ZabeleskePogledComponent } from '../kontrolna-tabla/zabeleske/zabeleske-pogled/zabeleske-pogled.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
 { path: '', redirectTo: '/kontrolna-tabla', pathMatch: 'full' },
 { path: 'pocetna-strana', component: PocetnaStranaEkranComponent },
 { path: 'kontrolna-tabla', component: KontrolnaTablaEkranComponent,
  canActivate: [AuthGuard], children: [
   { path: '', component: KontrolnaTablaPogledComponent },
   { path: 'imovina', component: ImovinaPogledComponent },
   { path: 'akcije', component: AkcijePogledComponent },
   { path: 'grafikoni', component: GrafikoniPogledComponent },
   { path: 'zabeleske', component: ZabeleskePogledComponent }
  ]
 }
];

/**
 * Sadrzi sve rute aplikacije
 *
 * @class AppRoutingModule
 */
@NgModule({
 imports: [ RouterModule.forRoot(routes) ],
 exports: [ RouterModule ],
 providers: [AuthGuard]
})
export class AppRoutingModule {}

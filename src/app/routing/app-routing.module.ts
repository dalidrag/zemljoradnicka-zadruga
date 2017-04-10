
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PocetnaStranaEkranComponent } from '../pocetna-strana/pocetna-strana-ekran/pocetna-strana-ekran.component';
import { KontrolnaTablaEkranComponent } from '../kontrolna-tabla/kontrolna-tabla-ekran/kontrolna-tabla-ekran.component';
import { KontrolnaTablaPogledComponent } from '../kontrolna-tabla/kontrolna-tabla-pogled/kontrolna-tabla-pogled.component';
import { ImovinaPogledComponent} from '../kontrolna-tabla/imovina/imovina-pogled/imovina-pogled.component';
import { AkcijePogledComponent } from '../kontrolna-tabla/akcije/akcije-pogled/akcije-pogled.component';
import { GrafikoniPogledComponent } from '../kontrolna-tabla/grafikoni/grafikoni-pogled/grafikoni-pogled.component';
import { ZabeleskePogledComponent } from '../kontrolna-tabla/zabeleske/zabeleske-pogled/zabeleske-pogled.component';
import { KorisnickiEkranComponent } from '../korisnik/korisnicki-ekran/korisnicki-ekran.component';
import { BrojAriComponent } from '../vodic/broj-ari/broj-ari.component';
import { PrvaNjivaComponent } from '../vodic/prva-njiva/prva-njiva.component';

import { NjiveComponent } from '../kontrolna-tabla/imovina/njive/njive.component';
import { NjivaComponent } from '../kontrolna-tabla/imovina/njive/njiva/njiva.component';
import { DodajNjivuComponent } from '../kontrolna-tabla/imovina/dodaj-njivu/dodaj-njivu.component';
import { MasineComponent } from '../kontrolna-tabla/imovina/masine/masine.component';
import { PosejComponent } from '../kontrolna-tabla/akcije/posej/posej.component';

import { NjiveResolve } from './njive-resolve.service';
import { AkcijeResolve } from './akcije-resolve.service';


import { AuthGuard } from './auth.guard';

const routes: Routes = [
 { path: '', redirectTo: '/kontrolna-tabla', pathMatch: 'full' },
 { path: 'pocetna-strana', component: PocetnaStranaEkranComponent },
 { path: 'korisnik', component: KorisnickiEkranComponent },
 { path: 'vodic-broj-ari', component: BrojAriComponent },
 { path: 'vodic-prva-njiva', component: PrvaNjivaComponent },
 { path: 'kontrolna-tabla', component: KontrolnaTablaEkranComponent,
    /* canActivate: [AuthGuard], canActivateChild: [AuthGuard], */ children: [
   { path: '', component: KontrolnaTablaPogledComponent },
   { path: 'imovina', component: ImovinaPogledComponent, children: [
    { path: 'njive-prikaz', component: NjiveComponent, outlet: 'njive', resolve: {njive: NjiveResolve} },
    { path: 'njiva-prikaz/:id', component: NjivaComponent, outlet: 'njive', resolve: {njive: NjiveResolve} },
    { path: 'dodaj-njivu', component: DodajNjivuComponent, outlet: 'njive' },
    { path: 'masine-prikaz', component: MasineComponent, outlet: 'masine' },
    ]
 	 },
   { path: 'akcije', component: AkcijePogledComponent, resolve: {aktivnosti: AkcijeResolve} },
   { path: 'posej', component: PosejComponent, resolve: {njive: NjiveResolve} },
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
 providers: [AuthGuard, NjiveResolve, AkcijeResolve]
})
export class AppRoutingModule {}

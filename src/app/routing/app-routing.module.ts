import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PocetnaStranaEkranComponent } from '../pocetna-strana/pocetna-strana-ekran/pocetna-strana-ekran.component';
import { KontrolnaTablaEkranComponent } from '../kontrolna-tabla/kontrolna-tabla-ekran/kontrolna-tabla-ekran.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
 { path: '', redirectTo: '/kontrolna-tabla', pathMatch: 'full' },
 { path: 'pocetna-strana', component: PocetnaStranaEkranComponent },
 { path: 'kontrolna-tabla', component: KontrolnaTablaEkranComponent,
  canActivate: [AuthGuard] }
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

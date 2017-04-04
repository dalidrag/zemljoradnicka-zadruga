import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './routing/app-routing.module';
import { ImovinaModule } from './kontrolna-tabla/imovina/imovina.module';
import { AkcijeModule } from './kontrolna-tabla/akcije/akcije.module';
import { GrafikoniModule } from './kontrolna-tabla/grafikoni/grafikoni.module';
import { ZabeleskeModule } from './kontrolna-tabla/zabeleske/zabeleske.module';
import { KorisnikModule } from './korisnik/korisnik.module';

import { AuthService } from './deljeno/auth.service';

import { PocetnaStranaEkranComponent } from './pocetna-strana/pocetna-strana-ekran/pocetna-strana-ekran.component';
import { KontrolnaTablaEkranComponent } from './kontrolna-tabla/kontrolna-tabla-ekran/kontrolna-tabla-ekran.component';
import { StatusnaTablaComponent } from './kontrolna-tabla/statusna-tabla/statusna-tabla.component';
import { MeniTablaComponent } from './kontrolna-tabla/meni-tabla/meni-tabla.component';
import { KontrolnaTablaPogledComponent } from './kontrolna-tabla/kontrolna-tabla-pogled/kontrolna-tabla-pogled.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaStranaEkranComponent,
    KontrolnaTablaEkranComponent,
    StatusnaTablaComponent,
    MeniTablaComponent,
    KontrolnaTablaPogledComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImovinaModule,
    AkcijeModule,
    GrafikoniModule,
    ZabeleskeModule,
    KorisnikModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

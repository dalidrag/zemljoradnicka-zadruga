import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './routing/app-routing.module';
import { ImovinaModule } from './kontrolna-tabla/imovina/imovina.module';
import { AkcijeModule } from './kontrolna-tabla/akcije/akcije.module';
import { GrafikoniModule } from './kontrolna-tabla/grafikoni/grafikoni.module';
import { ZabeleskeModule } from './kontrolna-tabla/zabeleske/zabeleske.module';
import { KorisnikModule } from './korisnik/korisnik.module';

import { AuthService } from './deljeno/auth.service';
import { DataService } from './deljeno/data.service';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './deljeno/in-memory-db';

import { UtilitiesService } from './deljeno/utilities.service';

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
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    ImovinaModule,
    AkcijeModule,
    GrafikoniModule,
    ZabeleskeModule,
    KorisnikModule
  ],
  providers: [AuthService, DataService, UtilitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

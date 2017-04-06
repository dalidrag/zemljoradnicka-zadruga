import { TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-db';

import { DataService } from './data.service';
import { Njiva } from './tipovi-podataka/njiva';

describe('DataService', () => {
	let service: DataService;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [
      	HttpModule,
       	InMemoryWebApiModule.forRoot(InMemoryDataService)
      ],
      providers: [DataService]
    });
    service = injector.get(DataService);
  });

  it('should be a service', () => {
    expect(service).toBeTruthy();
  });
  it('should have preuzmiNjive() method', () => {
  	expect(service.preuzmiNjive).toBeDefined();
  });
  describe('preuzmiNjive() metod', () => {
  	it('should return a Promise', () => {
  		expect(service.preuzmiNjive() instanceof Promise).toBeTruthy();
  	});
  	it('should return Njiva[] data as a Promise<Njiva[]>, where Njiva array has the length of 2', (done) => {
			service.preuzmiNjive().then((njive) => {
				expect(njive.length).toBe(2);
				done();
			})
  	});
  	it('should return Njiva[0].id with value of 1', (done) => {
			service.preuzmiNjive().then((njive) => {
				expect(njive[0].id.toString()).toBe('1');
				done();
			})
  	});
  });
  
  it('should have dodajNjivu() method', () => {
    expect(service.dodajNjivu).toBeDefined();
  });
  describe('dodajNjivu() metod', () => {
    let novaNjiva: Njiva = new Njiva();
    novaNjiva.ime = "Лева";
    novaNjiva.katOpstina = "Добрица";
    novaNjiva.klasaZemljista = 6;
    it('should return a Promise', () => {
      expect(service.dodajNjivu(novaNjiva) instanceof Promise).toBeTruthy();
    });
    it('should return id as a part of return value', (done) => {
      service.dodajNjivu(novaNjiva).then((dodataNjiva) => {
        expect(dodataNjiva.id).toBeDefined();
        done();
      })
    });
    it('should add a new njiva', (done) => {
      service.dodajNjivu(novaNjiva)
        .then(() => service.preuzmiNjive())
        .then((njive) => {
          expect(njive.length).toBe(3);
          done();
        });
    });
  });

});

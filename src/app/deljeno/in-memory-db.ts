import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let njive = [
      {id: 1, ime: 'Задња', katOpstina: 'Добрица', klasaZemljista: 7},
      {id: 2, ime: 'Предња', katOpstina: 'Добрица', klasaZemljista: 5},
    ];
    let aktivnosti = [];
    return {njive, aktivnosti};
  }
}
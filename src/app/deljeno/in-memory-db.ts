import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let njive = [
      {id: 1, ime: 'Задња', katOpstina: 'Добрица', klasaZemljista: 7, usevi:[] },
      {id: 2, ime: 'Предња', katOpstina: 'Добрица', klasaZemljista: 5, usevi:[] },
    ];
    let aktivnosti = [];
    return {njive, aktivnosti};
  }
}
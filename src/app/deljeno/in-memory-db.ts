import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let vrsteUseva = [
    	{id: 1, ime: "Пшеница", srcSlike: 'vrste-useva/psenica.jpg' },
    	{id: 2, ime: "Кукуруз", srcSlike: 'vrste-useva/kukuruz.jpg' },
    	{id: 3, ime: "Соја", srcSlike: 'vrste-useva/soja.jpg' },
    	{id: 4, ime: "Пасуљ", srcSlike: 'vrste-useva/pasulj.jpg' },
    	{id: 5, ime: "Мак", srcSlike: 'vrste-useva/mak.jpg' },
    	{id: 6, ime: "Сунцокрет", srcSlike: 'vrste-useva/suncokret.jpg' }
    ];
    let njive = [
      {id: 1, ime: 'Задња', katOpstina: 'Добрица', klasaZemljista: 7, usevi:[] },
      {id: 2, ime: 'Предња', katOpstina: 'Добрица', klasaZemljista: 5, usevi:[] },
    ];
    let aktivnosti = [];
    return {njive, aktivnosti, vrsteUseva};
  }
}
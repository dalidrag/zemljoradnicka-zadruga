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
    let njive = [];
    let aktivnosti = [];
    let tipoviMasina = [
      {id: 1, naziv: "Трактор", srcSlike: 'masine/traktor.jpg' },
      {id: 2, naziv: "Комбајн", srcSlike: 'masine/kombajn.jpg' },
      {id: 3, naziv: "Мотокултиватор", srcSlike: 'masine/motokultivator.jpg' },
      {id: 4, naziv: "Додатак за трактор: плуг грабуље за копачицу", srcSlike: 'masine/plug-grabulje-za-kopacicu.jpg'},
      {id: 5, naziv: "Комбајн сунцокретни адаптер", srcSlike: 'masine/kombajn-suncokretni-adapter.jpg' },
      {id: 6, naziv: "Прскалица прикључак за мотокултиватор", srcSlike: 'masine/prikljucak-prskalica.jpg' }
    ];
    let masine = [];
    return {njive, aktivnosti, vrsteUseva, tipoviMasina, masine};
  }
}
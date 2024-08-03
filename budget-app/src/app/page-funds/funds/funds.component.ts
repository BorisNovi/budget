import { Component } from '@angular/core';
import { CurrencyService } from 'src/app/common';
import { IFund } from '../models/funds.model';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent {
  public fundsSum = 1000.25;
  public funds: IFund[] = [
    { id: 1, sum: 100500, name: 'demo main vallet' },
    { id: 2, sum: 42, name: 'demo sub vallet' },
    { id: 3, sum: 1345, name: 'demo vallet-x' }
  ];

  constructor(public cs: CurrencyService) {}

  // TODO: сделать добавление и удаление счетов, Суммирование всех денег и +&- из определенного кошелька.
}

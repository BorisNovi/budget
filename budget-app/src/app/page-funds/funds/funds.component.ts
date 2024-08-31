import { Component } from '@angular/core';
import {
  CurrencyService, ExpenceTypeKey, IAdd, LocalService
} from 'src/app/common';
import { TuiDay } from '@taiga-ui/cdk';
import { IFund } from '../models/funds.model';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss'],
})
export class FundsComponent {
  public fundsSum = 0;
  public funds: IFund[] = [{ id: 1, sum: 0, name: 'Main vallet' }];

  constructor(
    public cs: CurrencyService,
    public localService: LocalService
  ) {
    const startDate = new TuiDay(2000, 0, 1);
    const expences = this.localService.getRangeSortedList(ExpenceTypeKey.EXPENCE, startDate);
    const incomes = this.localService.getRangeSortedList(ExpenceTypeKey.INCOME, startDate);

    const diff = this.getSum(incomes) - this.getSum(expences);
    this.funds[0].sum = +diff.toFixed(2);

    this.fundsSum = this.funds.reduce((accumulator, fund) => accumulator + fund.sum, 0);
  }

  public getSum(arr: IAdd[]): number {
    let sum = 0;
    sum = arr.reduce((accumulator, item) => accumulator + item.amount, 0);

    return sum;
  }

  // TODO: сделать добавление и удаление счетов, Суммирование всех денег и +&- из определенного кошелька.
}

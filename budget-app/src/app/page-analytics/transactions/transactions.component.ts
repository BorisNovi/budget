import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ExpenceTypeKey } from 'src/app/core/enums';
import { IAdd } from 'src/app/core/models/add.model';
import { CalendarLocalService } from 'src/app/core/services/calendar-local.service';
import { LocalService } from 'src/app/core/services/local.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsComponent implements OnInit {
  public transactionList: IAdd[] = [];
  constructor(private localService: LocalService, private calendarLocalService: CalendarLocalService) {}

  ngOnInit(): void {
    const { savedRange } = this.calendarLocalService; // TODO: В будущем перенести запрос в резолвер
    this.transactionList = this.localService.getRangeSortedList(ExpenceTypeKey.EXPENCE, savedRange.from, savedRange.to);

    console.log(savedRange);
    console.log(this.transactionList);
  }
}

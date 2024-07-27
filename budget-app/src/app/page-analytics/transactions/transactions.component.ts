import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
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
  public expenceTypeKey: ExpenceTypeKey = ExpenceTypeKey.EXPENCE;
  constructor(private route: ActivatedRoute, private router: Router, private destroyRef: DestroyRef, private localService: LocalService, private calendarLocalService: CalendarLocalService) { }

  ngOnInit(): void {
    const { savedRange } = this.calendarLocalService;
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        console.log(params);

        if (params['expenceTypeKey']) {
          this.expenceTypeKey = params['expenceTypeKey'];
        }
      });
    // TODO: В будущем перенести запрос в резолвер, или прокидывать данные через роут
    this.transactionList = this.localService.getRangeSortedList(this.expenceTypeKey, savedRange.from, savedRange.to);

    console.log(savedRange);
    console.log(this.transactionList);
  }
}

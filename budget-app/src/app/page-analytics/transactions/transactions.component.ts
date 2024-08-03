import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  IAdd, CalendarLocalService, LocalService, ExpenceTypeKey,
  CurrencyService
} from 'src/app/common';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsComponent implements OnInit {
  public transactionList: IAdd[] = [];
  public expenceTypeKey: ExpenceTypeKey = ExpenceTypeKey.EXPENCE;
  public showDeleteTemplateIndex = new BehaviorSubject(-1);
  public isDeleteAllowed = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destroyRef: DestroyRef,
    private localService: LocalService,
    public calendarLocalService: CalendarLocalService,
    public cs: CurrencyService
  ) { }

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

  public wannaDelete(index: number): void {
    this.showDeleteTemplateIndex.next(index);
  }

  public delete(transaction: IAdd): void {
    console.log(transaction);
  }
}

import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
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
    private destroyRef: DestroyRef,
    private localService: LocalService,
    public calendarLocalService: CalendarLocalService,
    public cs: CurrencyService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        if (params['expenceTypeKey']) {
          this.expenceTypeKey = params['expenceTypeKey'];
        }
      });

    this.updateTransactionsList();
  }

  private updateTransactionsList(): void {
    const { savedRange } = this.calendarLocalService;
    this.transactionList = this.localService.getRangeSortedList(this.expenceTypeKey, savedRange.from, savedRange.to);
  }

  public wannaDelete(index: number): void {
    this.showDeleteTemplateIndex.next(index);
  }

  public delete(id: number, date: string): void {
    this.localService.remove(this.expenceTypeKey, id, date);
    this.updateTransactionsList();
  }
}

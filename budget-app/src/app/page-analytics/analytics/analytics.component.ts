import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalService } from 'src/app/core/services/local.service';
import {
  TuiDay, TuiDayRange, TuiMonth, tuiSum
} from '@taiga-ui/cdk';
import { ExpenceCategory, IncomeCategory, ExpenceTypeKey } from 'src/app/core/enums';
import { tuiCreateDefaultDayRangePeriods } from '@taiga-ui/kit';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent {
  // Dates
  private today = TuiDay.currentLocal();
  private firstDayOfMonth = new TuiDay(this.today.year, this.today.month, 1);
  private daysInMonth = new TuiMonth(this.today.year, this.today.month).daysCount;
  private lastDayOfMonth = new TuiDay(this.today.year, this.today.month, this.daysInMonth);
  private currentMonthRange = new TuiDayRange(this.firstDayOfMonth, this.lastDayOfMonth);

  // Other
  public dataForAnalytics = this.localService.getRangeSortedList(ExpenceTypeKey.EXPENCE, this.currentMonthRange.from, this.currentMonthRange.to);
  public expenceForm: FormControl = new FormControl(ExpenceTypeKey.EXPENCE);
  readonly expenceItem = ExpenceTypeKey.EXPENCE;
  readonly incomeItem = ExpenceTypeKey.INCOME;

  constructor(private localService: LocalService) {
    this.expenceForm.valueChanges.subscribe((val) => {
      this.getData(val);
    });
  }

  // Dropdown
  public open = false;

  public onDateSelectClick(): void {
    this.open = !this.open;
  }

  public onDateObscured(obscured: boolean): void {
    if (obscured) {
      this.open = false;
    }
  }

  public onDateActiveZone(active: boolean): void {
    this.open = active && this.open;
  }

  // Calendar
  public items = tuiCreateDefaultDayRangePeriods().filter(((item) => item['name'] !== 'For all the time'));

  public calendarValue = this.currentMonthRange;

  public onRangeChange(value: TuiDayRange | null) {
    this.calendarValue = value || this.currentMonthRange;
    this.getData(this.expenceForm.value);
  }

  // Analytics
  public labelsOfExpences = Object.values(ExpenceCategory);
  public sumsOfExpences = this.fillAnalytics();
  public total = tuiSum(...this.sumsOfExpences);

  private getData(expenceType: ExpenceTypeKey): void {
    this.dataForAnalytics = this.localService.getRangeSortedList(expenceType, this.calendarValue.from, this.calendarValue.to);
    this.labelsOfExpences = Object.values(expenceType === ExpenceTypeKey.EXPENCE ? ExpenceCategory : IncomeCategory);
    this.sumsOfExpences = this.fillAnalytics();
    this.total = tuiSum(...this.sumsOfExpences);
  }

  public fillAnalytics(): number[] {
    const sums: number[] = [];

    this.labelsOfExpences.forEach((label) => {
      if (this.dataForAnalytics) {
        sums.push(this.dataForAnalytics
          .filter(((item) => item.category === label))
          .map((item) => item.amount)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0));
      } else {
        sums.push(0);
      }
    });

    return sums;
  }
}

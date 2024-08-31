import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LocalService, CalendarLocalService, ExpenceCategory, IncomeCategory, ExpenceTypeKey
} from 'src/app/common';
import { TuiDay, TuiDayRange, TuiMonth, tuiSum } from '@taiga-ui/cdk';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent {
  // Dates
  private currentMonthRange = this.calendarLocalService.currentMonthRange;

  public calendarValue = this.calendarLocalService.savedRange || this.calendarLocalService.currentMonthRange;
  public dateDialogOpen = false;

  protected firstMonth = TuiMonth.currentLocal();
  protected hoveredItem: TuiDay | null = null;

  protected onDayClick(day: TuiDay): void {
    if (!this.calendarValue?.isSingleDay) {
      this.calendarValue = new TuiDayRange(day, day);
    }

    this.calendarValue = TuiDayRange.sort(this.calendarValue.from, day);
    this.calendarLocalService.saveRange(this.calendarValue);
  }

  // Other
  public dataForAnalytics = this.localService.getRangeSortedList(ExpenceTypeKey.EXPENCE, this.currentMonthRange.from, this.currentMonthRange.to);
  public expenceForm: FormControl = new FormControl(ExpenceTypeKey.EXPENCE);
  readonly expenceItem = ExpenceTypeKey.EXPENCE;
  readonly incomeItem = ExpenceTypeKey.INCOME;

  constructor(private localService: LocalService, private calendarLocalService: CalendarLocalService) {
    this.expenceForm.valueChanges.subscribe((val) => {
      this.getData(val);
    });
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

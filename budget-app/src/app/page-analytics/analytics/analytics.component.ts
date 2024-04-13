import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalService } from 'src/app/core/services/local.service';
import {
  TuiDay, TuiDayRange, TuiMonth, tuiSum
} from '@taiga-ui/cdk';
import { ExpencesCategories, IncomeCategories } from 'src/app/core/enums/categories.enum';
import { tuiCreateDefaultDayRangePeriods } from '@taiga-ui/kit';
import { FormControl } from '@angular/forms';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { ExpenceType } from '../../core/models/add.model';
import { BehaviorSubject } from 'rxjs';

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
  private dataForAnalytics = this.localService.get(ExpenceType.expence, this.currentMonthRange.from, this.currentMonthRange.to);
  public expenceForm: FormControl = new FormControl(ExpenceType.expence);
  readonly expenceItem = ExpenceType.expence;
  readonly incomeItem = ExpenceType.income;

  constructor(private localService: LocalService, public cs: CurrencyService) {
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
  public items = tuiCreateDefaultDayRangePeriods();
  public calendarValue = this.currentMonthRange;

  public onRangeChange(value: TuiDayRange | null) {
    console.log('onRangeChange');

    this.calendarValue = value || this.currentMonthRange;
    this.getData(this.expenceForm.value);
  }

  // Analytics
  public activeItemIndex = NaN;
  public labelsOfExpences = Object.values(ExpencesCategories);
  public sumsOfExpences = this.fillAnalytics();
  public sum = tuiSum(...this.sumsOfExpences);

  private getData(expenceType: ExpenceType): void {
    console.log('getData');

    this.dataForAnalytics = this.localService.get(expenceType, this.calendarValue.from, this.calendarValue.to);
    this.labelsOfExpences = Object.values(expenceType === ExpenceType.expence ? ExpencesCategories : IncomeCategories);
    this.sumsOfExpences = this.fillAnalytics();
    this.sum = tuiSum(...this.sumsOfExpences);
  }

  public fillAnalytics(): number[] {
    console.log('fillAnalytics');

    const sums: number[] = [];
    this.labelsOfExpences.forEach((label) => {
      sums.push(this.dataForAnalytics['result']
        .filter(((item) => item.category === label))
        .map((item) => item.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    });

    return sums;
  }

  public isItemActive(index: number): boolean {
    return this.activeItemIndex === index;
  }

  public onHover(index: number, hovered: boolean): void {
    this.activeItemIndex = hovered ? index : 0;
  }

  public getColor(index: number): string {
    const maxColors = 10;
    const currentIndex = index > maxColors ? index - maxColors : index;
    return `var(--tui-chart-${currentIndex})`;
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalService } from 'src/app/core/services/local.service';
import { TuiDay, TuiDayRange, TuiMonth, tuiSum } from '@taiga-ui/cdk';
import { ExpencesCategories } from 'src/app/core/enums/categories.enum';
import { tuiCreateDefaultDayRangePeriods } from '@taiga-ui/kit';
import { ExpenceType } from '../../core/models/add.model';

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

  constructor(private localService: LocalService) {
    console.log('expences:', this.localService.get(ExpenceType.expence, this.firstDayOfMonth));
    // console.log('incomes:', this.localService.get(ExpenceType.income));

    // TODO: сделать так, чтобы введя диапазон, можно было выбрать траты за этот период.
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
    this.calendarValue = value || this.currentMonthRange;
  }

  // Analytics
  readonly testData = this.localService.get(ExpenceType.expence);
  readonly out = Object.values(this.testData);
  readonly labels = Object.values(ExpencesCategories);
  public activeItemIndex = NaN;

  readonly value = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  readonly sum = tuiSum(...this.value);

  isItemActive(index: number): boolean {
    return this.activeItemIndex === index;
  }

  onHover(index: number, hovered: boolean): void {
    this.activeItemIndex = hovered ? index : 0;
  }

  getColor(index: number): string {
    return `var(--tui-chart-${index})`;
  }
}

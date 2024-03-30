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

  private dataForAnalytics = this.localService.get(ExpenceType.expence, this.currentMonthRange.from, this.currentMonthRange.to);

  constructor(private localService: LocalService) {
    console.log(this.dataForAnalytics['res']);

    console.log(this.dataForAnalytics['res'].filter(((item) => item.category === 'rent')));
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

    // TODO: добавить переключение трат и поступлений. Исправить ошибку, если выбрана произвольная дата.
    this.dataForAnalytics = this.localService.get(ExpenceType.expence, value?.from, value?.to);

    this.value = this.fillAnalytics();
    this.sum = tuiSum(...this.value);
  }

  // Analytics
  public activeItemIndex = NaN;
  readonly labels = Object.values(ExpencesCategories);
  public value = this.fillAnalytics();
  public sum = tuiSum(...this.value);

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

  public fillAnalytics(): number[] {
    const sums: number[] = [];
    this.labels.forEach((label) => {
      sums.push(this.dataForAnalytics['res']
        .filter(((item) => item.category === label))
        .map((item) => item.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    });

    return sums;
  }
}

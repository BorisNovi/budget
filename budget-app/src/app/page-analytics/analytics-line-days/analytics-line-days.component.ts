import {
  AfterContentInit, Component, Inject, Input,
} from '@angular/core';
import {
  TUI_IS_E2E,
  TuiDay,
  TuiDayRange,
  TuiMonth,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import { TUI_MONTHS } from '@taiga-ui/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAdd } from 'src/app/core/models/add.model';
import { CurrencyService } from 'src/app/core/services/currency.service';

@Component({
  selector: 'app-analytics-line-days',
  templateUrl: './analytics-line-days.component.html',
  styleUrls: ['./analytics-line-days.component.scss'],
})
export class AnalyticsLineDaysComponent implements AfterContentInit {
  @Input() public dataForAnalyics!: { [timestamp: string]: IAdd[] };
  @Input() public range!: TuiDayRange;

  public maxValue = 0;

  readonly xStringify$: Observable<TuiStringHandler<TuiDay>> = this.months$.pipe(
    map(
      (months) => ({ month, day }) => `${months[month]}, ${day}`,
    ),
  );

  constructor(
    public cs: CurrencyService,
    @Inject(TUI_MONTHS) private readonly months$: Observable<readonly string[]>,
    @Inject(TUI_IS_E2E) readonly isE2E: boolean,
  ) {}

  public ngAfterContentInit(): void {
    this.computeValue(this.range, this.dataForAnalyics);
  }

  get value(): ReadonlyArray<[TuiDay, number]> {
    return this.computeValue(this.range, this.dataForAnalyics);
  }

  @tuiPure
  computeLabels$({ from, to }: TuiDayRange): Observable<readonly string[]> {
    return this.months$.pipe(
      map((months) => Array.from(
        { length: TuiMonth.lengthBetween(from, to) + 1 },
        (_, i) => months[from.append({ month: i }).month],
      ),),
    );
  }

  readonly yStringify: TuiStringHandler<number> = (y) => `${(y).toLocaleString('en-US', { maximumFractionDigits: 0 })} ${this.cs.currency}`;

  @tuiPure
  private computeValue({ from, to }: TuiDayRange, data: { [timestamp: string]: IAdd[] }): ReadonlyArray<[TuiDay, number]> {
    const dataForAnalytics = data['result'];
    const groupedData = new Map<string, number>();

    if (!dataForAnalytics.length) {
      return [[TuiDay.currentLocal(), 0] as [TuiDay, number]];
    }

    dataForAnalytics.forEach((item) => {
      const { dateStr, amount } = item;

      if (groupedData.has(dateStr)) {
        groupedData.set(dateStr, (groupedData.get(dateStr) || 0) + amount);
      } else {
        groupedData.set(dateStr, amount);
      }
    });

    this.maxValue = Array.from(groupedData).reduce((maxValue, obj) => Math.max(maxValue, obj[1]), -Infinity);

    const allDays = Array.from({ length: TuiDay.lengthBetween(from, to) + 1 }, (_, i) => from.append({ day: i }).toJSON());

    const convertedData = allDays.map((day) => {
      const amount = groupedData.get(day) || 0;
      return [TuiDay.fromLocalNativeDate((new Date(day))), amount] as [TuiDay, number];
    });

    return convertedData;
  }
}

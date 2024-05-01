import {
  AfterContentInit,
  ChangeDetectionStrategy, Component, Inject, Input
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
  changeDetection: ChangeDetectionStrategy.OnPush
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
    this.computeValue(this.range);
  }

  get value(): ReadonlyArray<[TuiDay, number]> {
    return this.computeValue(this.range);
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
  private computeValue({ from, to }: TuiDayRange): ReadonlyArray<[TuiDay, number]> {
    const dataForAnalytics = this.dataForAnalyics['result'];
    const groupedData = new Map<string, number>();

    dataForAnalytics.forEach((item) => {
      const { dateStr, amount } = item;

      if (groupedData.has(dateStr)) {
        groupedData.set(dateStr, (groupedData.get(dateStr) || 0) + amount);
      } else {
        groupedData.set(dateStr, amount);
      }
    });

    // TODO: Починить maxValue, чтобы оно работало сразу при переключении, а не при наведении. Убирать этот график, если выбран не месяц.
    // Решить проблему с всем периодом времени, или вообще убрать его.
    this.maxValue = Array.from(groupedData).reduce((maxValue, obj) => Math.max(maxValue, obj[1]), -Infinity);

    const allDays = Array.from({ length: TuiDay.lengthBetween(from, to) + 1 }, (_, i) => from.append({ day: i }).toJSON());

    const convertedData = allDays.map((day) => {
      const amount = groupedData.get(day) || 0;
      return [TuiDay.fromLocalNativeDate((new Date(day))), amount] as [TuiDay, number];
    });

    console.log(convertedData);

    // const mockData = new Array(TuiDay.lengthBetween(from, to) + 1)
    //   .fill(0)
    //   .reduce<ReadonlyArray<[TuiDay, number]>>(
    //   (array, _, i) => [
    //     ...array,
    //     [
    //       from.append({ day: i }),
    //       this.isE2E
    //         ? 100
    //         : (i ? array[i - 1][1] : 100) + Math.random() * 10 - 5,
    //     ],
    //   ],
    //   [],
    // );

    return convertedData;
  }
}

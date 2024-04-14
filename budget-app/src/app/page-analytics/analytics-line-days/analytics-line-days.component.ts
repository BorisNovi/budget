import {
  ChangeDetectionStrategy, Component, Inject, Input
} from '@angular/core';
import {
  TUI_IS_E2E,
  TuiDay,
  TuiDayLike,
  TuiDayRange,
  TuiMonth,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import { TUI_MONTHS } from '@taiga-ui/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-analytics-line-days',
  templateUrl: './analytics-line-days.component.html',
  styleUrls: ['./analytics-line-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsLineDaysComponent {
  @Input() public sumsOfExpences!: number[];
  @Input() public labelsOfExpences!: string[];

  range = new TuiDayRange(
    TuiDay.currentLocal(),
    TuiDay.currentLocal().append({ month: 6 }),
  );

  readonly maxLength: TuiDayLike = { month: 12 };

  readonly xStringify$: Observable<TuiStringHandler<TuiDay>> = this.months$.pipe(
    map(
      (months) => ({ month, day }) => `${months[month]}, ${day}`,
    ),
  );

  constructor(
    @Inject(TUI_MONTHS) private readonly months$: Observable<readonly string[]>,
    @Inject(TUI_IS_E2E) readonly isE2E: boolean,
  ) {}

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

  readonly yStringify: TuiStringHandler<number> = (y) => `${(10 * y).toLocaleString('en-US', { maximumFractionDigits: 0 })} $`;

  @tuiPure
  private computeValue({ from, to }: TuiDayRange): ReadonlyArray<[TuiDay, number]> {
    return new Array(TuiDay.lengthBetween(from, to) + 1)
      .fill(0)
      .reduce<ReadonlyArray<[TuiDay, number]>>(
      (array, _, i) => [
        ...array,
        [
          from.append({ day: i }),
          this.isE2E
            ? 100
            : (i ? array[i - 1][1] : 100) + Math.random() * 10 - 5,
        ],
      ],
      [],
    );
  }
}

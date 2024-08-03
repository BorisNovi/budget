import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrencyService } from 'src/app/common';

@Component({
  selector: 'app-analytics-ring-legend',
  templateUrl: './analytics-ring-legend.component.html',
  styleUrls: ['./analytics-ring-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsRingLegendComponent {
  @Input() public sumsOfExpences!: number[];
  @Input() public labelsOfExpences!: string[];
  @Input() public total!: number;

  public activeItemIndex = NaN;

  constructor(public cs: CurrencyService) {}

  public isItemActive(index: number): boolean {
    return this.activeItemIndex === index;
  }

  public onHover(index: number, hovered: boolean): void {
    this.activeItemIndex = hovered ? index : NaN;
  }

  public getColor(index: number): string {
    const maxColors = 10;
    const currentIndex = index > maxColors ? index - maxColors : index;
    return `var(--tui-chart-${currentIndex})`;
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalService } from 'src/app/core/services/local.service';
import { tuiSum } from '@taiga-ui/cdk';
import { ExpencesCategories } from 'src/app/core/enums/categories.enum';
import { ExpenceType } from '../../core/models/add.model';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent {
  readonly labels = Object.values(ExpencesCategories);
  constructor(private localService: LocalService) {
    console.log('expences:', this.localService.get(ExpenceType.expence));
    console.log('incomes:', this.localService.get(ExpenceType.income));
  }

  activeItemIndex = NaN;

  readonly value = [13769, 12367, 10172, 3018, 2592, 2324, 34343, 34324, 3343];
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

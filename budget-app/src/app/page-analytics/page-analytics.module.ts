import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiCalendarRangeModule, TuiIslandModule } from '@taiga-ui/kit';
import { TuiLegendItemModule, TuiRingChartModule } from '@taiga-ui/addon-charts';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiActiveZoneModule, TuiHoveredModule, TuiObscuredModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiDropdownModule } from '@taiga-ui/core';
import { AnalyticsComponent } from './analytics/analytics.component';

const routes = [
  { path: '', component: AnalyticsComponent },
];
@NgModule({
  declarations: [
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    TuiIslandModule,
    TuiLegendItemModule,
    TuiMoneyModule,
    TuiRingChartModule,
    TuiHoveredModule,
    TuiDropdownModule,
    TuiButtonModule,
    TuiCalendarRangeModule,
    TuiObscuredModule,
    TuiActiveZoneModule,
    RouterModule.forChild(routes),
  ]
})
export class PageAnalyticsModule { }

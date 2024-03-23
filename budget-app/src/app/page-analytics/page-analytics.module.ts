import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiLegendItemModule, TuiRingChartModule } from '@taiga-ui/addon-charts';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiHoveredModule } from '@taiga-ui/cdk';
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
    RouterModule.forChild(routes),
  ]
})
export class PageAnalyticsModule { }

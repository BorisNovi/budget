import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiArcChartModule, TuiBarModule, TuiLegendItemModule, TuiRingChartModule } from '@taiga-ui/addon-charts';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiHoveredModule } from '@taiga-ui/cdk';

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
    TuiBarModule,
    TuiMoneyModule,
    TuiRingChartModule,
    TuiHoveredModule,
    RouterModule.forChild(routes),
  ]
})
export class PageAnalyticsModule { }

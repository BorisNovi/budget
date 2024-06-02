import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiCalendarRangeModule, TuiIslandModule, TuiRadioBlockModule } from '@taiga-ui/kit';
import {
  TuiAxesModule, TuiLegendItemModule, TuiLineDaysChartModule, TuiRingChartModule
} from '@taiga-ui/addon-charts';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiActiveZoneModule, TuiHoveredModule, TuiObscuredModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiDropdownModule, TuiGroupModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AnalyticsRingLegendComponent } from './analytics-ring-legend/analytics-ring-legend.component';
import { AnalyticsLineDaysComponent } from './analytics-line-days/analytics-line-days.component';

const routes = [
  { path: '', component: AnalyticsComponent },
];

const tuiImports = [
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
  TuiGroupModule,
  TuiRadioBlockModule,
  TuiAxesModule,
  TuiLineDaysChartModule,
];
@NgModule({
  declarations: [
    AnalyticsComponent,
    AnalyticsRingLegendComponent,
    AnalyticsLineDaysComponent
  ],
  imports: [
    CommonModule,
    tuiImports,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class PageAnalyticsModule { }

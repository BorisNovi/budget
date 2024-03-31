import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiCalendarRangeModule, TuiIslandModule, TuiRadioBlockModule } from '@taiga-ui/kit';
import { TuiLegendItemModule, TuiRingChartModule } from '@taiga-ui/addon-charts';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiActiveZoneModule, TuiHoveredModule, TuiObscuredModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiDropdownModule, TuiGroupModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalyticsComponent } from './analytics/analytics.component';

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
];
@NgModule({
  declarations: [
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    tuiImports,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class PageAnalyticsModule { }

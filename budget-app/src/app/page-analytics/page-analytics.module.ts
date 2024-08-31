import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiCalendarRangeModule, TuiIslandModule, TuiRadioBlockModule } from '@taiga-ui/kit';
import {
  TuiAxesModule, TuiLegendItemModule, TuiLineDaysChartModule, TuiRingChartModule
} from '@taiga-ui/addon-charts';
import { TuiCurrencyPipeModule, TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiActiveZoneModule, TuiHoveredModule, TuiObscuredModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule, TuiCalendarModule, TuiDialogModule, TuiDropdownModule, TuiGroupModule
} from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AnalyticsRingLegendComponent } from './analytics-ring-legend/analytics-ring-legend.component';
import { AnalyticsLineDaysComponent } from './analytics-line-days/analytics-line-days.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ShortNumsPipe } from '../common';

const routes = [
  { path: '', component: AnalyticsComponent },
  { path: 'transactions', component: TransactionsComponent }
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
  TuiCurrencyPipeModule,
  TuiTableModule,
  TuiDialogModule,
  TuiCalendarModule
];
@NgModule({
  declarations: [
    AnalyticsComponent,
    AnalyticsRingLegendComponent,
    AnalyticsLineDaysComponent,
    TransactionsComponent,
  ],
  imports: [
    CommonModule,
    tuiImports,
    ReactiveFormsModule,
    ShortNumsPipe,
    RouterModule.forChild(routes),
  ]
})
export class PageAnalyticsModule { }

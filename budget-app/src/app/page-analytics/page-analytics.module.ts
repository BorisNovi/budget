import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
    RouterModule.forChild(routes),
  ]
})
export class PageAnalyticsModule { }

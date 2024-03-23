import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FundsComponent } from './funds/funds.component';

const routes = [
  { path: '', component: FundsComponent },
];
@NgModule({
  declarations: [
    FundsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PageFundsModule { }

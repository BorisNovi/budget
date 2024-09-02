import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { TranslateModule } from '@ngx-translate/core';
import { FundsComponent } from './funds/funds.component';

const routes = [{ path: '', component: FundsComponent }];
@NgModule({
  declarations: [FundsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TuiIslandModule, TuiCurrencyPipeModule, TranslateModule],
})
export class PageFundsModule {}

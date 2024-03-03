import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule, TUI_SANITIZER,
  TuiThemeNightModule, TuiModeModule
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PageAddModule } from './page-add/page-add.module';
import { PageAnalyticsModule } from './page-analytics/page-analytics.module';
import { PageSettingsModule } from './page-settings/page-settings.module';
import { PageFundsModule } from './page-funds/page-funds.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    PageAddModule,
    PageFundsModule,
    PageAnalyticsModule,
    PageSettingsModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiThemeNightModule,
    TuiModeModule,
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent]
})
export class AppModule { }

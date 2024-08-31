import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule, TUI_SANITIZER, TuiThemeNightModule, TuiModeModule
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PageAddModule } from './page-add/page-add.module';
import { PageAnalyticsModule } from './page-analytics/page-analytics.module';
import { PageSettingsModule } from './page-settings/page-settings.module';
import { PageFundsModule } from './page-funds/page-funds.module';

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const I18N_CONFIG = {
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot(I18N_CONFIG),
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
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }, TranslatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

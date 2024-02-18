import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PageAddModule } from './page-add/page-add.module';
import { PageAnalyticsModule } from './page-analytics/page-analytics.module';
import { PageSettingsModule } from './page-settings/page-settings.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    PageAddModule,
    PageAnalyticsModule,
    PageSettingsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

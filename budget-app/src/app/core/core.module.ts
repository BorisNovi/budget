import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiButtonModule, TuiGroupModule } from '@taiga-ui/core';
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CalendarLocalService } from './services/calendar-local.service';

@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TuiButtonModule,
    TuiGroupModule,
  ],
  providers: [
    CalendarLocalService
  ]
})
export class CoreModule { }

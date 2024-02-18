import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }

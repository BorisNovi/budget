import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiIslandModule } from '@taiga-ui/kit';
import { SettingsComponent } from './settings/settings.component';

const routes = [
  { path: '', component: SettingsComponent },
];
@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiIslandModule,
    RouterModule.forChild(routes),
  ]
})
export class PageSettingsModule { }

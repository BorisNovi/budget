import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  TuiButtonModule, TuiFlagPipeModule, TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiIslandModule, TuiSelectModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    TuiSelectModule,
    TuiFlagPipeModule,
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    RouterModule.forChild(routes),
  ]
})
export class PageSettingsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  TuiButtonModule, TuiDialogModule, TuiFlagPipeModule, TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiIslandModule, TuiSelectModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
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
    TuiDialogModule,
    TuiFlagPipeModule,
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ]
})
export class PageSettingsModule { }

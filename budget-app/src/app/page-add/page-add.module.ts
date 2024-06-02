import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  TuiButtonModule, TuiCalendarModule, TuiDialogModule, TuiErrorModule, TuiGroupModule, TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiInputNumberModule,
  TuiToggleOptions,
  TUI_TOGGLE_DEFAULT_OPTIONS,
  TUI_TOGGLE_OPTIONS,
  TuiFieldErrorPipeModule,
  TuiRadioBlockModule,
  TuiIslandModule,
} from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: '', component: AddComponent },
];

const options: Partial<TuiToggleOptions> = {
  icons: {
    toggleOff: ({ $implicit }) => ($implicit === 'm' ? 'tuiIconUpload' : 'tuiIconChevronDownLarge'),
    toggleOn: ({ $implicit }) => ($implicit === 'm' ? 'tuiIconChevronUp' : 'tuiIconChevronUpLarge'),
  },
};

const tuiImports = [
  TuiCurrencyPipeModule,
  TuiButtonModule,
  TuiInputNumberModule,
  TuiTextfieldControllerModule,
  TuiDialogModule,
  TuiInputModule,
  TuiCalendarModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
  TuiGroupModule,
  TuiRadioBlockModule,
  TuiIslandModule,
  TuiAutoFocusModule
];
@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    tuiImports,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: TUI_TOGGLE_OPTIONS,
      useValue: {
        ...TUI_TOGGLE_DEFAULT_OPTIONS,
        ...options,
      },
    },
  ],
})
export class PageAddModule { }

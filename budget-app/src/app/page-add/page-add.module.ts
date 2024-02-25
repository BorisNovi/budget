import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TuiButtonModule, TuiLabelModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: '', component: AddComponent },
];

@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TuiCurrencyPipeModule,
    TuiButtonModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
  ]
})
export class PageAddModule { }

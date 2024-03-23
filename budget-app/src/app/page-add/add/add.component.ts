import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators
} from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { LocalService } from 'src/app/core/services/local.service';
import { ExpencesCategories, IncomeCategories } from 'src/app/core/enums/categories.enum';
import { ExpenceType } from '../../core/models/add.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Enter amount!',
        min: ({ min }: { min: number }) => `Min value is ${min}`,
        maxLength: ({ maxLength }: { maxLength: number }) => `Max length is ${maxLength}`
      },
    },
  ],
})

export class AddComponent {
  readonly expenceItem = ExpenceType.expence;
  readonly incomeItem = ExpenceType.income;
  public inputForm: FormGroup;
  public dateDialogOpen = false;
  public commentDialogOpen = false;
  public categoryDialogOpen = false;
  readonly expencesCategories: string[] = Object.values(ExpencesCategories);
  readonly incomeCategories: string[] = Object.values(IncomeCategories);
  public datepickerDate: TuiDay | null = null;
  private today = TuiDay.currentLocal();

  constructor(
    private formBuilder: FormBuilder,
    private localService: LocalService,
  ) {
    this.inputForm = this.formBuilder.group({
      expencesType: [ExpenceType.expence, []],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      date: [this.today, []],
      comment: ['', [Validators.maxLength(40)]],
      category: ['', []]
    });
  }

  public showDateDialog(): void {
    this.dateDialogOpen = true;
  }

  public showCommentDialog(): void {
    this.commentDialogOpen = true;
  }

  public showCategoryDialog(): void {
    this.categoryDialogOpen = true;
  }

  public onDayClick(date: TuiDay): void {
    this.datepickerDate = date;
    this.inputForm?.get('date')?.setValue(date);
  }

  public resetDate(): void {
    this.datepickerDate = null;
    this.inputForm?.get('date')?.reset(this.today);
  }

  public resetComment(): void {
    this.inputForm.get('comment')?.reset('');
  }

  public submit(category: string): void {
    this.inputForm?.get('category')?.setValue(category);
    const completeData = {
      ...this.inputForm.value,
      timestamp: Date.parse(`${this.inputForm.value.date.month}.${this.inputForm.value.date.day}.${this.inputForm.value.date.year}`)
    };

    this.localService.set(completeData.expencesType, completeData);
    this.resetForm();

    console.log('expences:', this.localService.get(ExpenceType.expence));
    console.log('incomes:', this.localService.get(ExpenceType.income));
  }

  private resetForm(): void {
    this.inputForm?.get('amount')?.reset(0);
    this.inputForm?.get('comment')?.reset('');
  }
}

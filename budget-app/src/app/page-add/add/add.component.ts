import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators
} from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import {
  LocalService, CurrencyService, ExpenceCategory, IncomeCategory, ExpenceTypeKey
} from 'src/app/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
  readonly expenceItem = ExpenceTypeKey.EXPENCE;
  readonly incomeItem = ExpenceTypeKey.INCOME;
  public inputForm: FormGroup;
  public dateDialogOpen = false;
  public commentDialogOpen = false;
  public categoryDialogOpen = false;
  readonly expencesCategories: string[] = Object.values(ExpenceCategory);
  readonly incomeCategories: string[] = Object.values(IncomeCategory);
  public datepickerDate: TuiDay | null = null;
  private today = TuiDay.currentLocal();

  constructor(
    private formBuilder: FormBuilder,
    private localService: LocalService,
    public cs: CurrencyService,
  ) {
    this.inputForm = this.formBuilder.group({
      expencesType: [ExpenceTypeKey.EXPENCE, []],
      amount: [null, [Validators.required, Validators.min(0.01)]],
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
      dateStr: this.inputForm.value.date
    };

    this.localService.set(completeData.expencesType, completeData);
    this.resetForm();
  }

  private resetForm(): void {
    this.inputForm?.get('amount')?.reset(null);
    this.inputForm?.get('comment')?.reset('');
  }
}

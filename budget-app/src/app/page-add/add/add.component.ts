import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators
} from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import {
  LocalService, CurrencyService, ExpenceCategory, IncomeCategory, ExpenceTypeKey,
  FloatInputPipe,
  IAdd
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
        max: ({ max }: { max: number }) => `Max value is ${max}`,
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
    private floatInputPipe: FloatInputPipe
  ) {
    this.inputForm = this.formBuilder.group({
      expencesType: [ExpenceTypeKey.EXPENCE, []],
      amount: [null, [Validators.required, Validators.min(0.01), Validators.max(99999999)]],
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
    if (Number.isNaN(+this.inputForm.controls['amount'].value)) return;

    this.inputForm?.get('category')?.setValue(category);

    const completeData: IAdd = {
      ...this.inputForm.value,
      amount: +this.inputForm.controls['amount'].value,
      dateStr: this.inputForm.value.date
    };

    this.localService.set(completeData.expencesType, completeData);
    this.resetForm();
  }

  private resetForm(): void {
    this.inputForm?.get('amount')?.reset(null);
    this.inputForm?.get('comment')?.reset('');
  }

  public onNumpadNum(num: string | number): void {
    const currentValue: string = this.inputForm.controls['amount'].value || '';
    const newValue = `${currentValue}${num}`;

    const transformedValue = this.floatInputPipe.transform(newValue, currentValue, 9999999, 2);

    this.inputForm.controls['amount'].setValue(transformedValue);
  }

  public onBackspace(): void {
    const currentValue = String(this.inputForm.controls['amount'].value) || '';
    this.inputForm.controls['amount'].setValue(currentValue.slice(0, -1));
  }
}

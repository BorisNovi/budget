import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators
} from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

enum ExpenceType {
  expence = 'expence',
  income = 'income',
}

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
  public datepickerDate: TuiDay | null = null;
  private date = new Date();
  private today = TuiDay.normalizeOf(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.inputForm = this.formBuilder.group({
      expencesType: [ExpenceType.expence, []],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      date: [this.today, []],
      comment: ['', [Validators.maxLength(40)]]
    });
  }

  public showDateDialog(): void {
    this.dateDialogOpen = true;
  }

  public showCommentDialog(): void {
    this.commentDialogOpen = true;
  }

  onDayClick(date: TuiDay): void {
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

  public submit(): void {
    console.log(this.inputForm.value);
    // TODO: Дальше пиши сервис для хранения данных в локальном хранилище
    this.resetForm();
  }

  private resetForm(): void {
    this.inputForm?.get('amount')?.reset(0);
    this.inputForm?.get('comment')?.reset('');
  }
}

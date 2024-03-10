import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators
} from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { ExpenceType } from '../../core/models/add.model';
import { LocalService } from 'src/app/core/services/local.service';

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
      category: ['', ]
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
    const completeData = {
      ...this.inputForm.value,
      timestamp: Date.parse(`${this.inputForm.value.date.month}.${this.inputForm.value.date.day}.${this.inputForm.value.date.year}`)
    };

    this.localService.set(completeData.expencesType, completeData);
    // TODO: Сделать попап для выбора типа трат или доходов
    this.resetForm();

    console.log(this.localService.get(ExpenceType.expence));
  }

  private resetForm(): void {
    this.inputForm?.get('amount')?.reset(0);
    this.inputForm?.get('comment')?.reset('');
  }
}

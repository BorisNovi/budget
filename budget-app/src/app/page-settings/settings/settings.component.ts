import {
  Component, DestroyRef, Inject, ChangeDetectionStrategy
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiThemeNightService } from '@taiga-ui/addon-doc';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiCurrency } from '@taiga-ui/addon-commerce';
import { CurrencyService, ExpenceTypeKey, LanguageSelectService} from 'src/app/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  public currencyForm = new FormGroup({
    currencyType: new FormControl(this.cs.currency)
  });

  public currencyTypes: string[] = Object.keys(TuiCurrency);
  public countryFlag = 'US';

  public deleteDialogOpen = false;

  constructor(
    @Inject(TuiThemeNightService) readonly night: TuiThemeNightService,
    private cs: CurrencyService,
    private destroyRef: DestroyRef,
    public languageSelect: LanguageSelectService
  ) {
    this.setFlag();
    this.currencyForm.controls.currencyType.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value) {
          this.cs.setCurrency(value);
          this.setFlag();
        }
      });
  }

  private setFlag(): void {
    const currencyCode = TuiCurrency[this.currencyForm.controls.currencyType.value as keyof typeof TuiCurrency];
    this.countryFlag = currencyCode.slice(0, 2);
  }

  public showDeleteDialog(): void {
    this.deleteDialogOpen = true;
  }

  public deleteData(): void {
    localStorage.removeItem(ExpenceTypeKey.EXPENCE);
    localStorage.removeItem(ExpenceTypeKey.INCOME);

    this.deleteDialogOpen = false;
  }
}

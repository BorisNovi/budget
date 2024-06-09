import { Component, DestroyRef, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiThemeNightService } from '@taiga-ui/addon-doc';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiCurrency } from '@taiga-ui/addon-commerce';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  public currencyForm = new FormGroup({
    currencyType: new FormControl(this.cs.currency)
  });

  public currencyTypes: string[] = Object.keys(TuiCurrency);
  public countryFlag = 'US';

  constructor(
    @Inject(TuiThemeNightService) readonly night: TuiThemeNightService,
    private cs: CurrencyService,
    private destroyRef: DestroyRef
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
}

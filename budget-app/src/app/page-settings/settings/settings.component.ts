import {
  Component, DestroyRef, Inject, ChangeDetectionStrategy
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiThemeNightService } from '@taiga-ui/addon-doc';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiCurrency } from '@taiga-ui/addon-commerce';
import {
  CurrencyService, ILanguageOption, LanguageSelectService,
  LocalService
} from 'src/app/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  public settingsForm = new FormGroup({
    currencyType: new FormControl(this.cs.currencyCode),
    language: new FormControl()
  });

  public currencyCodes: string[] = Object.values(TuiCurrency);
  public deleteDialogOpen = false;

  constructor(
    @Inject(TuiThemeNightService) readonly night: TuiThemeNightService,
    private cs: CurrencyService,
    private ls: LocalService,
    private destroyRef: DestroyRef,
    public languageSelect: LanguageSelectService
  ) {
    this.settingsForm.controls.currencyType.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value) {
          this.cs.setCurrency(value);
        }
      });

    this.settingsForm.controls.language.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((language: ILanguageOption) => {
        if (language) {
          this.languageSelect.changeLanguage(language);
        }
      });

    this.languageSelect.currentLanguageOption$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lang) => this.settingsForm.controls.language.setValue(lang));
  }

  public showDeleteDialog(): void {
    this.deleteDialogOpen = true;
  }

  public deleteData(): void {
    this.ls.clearAll();

    this.deleteDialogOpen = false;
  }
}

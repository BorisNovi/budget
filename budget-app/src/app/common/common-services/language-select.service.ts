import { inject, Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { ILanguageOption } from '../common-models/language-option.interface';

@Injectable({ providedIn: 'root' })
export class LanguageSelectService {
  private readonly translateService = inject(TranslateService);
  private readonly availableLanguages = ['en', 'ru', 'ua'];
  public languageOptions: ILanguageOption[] = [];
  constructor() {
    this.translateService.addLangs(this.availableLanguages);
    this.translateService.setDefaultLang('en');
  }

  public buildLanguageOptions() {
    const ENGLISH = this.translateService.get('ENGLISH');
    const RUSSIAN = this.translateService.get('РУССКИЙ');
    const UKRANIAN = this.translateService.get('УКРАЇНСЬКА');

    forkJoin([
      ENGLISH,
      RUSSIAN,
      UKRANIAN
    ]).subscribe(
      (_response) => {
        this.languageOptions = [{
          value: this.availableLanguages[0],
          label: _response[0].toUpperCase(),
        }, {
          value: this.availableLanguages[1],
          label: _response[1].toUpperCase(),
        },
        {
          value: this.availableLanguages[2],
          label: _response[2].toUpperCase(),
        }];
      }
    );
  }

  public changeLanguage(language: ILanguageOption) {
    this.translateService.use(language.value);
  }
}

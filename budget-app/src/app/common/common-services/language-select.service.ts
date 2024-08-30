import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { ILanguageOption } from '../common-models/language-option.interface';

@Injectable({ providedIn: 'root' })
export class LanguageSelectService {
  private readonly translateService = inject(TranslateService);
  private readonly availableLanguages = ['gb', 'ru', 'ua'];
  private readonly currentLangValue = this.availableLanguages[0];

  private readonly languageOptionsSubject = new BehaviorSubject<ILanguageOption[]>([]);
  public languageOptions$ = this.languageOptionsSubject.asObservable();

  private readonly currentLanguageOptionSubject = new BehaviorSubject<ILanguageOption | null>(null);
  public currentLanguageOption$ = this.currentLanguageOptionSubject.asObservable();

  constructor() {
    this.translateService.addLangs(this.availableLanguages);
    this.currentLangValue = localStorage.getItem('bugget-app-language') || this.translateService.getBrowserLang() || this.translateService.defaultLang;
    this.translateService.setDefaultLang(this.currentLangValue);
  }

  public buildLanguageOptions() {
    const ENGLISH = this.translateService.get('English');
    const RUSSIAN = this.translateService.get('Русский');
    const UKRANIAN = this.translateService.get('Українська');

    forkJoin([
      ENGLISH,
      RUSSIAN,
      UKRANIAN
    ]).subscribe(
      (_response) => {
        const languageOptions = [{
          value: this.availableLanguages[0],
          label: _response[0],
        }, {
          value: this.availableLanguages[1],
          label: _response[1],
        },
        {
          value: this.availableLanguages[2],
          label: _response[2],
        }];
        this.languageOptionsSubject.next(languageOptions);

        const currentOption = languageOptions.find((option) => option.value === this.currentLangValue) || languageOptions[0];
        this.currentLanguageOptionSubject.next(currentOption);
      }
    );
  }

  public changeLanguage(language: ILanguageOption) {
    localStorage.setItem('bugget-app-language', language.value);
    this.translateService.use(language.value);
  }
}

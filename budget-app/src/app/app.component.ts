import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  ViewEncapsulation,
  OnInit
} from '@angular/core';

import { TuiThemeNightService } from '@taiga-ui/addon-doc/services';
import { TuiBrightness } from '@taiga-ui/core';

import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { ILanguageOption } from './common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'budget';
  readonly night$ = this.night;

  private readonly availableLanguages = ['en', 'ru', 'ua'];
  private readonly translateService = inject(TranslateService);
  languageOptions: ILanguageOption[] = [];

  constructor(
    @Inject(TuiThemeNightService) readonly night: TuiThemeNightService
  ) { }

  public ngOnInit(): void {
    this.translateService.addLangs(this.availableLanguages);
    this.translateService.setDefaultLang('en');
    this.buildLanguageOptions();
  }

  private buildLanguageOptions() {
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

  // TODO: Перенести это в отдеьный сервис и добавить опцию в настройки
  public changeLanguage(language: ILanguageOption) {
    this.translateService.use(language.value);
  }

  get mode(): TuiBrightness | null {
    return this.night.value ? 'onDark' : null;
  }
}

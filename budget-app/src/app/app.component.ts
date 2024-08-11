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
import { ILanguageOption, LanguageSelectService } from './common';

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

  // private readonly availableLanguages = ['en', 'ru', 'ua'];
  // private readonly translateService = inject(TranslateService);
  // public languageOptions: ILanguageOption[] = [];

  constructor(
    @Inject(TuiThemeNightService) readonly night: TuiThemeNightService,
    public languageSelect: LanguageSelectService
  ) { }

  public ngOnInit(): void {
    this.languageSelect.buildLanguageOptions();
  }

  get mode(): TuiBrightness | null {
    return this.night.value ? 'onDark' : null;
  }
}

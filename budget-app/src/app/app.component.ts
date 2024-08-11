import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
  OnInit
} from '@angular/core';

import { TuiThemeNightService } from '@taiga-ui/addon-doc/services';
import { TuiBrightness } from '@taiga-ui/core';
import { LanguageSelectService } from './common';

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

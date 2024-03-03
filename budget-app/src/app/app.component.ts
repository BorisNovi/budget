import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';

import { TuiThemeNightService } from '@taiga-ui/addon-doc/services';
import { TuiBrightness } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'budget';

  readonly night$ = this.night;

  constructor(
    @Inject(TuiThemeNightService) readonly night: TuiThemeNightService
  ) { }

  get mode(): TuiBrightness | null {
    return this.night.value ? 'onDark' : null;
  }
}

import { Component, Inject } from '@angular/core';
import { TuiThemeNightService } from '@taiga-ui/addon-doc';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  constructor(
    @Inject(TuiThemeNightService) readonly night: TuiThemeNightService
  ) {}
}

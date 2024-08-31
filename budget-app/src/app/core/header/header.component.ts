import { Component, Inject } from '@angular/core';
import { TuiThemeNightService } from '@taiga-ui/addon-doc';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(@Inject(TuiThemeNightService) readonly night: TuiThemeNightService) {}
}

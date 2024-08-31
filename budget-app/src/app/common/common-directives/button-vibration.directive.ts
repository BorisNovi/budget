import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'button[appVibrateOnClick]',
  standalone: true,
})
export class VibrateOnClickDirective {
  @HostListener('click')
  onClick() {
    if (navigator.vibrate) {
      navigator.vibrate(25);
    }
  }
}

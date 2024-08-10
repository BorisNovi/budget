import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, EventEmitter, Output
} from '@angular/core';
import { TuiButtonModule, TuiGroupModule } from '@taiga-ui/core';
import { VibroService } from '../../common-services/vibro.service';

@Component({
  selector: 'app-numpad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TuiGroupModule, TuiButtonModule],
  providers: [VibroService]
})

export class NumpadComponent {
  @Output() public num = new EventEmitter<string | number>();
  @Output() public backspace = new EventEmitter<void>();
  public keyRows: Array<(number | string)[]> = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0]];

  constructor(private vibro: VibroService) {}

  public onNum(num: string | number): void {
    this.vibro.short();
    this.num.emit(num);
  }

  public onBackspace(): void {
    this.vibro.short();
    this.backspace.emit();
  }
}

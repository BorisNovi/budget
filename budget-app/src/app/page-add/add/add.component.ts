import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  public inputForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.inputForm = this.formBuilder.group({
      money: ['', []],

    });
  }
}

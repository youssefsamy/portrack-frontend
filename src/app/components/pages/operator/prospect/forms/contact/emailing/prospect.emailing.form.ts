/**
 * Created by Alex on 5/24/2018.
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validate, customEmailValidator } from 'services/validate.service';

@Component({
  selector: 'prospect-emailing-form',
  templateUrl: './prospect.emailing.form.html',
  styleUrls: []
})
export class ProspectEMailingForm implements OnInit {
  @Output() ref: EventEmitter<any> = new EventEmitter();
  public form: FormGroup;

  constructor(public formBuilder: FormBuilder, public validate: Validate) {
    this.form = this.formBuilder.group({
      preferred_email: ['', customEmailValidator],

      private_email_1: ['', customEmailValidator],
      private_email_2: ['', customEmailValidator],
      private_email_3: ['', customEmailValidator],

      business_email_1: ['', customEmailValidator],
      business_email_2: ['', customEmailValidator],
      business_email_3: ['', customEmailValidator]
    });
  }

  ngOnInit() {
    this.ref.emit(this.form);
  }
}

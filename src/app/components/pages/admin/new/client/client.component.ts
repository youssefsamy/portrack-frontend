import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { ClientApi } from 'services/clientapi.service';
import { Validate } from 'services/validate.service';
import { NotifyService } from 'services/notify.service';

@Component({
  selector: 'page-admin-newclient',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class AdminNewClientComponent implements OnInit {
  public form: FormGroup;
  public operators = [];

  constructor(
    public api: ClientApi,
    public formBuilder: FormBuilder,
    public notify: NotifyService,
    public router: Router,
    public validate: Validate
  ) {
    const password = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    const confirmPassword = new FormControl(
      '',
      CustomValidators.equalTo(password)
    );

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password,
      confirmPassword,
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      clientcode: ['', Validators.required],
      operators: ['']
    });

    this.api.listAssignableOperators().subscribe(res => {
      this.operators = res;
    });
  }

  ngOnInit() {}

  handleSubmit($e) {
    $e.preventDefault();

    for (let c in this.form.controls) {
      this.form.controls[c].markAsTouched();
    }
    if (!this.form.valid) return;

    this.api
      .createUsers({
        ...this.form.value,
        clientcode: undefined,
        operators: undefined,
        profile: {
          role: 40,
          client: {
            code: this.form.value.clientcode,
            reference_currency: 1,
            operators: this.form.value.operators || []
          }
        }
      })
      .subscribe(
        res => {
          this.notify.showNotification(
            'success',
            'Client has been created successfully'
          );
          this.router.navigate(['/admin/dashboard']);
        },
        res => {
          this.notify.showNotification(
            'error',
            (res.error.errors && res.error.errors.username.join('')) ||
              'Sorry. creating client user has been failed'
          );
        }
      );
  }
}

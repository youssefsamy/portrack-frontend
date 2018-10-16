import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { ClientApi } from 'services/clientapi.service';
import { NotifyService } from 'services/notify.service';
import { Validate } from 'services/validate.service';

@Component({
  selector: 'page-admin-newclientaccount',
  templateUrl: './clientaccount.component.html',
  styleUrls: ['./clientaccount.component.scss']
})
export class AdminNewClientAccountComponent implements OnInit, OnDestroy {
  public clientId: any = '';
  public userId: any = '';

  public form: FormGroup;

  constructor(
    public api: ClientApi,
    public activateRoute: ActivatedRoute,
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
      code: ['', Validators.required],
      account_number: ['', Validators.required],
      swift_code: ['', Validators.required],
      description: ['', Validators.required],
      account_custodian: formBuilder.group({
        name: ['', Validators.required],
        code: ['', Validators.required],
        contact_first_name: ['', Validators.required],
        contact_last_name: ['', Validators.required],
        contact_email: ['', Validators.required],
        contact_phone: [
          '',
          Validators.compose([
            Validators.required,
            CustomValidators.phone('CN', 'PH', 'US', 'EN')
          ])
        ]
      })
    });

    this.activateRoute.params.subscribe(params => {
      this.clientId = params.clientId;
      this.userId = params.userId;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {}

  handleSubmit($e) {
    $e.preventDefault();

    for (let c in this.form.controls) {
      this.form.controls[c].markAsTouched();
    }
    if (!this.form.valid) return;

    this.api
      .createClientAccount({
        ...this.form.value,
        client: this.clientId
      })
      .subscribe(
        res => {
          this.notify.showNotification(
            'success',
            'Client account has been created successfully'
          );
          this.router.navigate(['/admin/dashboard']);
        },
        res => {
          this.notify.showNotification(
            'error',
            'Sorry. creating client account has been failed'
          );
        }
      );
  }
}

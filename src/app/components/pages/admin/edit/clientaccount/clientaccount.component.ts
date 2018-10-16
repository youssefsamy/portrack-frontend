import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
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
  selector: 'page-admin-editclientaccount',
  templateUrl: './clientaccount.component.html',
  styleUrls: ['./clientaccount.component.scss']
})
export class AdminEditClientAccountComponent implements OnInit, OnDestroy {
  public account: any = {};
  public form: FormGroup;

  constructor(
    public api: ClientApi,
    public activateRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public location: Location,
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
        contact_email: [
          '',
          Validators.compose([Validators.required, Validators.email])
        ],
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
      this.api.getClientAccountDetail(params.id).subscribe(res => {
        this.account = res;

        this.form.controls.code.setValue(res.code);
        this.form.controls.account_number.setValue(res.account_number);
        this.form.controls.swift_code.setValue(res.swift_code);
        this.form.controls.description.setValue(res.description);
        if (res.account_custodian) {
          this.form
            .get('account_custodian.name')
            .setValue(res.account_custodian.name);
          this.form
            .get('account_custodian.code')
            .setValue(res.account_custodian.code);
          this.form
            .get('account_custodian.contact_first_name')
            .setValue(res.account_custodian.contact_first_name);
          this.form
            .get('account_custodian.contact_last_name')
            .setValue(res.account_custodian.contact_last_name);
          this.form
            .get('account_custodian.contact_email')
            .setValue(res.account_custodian.contact_email);
          this.form
            .get('account_custodian.contact_phone')
            .setValue(res.account_custodian.contact_phone);
        }
      });
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
      .updateClientAccountDetail(this.account.id, this.form.value)
      .subscribe(
        res => {
          this.notify.showNotification(
            'success',
            'Client account has been created successfully'
          );
          this.location.back();
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

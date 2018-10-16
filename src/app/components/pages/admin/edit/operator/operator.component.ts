import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { Validate } from '../../../../../services/validate.service';
import { ClientApi } from '../../../../../services/clientapi.service';
import { NotifyService } from '../../../../../services/notify.service';
@Component({
  selector: 'page-admin-editoperator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class AdminEditOperatorComponent implements OnInit, OnDestroy {
  private sub: any;
  public id: any;

  public form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public validate: Validate,
    public api: ClientApi,
    public activateRoute: ActivatedRoute,
    public notify: NotifyService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: [null, [Validators.required, CustomValidators.email]],
      code: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.sub = this.activateRoute.params.subscribe(params => {
      if (params.id) {
        this.id = params.id;

        this.getUserDetail();
      }
    });
  }

  ngOnDestroy() {}

  getUserDetail() {
    this.api.getUserDetail(this.id).subscribe(res => {
      console.log(res);

      this.form.controls['username'].setValue(res['username']);
      this.form.controls['first_name'].setValue(res['first_name']);
      this.form.controls['last_name'].setValue(res['last_name']);
      this.form.controls['email'].setValue(res['email']);
      this.form.controls['code'].setValue(res['profile']['operator']['code']);
    });
  }

  submit() {
    if (this.form.valid) {
      this.api
        .updateUser(this.id, {
          ...this.form.value,
          profile: {
            operator: {
              code: this.form.value.code
            }
          }
        })
        .subscribe(res => {
          if (res.success) {
            this.notify.showNotification('success', 'successfully updated');
            this.router.navigate(['/admin/dashboard']);
          }
        });
    } else {
      this.validate.validateAllFormFields(this.form);
    }
  }
}

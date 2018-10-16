import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'page-admin-editclient',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class AdminEditClientComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public client: any = {};
  public operators = [];

  constructor(
    public api: ClientApi,
    public formBuilder: FormBuilder,
    public notify: NotifyService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public validate: Validate
  ) {
    const password = new FormControl('');
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

    this.activateRoute.params.subscribe(params => {
      this.api.getUserDetail(params.id).subscribe(res => {
        this.client = res;
        Object.keys(this.form.controls).forEach(key => {
          if (res[key]) {
            this.form.controls[key].setValue(res[key]);
          }
        });

        if (res.profile && res.profile.client && res.profile.client.operators) {
          this.form.controls.operators.setValue(
            res.profile.client.operators.map(item => item.id)
          );
        }
        if (res.profile && res.profile.client) {
          this.form.controls.clientcode.setValue(res.profile.client.code);
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
      .updateUser(this.client.id, {
        ...this.form.value,
        password: this.form.value.password || undefined,
        clientcode: undefined,
        operators: undefined,
        profile: {
          client: {
            code: this.form.value.clientcode,
            // reference_currency: 1,
            operators: this.form.value.operators || []
          }
        }
      })
      .subscribe(
        res => {
          this.notify.showNotification(
            'success',
            'Client has been updated successfully'
          );
          this.router.navigate(['/admin/dashboard']);
        },
        res => {
          this.notify.showNotification(
            'error',
            (res.error.errors && res.error.errors.username.join('')) ||
              'Sorry. updating client user has been failed'
          );
        }
      );
  }
}

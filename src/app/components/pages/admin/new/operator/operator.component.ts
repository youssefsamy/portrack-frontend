import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Validate } from "../../../../../services/validate.service";
import { CustomValidators } from "ng2-validation";
import { ClientApi } from "../../../../../services/clientapi.service";
import { NotifyService } from "../../../../../services/notify.service";
@Component({
  selector: 'page-admin-newoperator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class AdminNewOperatorComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public validate: Validate,
    public api: ClientApi,
    public notify: NotifyService
  ) {
    const password = new FormControl(
      '', Validators.compose([Validators.required])
    );
    const confirmPassword = new FormControl(
      '', CustomValidators.equalTo(password)
    );

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password,
      confirmPassword,
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      code: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {

  }

  submit() {
    if (this.form.valid) {
      this.api.createUsers({
        ...this.form.value,
        profile: {
          role: 30,
          operator: {
            code: this.form.value.code
          }
        }
      }).subscribe(res => {
        console.log(res);
        if (res.success) {
          this.notify.showNotification('success', "successfully created");
          this.router.navigate(['/admin/dashboard']);
        }
      })
    } else {
      this.validate.validateAllFormFields(this.form);
    }
  }
}
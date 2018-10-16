import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Validate } from "../../../services/validate.service";
import { CustomValidators } from "ng2-validation";
import { ClientApi } from "../../../services/clientapi.service";
import { NotifyService } from "../../../services/notify.service";

@Component({
  selector: 'page-register-new-organization',
  templateUrl: './neworganization.component.html',
  styleUrls: ['./neworganization.component.scss']
})
export class RegisterNewOrganizationComponent implements OnInit, OnDestroy {

  public countries = [];

  public form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public validate: Validate,
    public api: ClientApi,
    public notify: NotifyService
  ) {
    const administrator_password = new FormControl(
      '', Validators.compose([Validators.required])
    );
    const administrator_password_validate = new FormControl(
      '', CustomValidators.equalTo(administrator_password)
    );

    this.form = this.formBuilder.group({
      organization_name: ['', Validators.required],
      organization_short_name: ['', Validators.required],
      organization_address: ['', Validators.required],
      organization_address2: ['', Validators.required],
      organization_city: ['', Validators.required],
      organization_country: ['', Validators.required],
      organization_phone: ['', Validators.required],
      organization_email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      administrator_first_name: ['', Validators.required],
      administrator_last_name: ['', Validators.required],
      administrator_username: ['', Validators.required],
      administrator_password,
      administrator_password_validate,
      administrator_email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      administrator_phone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.api.getCountries().subscribe(res => {
      this.countries = res;

    })
  }

  ngOnDestroy() {

  }

  submit() {
    if (this.form.valid) {
      this.api.registerOrganization(this.form.value).subscribe(res => {
        console.log(res);

        if (res.success) {
          this.notify.showNotification('success', "successfully created");
          this.router.navigate(['/']);
        }

      })
    } else {
      this.validate.validateAllFormFields(this.form);
    }
  }
}

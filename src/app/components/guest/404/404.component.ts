import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../../../services/setting.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Validate } from "../../../services/validate.service";

@Component({
    selector: 'page-not-found',
    templateUrl: './404.component.html',
    styleUrls: ['./404.component.scss']
})
export class PageNotFoundComponent implements OnInit {

    public form: FormGroup

    constructor(
        public setting: SettingsService,
        public formBuilder: FormBuilder,
        public validate: Validate
    ) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            counterVal: ['', Validators.required],  /// client id
        })
    }

    submit() {
        console.log(this.form.value);
    }


}

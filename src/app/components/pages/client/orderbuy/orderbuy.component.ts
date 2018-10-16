/**
 * Created by Alex on 5/16/2018.
 */
import { Component, OnInit } from "@angular/core";
import { ClientApi } from "../../../../services/clientapi.service";
import { AutoCompleteService } from "ng4-auto-complete";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Validate } from "../../../../services/validate.service";
import { NotifyService } from "../../../../services/notify.service";
import { Router } from "@angular/router";

declare var $: any;
@Component({
    selector: 'page-orderbuy',
    templateUrl: './orderbuy.component.html',
    styleUrls: ['./orderbuy.component.scss']
})
export class ClientOrderBuyComponent implements OnInit {

    public form: FormGroup;
    public limitLabel;

    constructor(
        public api: ClientApi,
        public autoCompleteService: AutoCompleteService,
        public formBuilder: FormBuilder,
        public validate: Validate,
        public notify: NotifyService,
        public router: Router
    ) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            order_type: ['', Validators.required],
            price_limit: ['', Validators.required],
            amount: ['', Validators.required],
            isinString: ['', [Validators.required]],
            additional_note: ['', Validators.required],
            security_order_type: ['', Validators.required],
        });

        this.form.controls['order_type'].setValue('SECURITY');
        this.form.controls['security_order_type'].setValue('BUY');
    }

    changeISIN() {
        console.log(this.form.value.isinString);
        let isin = this.form.value.isinString.split(',');
        isin = isin[0];
        this.api.getFISSecurityDetailByISIN(isin).subscribe(res => {
            if (res.success == false) {
                console.log('false');
                this.limitLabel = ''
            } else {
                console.log('success');

                if (res.currency && res.coupon_rate) {
                    this.limitLabel = res.currency + ' ' + res.coupon_rate;
                } else {
                    this.limitLabel = ''
                }
            }
        })
    }


    placeOrder() {
        console.log(this.form.value);

        if (this.form.valid) {

            let isin = this.form.value.isinString.split(',');
            isin = isin[0];
            console.log(isin);

            this.api.createSecurityOrder({
                ...this.form.value,
                isin: isin
            }).subscribe(res => {
                console.log(res);
                if (res.success) {
                    this.notify.showNotification('success', 'created order successfully');

                    this.router.navigate(['/client/dashboard']);
                }
            });
        } else {
            this.validate.validateAllFormFields(this.form);
        }
    }


}

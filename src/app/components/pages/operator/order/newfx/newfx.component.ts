/**
 * Created by Alex on 5/24/2018.
 */
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientApi } from "../../../../../services/clientapi.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Validate } from "../../../../../services/validate.service";
import { NotifyService } from "../../../../../services/notify.service";

@Component({
    selector: 'page-newfx-order',
    templateUrl: './newfx.component.html',
    styleUrls: ['./newfx.component.scss']
})
export class OperatorNewFxOrderComponent implements OnInit {

    public sub: any;

    public clientId: any;
    public accounts = [];
    public currencies = [];

    public form: FormGroup;

    constructor(
        public api: ClientApi,
        public activateRoute: ActivatedRoute,
        public formBuilder: FormBuilder,
        public validate: Validate,
        public notify: NotifyService,
        public router: Router
    ) {

    }

    ngOnInit() {

        this.initForm();

        this.getCurrentList(); /// get Currency list

        this.sub = this.activateRoute.params.subscribe(params => {
            if (params.clientId) {
                this.clientId = params.clientId;
                console.log(this.clientId);

                this.form.controls['client'].setValue(this.clientId);
                this.getAccounts();
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    initForm() {
        this.form = this.formBuilder.group({
            client: ['', Validators.required],  /// client id

            //// order detail
            received_at: ['', Validators.required],
            channel: ['', Validators.required],
            additional_note: ['', Validators.required],

            /////  detail info
            txn_currency: ['', Validators.required],
            buy_currency: ['', Validators.required],
            buy_amount: ['', Validators.required],
            sell_currency: ['', Validators.required],
            sell_amount: ['', Validators.required],
            client_rate: ['', Validators.required],
            operator_rate: ['', Validators.required],

            fix_commission_currency: ['', Validators.required],
            fix_commission_amount: ['', Validators.required],
            ticket_fee_currency: ['', Validators.required],
            ticket_fee_amount: ['', Validators.required],
            third_party_fee_currency: ['', Validators.required],
            third_party_fee_amount: ['', Validators.required],
            misc_fee_currency: ['', Validators.required],
            misc_fee_amount: ['', Validators.required],

            ///// general info
            txn_type: ['', Validators.required],
            status: ['', Validators.required],
            account: ['', Validators.required],
            custodian_order_id: [''],

            ///date/time
            transaction_at: ['', Validators.required],
            settlement_at: ['', Validators.required],

            /// description
            short_description: ['', Validators.required],
            description: [''],
        });

        this.form.controls['status'].setValue('PENDING');
        this.form.controls['txn_type'].setValue('FX');
    }

    getAccounts() {
        this.api.getClient(this.clientId).subscribe(res => {

            this.accounts = res.accounts;

            console.log(res);

            this.form.controls['txn_currency'].setValue(res.reference_currency);
        });
    }

    getCurrentList() {
        this.api.getCurrencyList().subscribe(res => {
            console.log(res);
            this.currencies = res;
        });
    }

    changeCurrency() {
        console.log('change currency');

        let buy_currency = this.form.value.buy_currency;
        let sell_currency = this.form.value.sell_currency;

        if (buy_currency && sell_currency) {

            let buy_currency_code = '';
            let sell_currency_code = '';

            for (let i = 0; i < this.currencies.length; i++) {
                if (this.currencies[i]['id'] === Number(buy_currency)) buy_currency_code = this.currencies[i]['code'];
                if (this.currencies[i]['id'] === Number(sell_currency)) sell_currency_code = this.currencies[i]['code'];
            }

            if (buy_currency_code !== '' && sell_currency_code !== '') {
                this.api.getFxPricing({ limit: 10, q: buy_currency_code + sell_currency_code }).subscribe(res => {
                    this.form.controls['operator_rate'].setValue(this.precisionRound(res.price, 4));
                });
            }
        }
    }

    precisionRound(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    addTransaction() {
        console.log(this.form.value);

        if (this.form.valid) {
            this.form.value.received_at += " 00:00:00.1";
            this.form.value.transaction_at += " 00:00:00.1";
            this.form.value.settlement_at += " 00:00:00.1";

            this.api.createOrder(this.form.value).subscribe(res => {
                if (res.success) {
                    this.notify.showNotification('success', "successfully created");

                    this.router.navigate(['/operator/portfolio/pending-transactions']);
                }
            });
        } else {
            this.validate.validateAllFormFields(this.form);
        }
    }
}

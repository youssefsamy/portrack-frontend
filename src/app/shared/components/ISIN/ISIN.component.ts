import { Component, Input, forwardRef, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from "@angular/forms";
import { ClientApi } from "../../../services/clientapi.service";

export function validateCounterRange(c: FormControl) {
    let err = {
        rangeError: {
            given: c.value,
        }
    };

    return (c.value == undefined) ? err : null;
}

var Awesomplete: any;

@Component({
    selector: 'ISIN',
    templateUrl: './ISIN.component.html',
    styleUrls: ['./ISIN.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ISINComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useValue: validateCounterRange,
            multi: true
        }
    ]
})

export class ISINComponent implements ControlValueAccessor {

    @Input() _isin = 0;
    @Output() change: EventEmitter<any> = new EventEmitter();

    public dataList = [];

    constructor(
        public api: ClientApi
    ) {

    }

    get isin() {
        return this._isin;
    }

    set isin(val) {
        this._isin = val;
        this.propagateChange(this._isin);
    }

    increment() {
        this.isin++;
        this.propagateChange(this.isin);
    }

    decrement() {
        this.isin--;
        this.propagateChange(this.isin);
    }

    propagateChange = (_: any) => { };

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) {

    }

    writeValue(value: any) {
        if (value !== undefined) {
            this.isin = value;
        }
    }

    searchKey() {

        this.api.getFISList({
            q: this.isin,
            limit: 10
        }).subscribe(res => {
            this.dataList = res;
            console.log(res);
        })

        this.change.emit();
    }
}

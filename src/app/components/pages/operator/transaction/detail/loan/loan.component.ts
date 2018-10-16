import { Component, OnInit, OnDestroy } from "@angular/core";
import { ClientApi } from "../../../../../../services/clientapi.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'page-transaction-detail-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class OperatorDetailLoanTransactionComponent implements OnInit, OnDestroy {

  public transactionDetail: any;
  public transactionId: any;
  public currencies: any;

  private sub: any;

  constructor(
    public api: ClientApi,
    public activateRoute: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.sub = this.activateRoute.params.subscribe(params => {
      if (params.transactionId) {
        this.transactionId = params.transactionId;
        console.log(this.transactionId);

        this.loadTransaction();
        this.loadCurrencies();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadTransaction() {
    this.api.getTransaction(this.transactionId).subscribe(res => {
      console.log(res);

      this.transactionDetail = res;
    })
  }

  loadCurrencies() {
    this.api.getCurrencyList().subscribe(res => {
      console.log(res);
      this.currencies = new Object();
      for (let i = 0; i < res.length; i++) {
        this.currencies[res[i]['id']] = res[i]['code'];
      }

      console.log(this.currencies);
    })
  }
}
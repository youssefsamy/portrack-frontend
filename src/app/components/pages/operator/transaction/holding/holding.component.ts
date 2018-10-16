import { Component, OnInit, OnDestroy } from "@angular/core";
import { ClientApi } from "../../../../../services/clientapi.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'page-transaction-holding',
  templateUrl: './holding.component.html',
  styleUrls: ['./holding.component.scss']
})
export class OperatorHoldingTransactionComponent implements OnInit, OnDestroy {

  private sub: any;
  public holdingId: any;
  public holding: any;

  constructor(
    public api: ClientApi,
    public router: Router,
    public activateRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.sub = this.activateRoute.params.subscribe(params => {
      if (params.holdingId) {
        this.holdingId = params.holdingId;
        console.log(this.holdingId);

        this.loadTransactions();
        //this.loadCurrencies();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadTransactions() {
    this.api.getHoldingDeatail(this.holdingId).subscribe(res => {
      this.holding = res;
      console.log(res);
    })
  }
}
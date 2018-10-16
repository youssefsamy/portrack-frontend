/**
 * Created by Alex on 5/16/2018.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientApi } from '../../../../services/clientapi.service';
import { SettingsService } from '../../../../services/setting.service';
import { Router } from "@angular/router";

@Component({
  selector: 'page-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class ClientPortfolioComponent implements OnInit, OnDestroy {
  private sub: any;
  public tId = '';

  public placedOrders = [];
  public processOrders = [];
  public executedOrders = [];

  public portfolioDetail: any = { holdings: [] };

  public latestTransactions = [];

  portfolioHolding = {
    page: 1,
    pageSize: 10,
    maxPageSize: 1,
    data: []
  };
  portfolioHoldingFilter = '';

  latestTransactionData = {
    page: 1,
    pageSize: 10,
    maxPageSize: 1,
    data: []
  };
  placeOrderData = {
    page: 1,
    pageSize: 10,
    maxPageSize: 1,
    data: []
  };
  processOrdersData = {
    page: 1,
    pageSize: 10,
    maxPageSize: 1,
    data: []
  };
  executedOrdersData = {
    page: 1,
    pageSize: 10,
    maxPageSize: 1,
    data: []
  };

  constructor(
    public activateRoute: ActivatedRoute,
    public api: ClientApi,
    public setting: SettingsService,
    public router: Router
  ) {}

  ngOnInit() {
    this.sub = this.activateRoute.params.subscribe(params => {
      if (params.tId) {
        this.tId = this.getId(params.tId);
        console.log(this.tId);

        this.loadPortfolio();
      } else {
        this.loadPortfolio();
      }
    });

    this.loadData();
  }

  loadData() {
    this.api.getOrdersList({ status: 'waiting' }).subscribe(res => {
      this.placedOrders = res;

      console.log(res);
    });

    this.api.getOrdersList({ status: 'executed' }).subscribe(res => {
      this.executedOrders = res;

      console.log(res);
    });

    let id = this.setting.getUserSetting('profile').client.id;
    if (id) {
      this.api.getClientTransactions(id, {}).subscribe(res => {
        this.processOrders = res;

        console.log(res);
      });

      this.api
        .getClientTransactions(id, { status: 'realized' })
        .subscribe(res => {
          this.latestTransactions = res;

          console.log(res);
        });
    }
  }

  loadPortfolio() {
    let id = this.setting.getUserSetting('profile').client.id;
    this.api.getClientPortfolio(id, { T: this.tId }).subscribe(res => {
      this.portfolioDetail = res;

      console.log(res);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getId(tid) {
    let tmp = '';
    switch (tid) {
      case 'T-2':
        tmp = '-2';
        break;
      case 'T-1':
        tmp = '-1';
        break;
      case 'T0':
        tmp = '';
        break;
      case 'T1':
        tmp = '+1';
        break;
      case 'T2':
        tmp = '+2';
        break;
    }

    return tmp;
  }

  prev() {
    let tmp = '';
    switch(this.tId) {
      case '-2':
        break;
      case '-1':
        tmp = 'T-2';
        break;
      case '':
        tmp = 'T-1';
        break;
      case '+1':
        tmp = 'T0';
        break;
      case '+2':
        tmp = 'T1';
        break;
    }

    if (tmp != '') {
      this.router.navigate(['/client/portfolio/' + tmp]);  
    }
  }

  next() {
    let tmp = '';
    switch(this.tId) {
      case '-2':
        tmp = 'T-1'
        break;
      case '-1':
        tmp = 'T0';
        break;
      case '':
        tmp = 'T1';
        break;
      case '+1':
        tmp = 'T2';
        break;
      case '+2':
        tmp = '';
        break;
    }

    if (tmp != '') {
      this.router.navigate(['/client/portfolio/' + tmp]);  
    }
  }
}

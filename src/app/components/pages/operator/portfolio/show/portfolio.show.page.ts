/**
 * Created by Alex on 5/21/2018.
 */
import { Component, OnInit } from '@angular/core';
import { ClientApi } from '../../../../../services/clientapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-portfolio-show',
  templateUrl: './portfolio.show.page.html',
  styleUrls: ['./portfolio.show.page.scss']
})
export class PortfolioShowPage implements OnInit {
  public search: string = '';
  public clientId: any = '';
  public portfolio: any = {
    holdings: []
  };
  public filteredHoldings = [];
  public client: any = {};

  constructor(public api: ClientApi, public activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.clientId = params.clientId;
      this.api.getClient(this.clientId).subscribe(res => {
        this.client = res;
      });
      this.activateRoute.queryParams.subscribe(query => {
        this.api
          .getClientPortfolio(this.clientId, query.T ? { T: query.T || 0 } : {})
          .subscribe(res => {
            console.log(res);
            this.portfolio = res;
            this.filteredHoldings = res.holdings;
            this.search = '';
          });
      });
    });
  }

  filterHoldings($e) {
    const query = $e.target.value.toLowerCase();
    const columns = [
      'pv_custodian',
      'pv_currency',
      'pv_asset_class',
      'pv_code'
    ];
    this.filteredHoldings = this.portfolio.holdings.filter(item => {
      if (
        item.account_details &&
        item.account_details.code &&
        item.account_details.code.toLowerCase().indexOf(query) > -1
      ) {
        return true;
      }
      for (let i in item) {
        if (
          columns.indexOf(i) >= 0 &&
          item[i] &&
          item[i]
            .toString()
            .toLowerCase()
            .indexOf(query) > -1
        ) {
          return true;
        }
      }
      return false;
    });
  }

  printPage($event) {
    $event.preventDefault();
    window.print();
  }
}

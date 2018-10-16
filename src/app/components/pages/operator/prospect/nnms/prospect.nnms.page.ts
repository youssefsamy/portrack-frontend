/**
 * Created by Alex on 5/24/2018.
 */
import { Component } from '@angular/core';
import orderBy from 'lodash/orderBy';

import { ProspectApi } from '../prospect.api';
@Component({
  selector: 'page-prospect-nnms',
  templateUrl: './prospect.nnms.page.html',
  styleUrls: []
})
export class ProspectNNMSPage {
  public prospects = [];

  constructor(private api: ProspectApi) {
    this.api.searchProspect().subscribe(res => {
      this.prospects = res;
    });
  }

  sortProspect(field, order) {
    this.prospects = orderBy(this.prospects, field, order);
  }
}

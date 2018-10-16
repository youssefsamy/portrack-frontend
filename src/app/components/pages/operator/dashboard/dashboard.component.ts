/**
 * Created by ApolloYr on 5/10/2018.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import orderBy from 'lodash/orderBy';

import { ClientApi } from 'services/clientapi.service';
import { ProspectApi } from '../prospect/prospect.api';

@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class OperatorDashboardComponent {
  prospectFile = {
    page: 1,
    pageSize: 10,
    maxPageSize: 1,
    data: []
  };

  fmsFile = {
    page: 1,
    pageSize: 10,
    maxPageSize: 1,
    data: []
  };

  constructor(
    public clientApi: ClientApi,
    public prospectApi: ProspectApi,
    public router: Router
  ) {
    this.prospectApi.listTrackingFiles().subscribe(res => {
      this.prospectFile.data = orderBy(res, 'file_date', 'desc');
      this.onProspectPageChange();
    });

    this.clientApi.listFileDocuments().subscribe(res => {
      this.fmsFile.data = orderBy(res, 'created', 'desc');
      this.onFMSPageChange();
    });
  }

  gotoPortfolio() {
    this.router.navigate(['/operator/portfolio/client-list']);
  }

  onProspectPageChange() {
    this.prospectFile.maxPageSize = Math.ceil(
      this.prospectFile.data.length / this.prospectFile.pageSize
    );

    if (this.prospectFile.page > this.prospectFile.maxPageSize) {
      this.prospectFile.page = this.prospectFile.maxPageSize;
    }
  }

  getProspectPageText() {
    if (!this.prospectFile.data.length) {
      return 'Showing 0 entries';
    }
    return `Showing ${(this.prospectFile.page - 1) *
      this.prospectFile.pageSize +
      1} to ${Math.min(
      this.prospectFile.page * this.prospectFile.pageSize,
      this.prospectFile.data.length
    )}
    of ${this.prospectFile.data.length} entries`;
  }

  onFMSPageChange() {
    this.fmsFile.maxPageSize = Math.ceil(
      this.fmsFile.data.length / this.fmsFile.pageSize
    );

    if (this.fmsFile.page > this.fmsFile.maxPageSize) {
      this.fmsFile.page = this.fmsFile.maxPageSize;
    }
  }

  getFMSPageText() {
    if (!this.fmsFile.data.length) {
      return 'Showing 0 entries';
    }
    return `Showing ${(this.fmsFile.page - 1) * this.fmsFile.pageSize +
      1} to ${Math.min(
      this.fmsFile.page * this.fmsFile.pageSize,
      this.fmsFile.data.length
    )}
    of ${this.fmsFile.data.length} entries`;
  }

  getFileName(url) {
    const split = url.split('/');
    return split.length && split[split.length - 1];
  }
}

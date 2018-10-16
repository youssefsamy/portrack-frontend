import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ClientApi } from '../../../../services/clientapi.service';
@Component({
  selector: 'page-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  public operatorList = [];
  public clientList = [];

  public operatorLoading = false;
  public clientLoading = false;

  operatorData = {
    page: 1,
    pageSize: 10,
    maxPageSize: 1,
    data: []
  };

  clientData = {
    page: 1,
    pageSize: 10,
    maxPageSize: 1,
    data: []
  };

  operatorFilter = '';
  clientFilter = '';

  constructor(public router: Router, public api: ClientApi) {}

  ngOnInit() {
    this.operatorLoading = true;
    this.clientLoading = true;
    this.api.getClientUsers().subscribe(res => {
      this.clientLoading = false;
      this.clientList = res;
      this.clientData.data = res;
    });

    this.api.getOperatorUsers().subscribe(res => {
      this.operatorLoading = false;
      this.operatorList = res;
      this.operatorData.data = res;
    });
  }

  ngOnDestroy() {}

  onProspectPageChange() {
    this.operatorData.maxPageSize = Math.ceil(
      this.operatorData.data.length / this.operatorData.pageSize
    );

    if (this.operatorData.page > this.operatorData.maxPageSize) {
      this.operatorData.page = this.operatorData.maxPageSize;
    }
  }

  getOperatorPageText() {
    if (!this.operatorData.data.length) {
      return 'Showing 0 entries';
    }
    return `Showing ${(this.operatorData.page - 1) *
      this.operatorData.pageSize +
      1} to ${Math.min(
      this.operatorData.page * this.operatorData.pageSize,
      this.operatorData.data.length
    )}
    of ${this.operatorData.data.length} entries`;
  }

  onFMSPageChange() {
    this.clientData.maxPageSize = Math.ceil(
      this.clientData.data.length / this.clientData.pageSize
    );

    if (this.clientData.page > this.clientData.maxPageSize) {
      this.clientData.page = this.clientData.maxPageSize;
    }
  }

  getClientPageText() {
    if (!this.clientData.data.length) {
      return 'Showing 0 entries';
    }
    return `Showing ${(this.clientData.page - 1) * this.clientData.pageSize +
      1} to ${Math.min(
      this.clientData.page * this.clientData.pageSize,
      this.clientData.data.length
    )}
    of ${this.clientData.data.length} entries`;
  }

  searchOperator() {}
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientApi } from 'services/clientapi.service';
@Component({
  selector: 'page-admin-detailclient',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class AdminDetailClientComponent implements OnInit {
  public client: any = {};
  public clientDetail: any = {
    operators: [],
    accounts: []
  };

  constructor(
    public api: ClientApi,
    public router: Router,
    public activateRoute: ActivatedRoute
  ) {
    this.activateRoute.params.subscribe(params => {
      this.api.getUserDetail(params.id).subscribe(res => {
        this.client = res;
        this.api.getClientDetail(res.profile.client.id).subscribe(res => {
          this.clientDetail = res;
        });
      });
    });
  }

  public ngOnInit() {}
}

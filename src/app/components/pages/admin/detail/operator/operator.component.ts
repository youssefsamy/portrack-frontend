import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientApi } from 'services/clientapi.service';

@Component({
  selector: 'page-admin-detailoperator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class AdminDetailOperatorComponent implements OnInit, OnDestroy {
  private sub: any;
  public id: any;
  public operator: any = {};
  public operatorDetail: any = {
    clients: []
  };

  constructor(
    public api: ClientApi,
    public router: Router,
    public activateRoute: ActivatedRoute
  ) {
    this.activateRoute.params.subscribe(params => {
      this.api.getUserDetail(params.id).subscribe(res => {
        this.operator = res;
        this.api.getOperatorDetail(res.profile.operator.id).subscribe(res => {
          this.operatorDetail = res;
        });
      });
    });
  }

  ngOnInit() {
    this.sub = this.activateRoute.params.subscribe(params => {
      if (params.id) {
        this.id = params.id;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

/**
 * Created by Alex on 5/24/2018.
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotifyService } from 'services/notify.service';
import { Validate } from 'services/validate.service';
import { ProspectApi } from '../prospect.api';

@Component({
  selector: 'page-prospect-search',
  templateUrl: './prospect.search.page.html',
  styleUrls: []
})
export class ProspectSearchPage {
  query: string = '';
  prospects = [];
  prospectData = {
    page: 1,
    pageSize: 10,
    maxPageSize: 1
  };
  prospectFilter = '';
  public form: FormGroup;

  constructor(
    private api: ProspectApi,
    public formBuilder: FormBuilder,
    public validate: Validate,
    public notify: NotifyService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.form = this.formBuilder.group({
      query: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      if (this.query && this.query.length < 3) {
        this.notify.showNotification(
          'error',
          'Enter a minimum of 3 characters for search terms.'
        );
      } else if (this.query) {
        this.api.searchProspect(this.query).subscribe(res => {
          this.prospects = res;
        });
      } else {
        this.prospects = [];
      }
    });
  }

  search($e) {
    $e.preventDefault();
    if (this.form.invalid) {
      this.validate.validateAllFormFields(this.form);
      return;
    }

    this.router.navigate([`/operator/prospect/search`], {
      queryParams: { query: this.form.value.query }
    });
  }
}

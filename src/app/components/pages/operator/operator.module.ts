/**
 * Created by ApolloYr on 5/10/2018.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { OperatorRoute } from './operator.routing';
import { OperatorDashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '../../layout/layout.module';
import { LayoutComponent } from '../../layout/layout.component';
import { OperatorPortfolioModule } from './portfolio/portfolio.module';
import { ProspectApi } from './prospect/prospect.api';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(OperatorRoute),
    NgxPaginationModule,
    LayoutModule,
    SharedModule
  ],
  entryComponents: [],
  declarations: [OperatorDashboardComponent],
  exports: [OperatorDashboardComponent],
  providers: [ProspectApi]
})
export class OperatorModule {}

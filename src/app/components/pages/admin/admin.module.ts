/**
 * Created by ApolloYr on 5/10/2018.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgArrayPipesModule } from 'ngx-pipes';

import { AdminRoute } from './admin.routing';
import { LayoutModule } from '../../layout/layout.module';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminNewClientComponent } from './new/client/client.component';
import { AdminNewClientAccountComponent } from './new/clientaccount/clientaccount.component';
import { AdminNewOperatorComponent } from './new/operator/operator.component';
import { AdminDetailOperatorComponent } from './detail/operator/operator.component';
import { AdminDetailClientComponent } from './detail/client/client.component';
import { AdminEditClientComponent } from './edit/client/client.component';
import { AdminEditOperatorComponent } from './edit/operator/operator.component';
import { AdminEditClientAccountComponent } from './edit/clientaccount/clientaccount.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgArrayPipesModule,
    RouterModule.forChild(AdminRoute),
    SharedModule,
    LayoutModule
  ],
  entryComponents: [],
  declarations: [
    AdminDashboardComponent,

    AdminNewOperatorComponent,
    AdminNewClientComponent,
    AdminNewClientAccountComponent,

    AdminDetailOperatorComponent,
    AdminDetailClientComponent,

    AdminEditOperatorComponent,
    AdminEditClientComponent,
    AdminEditClientAccountComponent
  ],
  exports: [],
  providers: []
})
export class AdminModule {}

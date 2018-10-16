import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { RouterModule } from '@angular/router';
import { GuestModule } from './components/guest/guest.module';
import { ClientModule } from './components/pages/client/client.module';
import { SharedModule } from './shared/shared.module';
import { ServicesModule } from './services/services.module';
import { HttpClientModule } from '@angular/common/http';
import { GrowlModule } from 'primeng/growl';
import { LayoutModule } from './components/layout/layout.module';
import { AppCommonModule } from './components/pages/common/common.module';
import { OperatorModule } from './components/pages/operator/operator.module';
import { AdminModule } from './components/pages/admin/admin.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),

    SharedModule,
    LayoutModule,
    GuestModule,
    AppCommonModule,
    ClientModule,
    OperatorModule,
    AdminModule,
    ServicesModule,

    GrowlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

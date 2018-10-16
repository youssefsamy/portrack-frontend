/**
 * Created by ApolloYr on 5/10/2018.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from 'ngx-pagination';
import { NgArrayPipesModule } from 'ngx-pipes';

import { ClientDashboardComponent } from "./dashboard/dashboard.component";
import { ClientRoute } from "./client.routing";
import { LayoutModule } from "../../layout/layout.module";
import { ClientOrderCreateComponent } from "./ordercreate/ordercreate.component";
import { ClientOrderBuyComponent } from "./orderbuy/orderbuy.component";
import { ClientOrderSellComponent } from "./ordersell/ordersell.component";
import { ClientOrderFxComponent } from "./orderfx/orderfx.component";
import { ClientPortfolioComponent } from "./portfolio/portfolio.component";
import { AutoCompleteModule } from "ng4-auto-complete";
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(ClientRoute),
        NgxPaginationModule,
        NgArrayPipesModule,

        LayoutModule,
        AutoCompleteModule,
        SharedModule
    ],
    entryComponents: [],
    declarations: [
        ClientDashboardComponent,

        ClientOrderCreateComponent,
        ClientOrderBuyComponent,
        ClientOrderSellComponent,
        ClientOrderFxComponent,

        ClientPortfolioComponent,

    ],
    exports: [
        ClientDashboardComponent,

        ClientOrderCreateComponent,
        ClientOrderBuyComponent,
        ClientOrderSellComponent,
        ClientOrderFxComponent,

        ClientPortfolioComponent
    ],
    providers: [],
})
export class ClientModule {

}

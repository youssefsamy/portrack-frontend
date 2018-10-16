/**
 * Created by ApolloYr on 5/10/2018.
 */
import {Component, OnInit} from "@angular/core";
import {ClientApi} from "../../../../services/clientapi.service";
import {SettingsService} from "../../../../services/setting.service";

@Component({
    selector: 'page-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {

    public placedOrders = [];
    public processOrders = [];
    public executedOrders = [];

    public portfolioDetail: any;

    processOrdersData = {
        page: 1,
        pageSize: 10,
        maxPageSize: 1,
        data: []
    };

    executedOrdersData = {
        page: 1,
        pageSize: 10,
        maxPageSize: 1,
        data: []
    };

    constructor(
        public api: ClientApi,
        public setting: SettingsService
    ) {

    }

    ngOnInit() {
        this.api.getOrdersList({status: 'waiting'}).subscribe(res => {
            this.placedOrders = res;

            console.log(res);
        });

        this.api.getOrdersList({status: 'executed'}).subscribe(res => {
            this.executedOrders = res;

            console.log(res);
        });

        let id = this.setting.getUserSetting('profile').client.id;
        if (id) {
            this.api.getClientTransactions(id, {}).subscribe(res => {
                this.processOrders = res;

                console.log(res);
            });

            this.api.getClientPortfolio(id, {}).subscribe(res => {
                this.portfolioDetail = res;

                console.log(res);
            });
        }
    }
}

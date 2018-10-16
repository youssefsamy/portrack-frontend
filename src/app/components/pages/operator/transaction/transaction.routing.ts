import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../../../services/authguard.service";
import { OperatorTransactionLayoutComponent } from "./transaction-layout/transaction-layout.component";
import { OperatorNewCashTransactionComponent } from "./new/newcash/newcash.component";
import { OperatorNewFxTransactionComponent } from "./new/newfx/newfx.component";
import { OperatorNewLoanTransactionComponent } from "./new/newloan/newloan.component";
import { OperatorNewDepositTransactionComponent } from "./new/newdeposit/newdeposit.component";
import { OperatorNewSecurityTransactionComponent } from "./new/newsecurity/newsecurity.component";
import { OperatorEditDepositTransactionComponent } from './edit/editdeposit/editdeposit.component';
import { OperatorEditCashTransactionComponent } from './edit/editcash/editcash.component';
import { OperatorEditFxTransactionComponent } from './edit/editfx/editfx.component';
import { OperatorEditLoanTransactionComponent } from './edit/editloan/editloan.component';
import { OperatorEditSecurityTransactionComponent } from './edit/editsecurity/editsecurity.component';
import { OperatorDetailCashTransactionComponent } from './detail/cash/cash.component';
import { OperatorDetailDepositTransactionComponent } from './detail/deposit/deposit.component';
import { OperatorDetailFxTransactionComponent } from './detail/fx/fx.component';
import { OperatorDetailLoanTransactionComponent } from './detail/loan/loan.component';
import { OperatorDetailSecurityTransactionComponent } from './detail/security/security.component';
import { OperatorHoldingTransactionComponent } from './holding/holding.component';

export const OperatorTransactionRoute: Routes = [
    {
        path: '', component: OperatorTransactionLayoutComponent,
        children: [
            {
                path: 'new/cash/:clientId',
                component: OperatorNewCashTransactionComponent
            },
            {
                path: 'new/fx/:clientId',
                component: OperatorNewFxTransactionComponent
            },
            {
                path: 'new/loan/:clientId',
                component: OperatorNewLoanTransactionComponent
            },
            {
                path: 'new/deposit/:clientId',
                component: OperatorNewDepositTransactionComponent
            },
            {
                path: 'new/security/:clientId',
                component: OperatorNewSecurityTransactionComponent
            },
            {
                path: 'edit/cash/:transactionId',
                component: OperatorEditCashTransactionComponent
            },
            {
                path: 'edit/deposit/:transactionId',
                component: OperatorEditDepositTransactionComponent
            },
            {
                path: 'edit/fx/:transactionId',
                component: OperatorEditFxTransactionComponent
            },
            {
                path: 'edit/loan/:transactionId',
                component: OperatorEditLoanTransactionComponent
            },
            {
                path: 'edit/security/:transactionId',
                component: OperatorEditSecurityTransactionComponent
            },

            {
                path: 'detail/cash/:transactionId',
                component: OperatorDetailCashTransactionComponent
            },
            {
                path: 'detail/deposit/:transactionId',
                component: OperatorDetailDepositTransactionComponent
            },
            {
                path: 'detail/fx/:transactionId',
                component: OperatorDetailFxTransactionComponent
            },
            {
                path: 'detail/loan/:transactionId',
                component: OperatorDetailLoanTransactionComponent
            },
            {
                path: 'detail/security/:transactionId',
                component: OperatorDetailSecurityTransactionComponent
            },

            {
                path: 'holding/:holdingId',
                component: OperatorHoldingTransactionComponent
            },
        ]
    }
];

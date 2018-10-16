import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { OperatorDashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../../../services/authguard.service';

export const OperatorRoute: Routes = [
  {
    path: 'operator',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: OperatorDashboardComponent
      },
      {
        path: 'portfolio',
        loadChildren: './portfolio/portfolio.module#OperatorPortfolioModule'
      },
      {
        path: 'transaction',
        loadChildren:
          './transaction/transaction.module#OperatorTransactionModule'
      },
      {
        path: 'order',
        loadChildren: './order/order.module#OperatorOrderModule'
      },
      {
        path: 'prospect',
        loadChildren: './prospect/prospect.module#ProspectModule'
      },
      {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#OperatorCalendarModule'
      },
      {
        path: 'task',
        loadChildren: './task/task.module#OperatorTaskModule'
      },
      {
        path: 'security',
        loadChildren: './security/security.module#OperatorSecurityModule'
      }
    ],
    resolve: {
      user: AuthGuard
    }
  }
];

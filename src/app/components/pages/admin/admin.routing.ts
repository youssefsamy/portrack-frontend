import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../../../services/authguard.service';
import { AdminNewOperatorComponent } from './new/operator/operator.component';
import { AdminNewClientComponent } from './new/client/client.component';
import { AdminNewClientAccountComponent } from './new/clientaccount/clientaccount.component';
import { AdminDetailOperatorComponent } from './detail/operator/operator.component';
import { AdminDetailClientComponent } from './detail/client/client.component';
import { AdminEditOperatorComponent } from './edit/operator/operator.component';
import { AdminEditClientComponent } from './edit/client/client.component';
import { AdminEditClientAccountComponent } from './edit/clientaccount/clientaccount.component';

export const AdminRoute: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },

      {
        path: 'new/operator',
        component: AdminNewOperatorComponent
      },
      {
        path: 'new/client',
        component: AdminNewClientComponent
      },
      {
        path: 'new/clientaccount/:userId/:clientId',
        component: AdminNewClientAccountComponent
      },

      {
        path: 'detail/operator/:id',
        component: AdminDetailOperatorComponent
      },
      {
        path: 'detail/client/:id',
        component: AdminDetailClientComponent
      },

      {
        path: 'edit/operator/:id',
        component: AdminEditOperatorComponent
      },
      {
        path: 'edit/client/:id',
        component: AdminEditClientComponent
      },
      {
        path: 'edit/clientaccount/:id',
        component: AdminEditClientAccountComponent
      }
    ],
    resolve: {
      user: AuthGuard
    }
  }
];

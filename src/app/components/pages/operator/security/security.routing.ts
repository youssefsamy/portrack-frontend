import { Routes, RouterModule } from '@angular/router';
import { OperatorNewSecurityComponent } from './new/new.component';
import { OperatorEditSecurityComponent } from './edit/edit.component';

export const OperatorScurityRoute: Routes = [
  {
    path: 'new',
    component: OperatorNewSecurityComponent
  },
  {
    path: 'update',
    component: OperatorEditSecurityComponent
  },
];

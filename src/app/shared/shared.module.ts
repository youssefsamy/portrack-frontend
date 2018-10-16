/**
 * Created by ApolloYr on 2/5/2018.
 */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ISINComponent } from './components/ISIN/ISIN.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  entryComponents: [ISINComponent],
  declarations: [ISINComponent, PaginatorComponent],
  exports: [ISINComponent, PaginatorComponent],
  providers: []
})
export class SharedModule {}

/**
 * Created by Alex on 5/21/2018.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OperatorScurityRoute } from './security.routing';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { OperatorNewSecurityComponent } from './new/new.component';
import { OperatorEditSecurityComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(OperatorScurityRoute),
    SharedModule
  ],
  entryComponents: [],
  declarations: [
    OperatorNewSecurityComponent,
    OperatorEditSecurityComponent
  ],
  exports: [
    OperatorNewSecurityComponent,
    OperatorEditSecurityComponent
  ],
  providers: []
})
export class OperatorSecurityModule { }

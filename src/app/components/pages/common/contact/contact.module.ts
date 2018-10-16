/**
 * Created by Alex on 5/21/2018.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgArrayPipesModule } from 'ngx-pipes';

import { ContactRoute } from './contact.routing';
import { ListComponent } from './list/list.component';
import { ContactLayoutComponent } from './contact-layout/contact-layout.component';
import { SendMailComponent } from './send-mail/send-mail.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgArrayPipesModule,
    SharedModule,
    RouterModule.forChild(ContactRoute)
  ],
  entryComponents: [],
  declarations: [
    ListComponent,
    ContactLayoutComponent,
    SendMailComponent,
    CreateComponent,
    UpdateComponent
  ],
  exports: [],
  providers: []
})
export class ContactModule {}

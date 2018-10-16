/**
 * Created by Alex on 5/21/2018.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgArrayPipesModule } from 'ngx-pipes';

import { TaskApi } from './task.api';
import { TaskListPage } from './list/task.list.page';
import { TaskForm } from './form/task.form';
import { TaskCreatePage } from './create/task.create.page';
import { TaskEditPage } from './edit/task.edit.page';

import { SharedModule } from 'shared/shared.module';

const routes: Routes = [
  { path: 'list', component: TaskListPage },
  { path: 'create', component: TaskCreatePage },
  { path: ':id', component: TaskEditPage },
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    NgxPaginationModule,
    NgArrayPipesModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [],
  declarations: [TaskListPage, TaskForm, TaskCreatePage, TaskEditPage],
  exports: [],
  providers: [TaskApi]
})
export class OperatorTaskModule {}

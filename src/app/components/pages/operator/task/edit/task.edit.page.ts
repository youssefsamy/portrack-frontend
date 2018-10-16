import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotifyService } from 'services/notify.service';
import { TaskApi } from '../task.api';

@Component({
  selector: 'page-task-edit',
  templateUrl: './task.edit.page.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None
})
export class TaskEditPage {
  public task: any = {};

  constructor(
    public api: TaskApi,
    public route: ActivatedRoute,
    public router: Router,
    public notify: NotifyService
  ) {
    this.route.params.subscribe(params => {
      this.api.getTask(params.id).subscribe(res => {
        this.task = res;
      });
    });
  }

  handleSubmit(values) {
    this.api.updateTask(this.task.id, values).subscribe(
      res => {
        this.notify.showNotification(
          'success',
          'Task has been updated successfully'
        );
        this.router.navigate(['/operator/task/list']);
      },
      err => {
        this.notify.showNotification(
          'danger',
          'Sorry. updating has been failed'
        );
      }
    );
  }
}

/**
 * Created by Alex on 5/24/2018.
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotifyService } from 'services/notify.service';
import { TaskApi } from '../task.api';

@Component({
  selector: 'page-task-create',
  templateUrl: './task.create.page.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None
})
export class TaskCreatePage {
  public task: any = {};

  constructor(
    public api: TaskApi,
    public route: ActivatedRoute,
    public router: Router,
    public notify: NotifyService
  ) {}

  handleSubmit(values) {
    this.api.createTask(values).subscribe(
      res => {
        this.notify.showNotification(
          'success',
          'Task has been created successfully'
        );
        this.router.navigate(['/operator/task/list']);
      },
      err => {
        this.notify.showNotification(
          'danger',
          'Sorry. creating has been failed'
        );
      }
    );
  }
}

/**
 * Created by Alex on 5/24/2018.
 */
import {
  Component,
  ViewChild,
  ViewEncapsulation,
  OnInit,
  NgZone
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotifyService } from 'services/notify.service';
import { TaskApi } from '../task.api';

@Component({
  selector: 'page-task-list',
  templateUrl: './task.list.page.html',
  styleUrls: ['./task.list.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskListPage {
  public projects = [];
  public operators = [];
  public operatorFilter = '';
  public taskFilter = '';
  taskData = {
    page: 1,
    pageSize: 10,
    maxPageSize: 1
  };

  constructor(
    public api: TaskApi,
    public notify: NotifyService,
    public route: ActivatedRoute,
    public router: Router,
    public zone: NgZone
  ) {
    this.api.listAssignees().subscribe(res => {
      this.operators = res;
    });

    this.api.listProjects().subscribe(res => {
      // backup old tasks
      res.forEach(project => {
        project.filteredTasks = project.tasks;
      });
      this.projects = res;
    });
  }

  filterTasks() {
    this.projects.forEach(project => {
      project.filteredTasks = this.operatorFilter
        ? project.tasks.filter(item => item.assigned_to == this.operatorFilter)
        : project.tasks;
    });
  }

  changeTaskComplete($e, task) {
    this.api
      .updateTask(task.id, {
        completed: $e.target.checked
      })
      .subscribe(res => {
        this.notify.showNotification(
          'success',
          $e.target.checked
            ? `Task ${task.name} has been marked as completed`
            : `Task ${task.name} has been marked as incompleted`
        );
      });
  }
}

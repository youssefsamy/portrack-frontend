import { Injectable } from '@angular/core';
import { Api } from 'services/api.service';

@Injectable()
export class TaskApi extends Api {
  public listProjects() {
    return this.get('/tms/projects/');
  }

  public createProject(data) {
    return this.post('/tms/projects/', data);
  }

  public listAssignees() {
    return this.get('/tms/tasks/list_assignees/');
  }

  public createTask(data) {
    return this.post('/tms/tasks/', data);
  }

  public getTask(id) {
    return this.get(`/tms/tasks/${id}/`);
  }

  public updateTask(id, data) {
    return this.put(`/tms/tasks/${id}/`, data);
  }

  public deleteTask(id) {
    return this.delete(`/tms/tasks/${id}/`);
  }
}

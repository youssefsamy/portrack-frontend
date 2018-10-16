/**
 * Created by Alex on 5/24/2018.
 */
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { Validate } from 'services/validate.service';
import { TaskApi } from '../task.api';

@Component({
  selector: 'task-form',
  templateUrl: './task.form.html',
  styleUrls: []
})
export class TaskForm implements OnChanges {
  @Input() initialValue: any = {};
  @Output() submit: EventEmitter<any> = new EventEmitter();

  public form: FormGroup;
  public projects = [];
  public operators = [];

  constructor(
    public api: TaskApi,
    public formBuilder: FormBuilder,
    public validate: Validate
  ) {
    this.form = this.formBuilder.group({
      project: ['', Validators.required],
      name: ['', Validators.required],
      assigned_to: ['', Validators.required],
      deadline: ['', Validators.required]
    });
    this.api.listProjects().subscribe(res => {
      this.projects = res;
    });

    this.api.listAssignees().subscribe(res => {
      this.operators = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setValue(
        (this.initialValue && this.initialValue[key]) || ''
      );
    });
  }

  handleSubmit($event) {
    $event.preventDefault();

    if (!this.form.valid) {
      this.validate.validateAllFormFields(this.form);
      return;
    }

    const values = this.form.value;
    if (values.deadline) {
      values.deadline = moment(values.deadline).format('YYYY-MM-DD');
    }

    this.submit.emit(values);
  }
}

/**
 * Created by Alex on 5/24/2018.
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { Validate } from 'services/validate.service';
import { NotifyService } from 'services/notify.service';
import { ProspectApi } from '../../prospect.api';

@Component({
  selector: 'prospect-track-form',
  templateUrl: './prospect.track.form.html',
  styleUrls: []
})
export class ProspectTrackForm implements OnInit {
  @Input() prospectId: any = 0;
  public form: FormGroup;
  public icf = [];
  public trackFiles = [];
  public isCollapsed = true;

  constructor(
    public api: ProspectApi,
    public formBuilder: FormBuilder,
    public notify: NotifyService,
    public validate: Validate
  ) {
    this.form = this.formBuilder.group({
      file_type: ['', Validators.required],
      file_date: ['', Validators.required],
      file: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.api.listProspectTrackingFiles(this.prospectId).subscribe(res => {
      this.trackFiles = res;
    });
  }

  getFileName(url) {
    const split = url.split('/');
    return split.length && split[split.length - 1];
  }

  onFileChange($e) {
    this.form.controls.file.setValue($e.target.files[0]);
  }

  handleSubmit($event) {
    $event.preventDefault();
    for (let c in this.form.controls) {
      this.form.controls[c].markAsTouched();
    }
    if (!this.form.valid) return;

    const { value } = this.form;

    const formData: FormData = new FormData();
    formData.append('prospect', this.prospectId);
    formData.append('file_type', value.file_type);
    formData.append('file_date', moment(value.file_data).format('YYYY-MM-DD'));
    formData.append('file', value.file);

    this.api.createTrackingFile(formData).subscribe(
      res => {
        this.notify.showNotification(
          'success',
          'Track file has been created successfully'
        );
        this.form.reset();
        this.api.listProspectTrackingFiles(this.prospectId).subscribe(res => {
          this.trackFiles = res;
        });
      },
      err => {
        this.notify.showNotification(
          'error',
          'Sorry. Creating track file has been failed'
        );
      }
    );
  }
}

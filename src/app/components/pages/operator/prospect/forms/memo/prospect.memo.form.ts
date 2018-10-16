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
  selector: 'prospect-memo-form',
  templateUrl: './prospect.memo.form.html',
  styleUrls: []
})
export class ProspectMemoForm implements OnInit {
  @Input() prospectId: any = 0;
  @Input() information: any = {};
  @Output() ref: EventEmitter<any> = new EventEmitter();

  public form: FormGroup;
  public interests = [];
  public isCollapsed = true;
  public callMemos = [];

  constructor(
    public api: ProspectApi,
    public formBuilder: FormBuilder,
    public notify: NotifyService,
    public validate: Validate
  ) {
    const controls = {};

    this.form = this.formBuilder.group({
      date_of_meeting: ['', Validators.required],
      meeting_place: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      meeting_notes: [''],
      followup: ['']
    });
  }

  ngOnInit() {
    // this.ref.emit(this.form);
    this.api.listProspectCallMemos(this.prospectId).subscribe(res => {
      this.callMemos = res;
    });
  }

  getInterests(interests) {
    return interests && interests.map(item => item.name).join(',');
  }

  createCallMemo($event) {
    $event.preventDefault();
    for (let c in this.form.controls) {
      this.form.controls[c].markAsTouched();
    }
    if (!this.form.valid) return;

    this.api
      .createCallMemo({
        prospect: this.prospectId,
        ...this.form.value,
        date_of_meeting: moment(this.form.value.date_of_meeting).format(
          'YYYY-MM-DD'
        ),
        interests: this.interests
      })
      .subscribe(
        res => {
          this.form.reset();
          this.interests = [];
          this.notify.showNotification(
            'success',
            'Call memo has been created successfully'
          );
          this.api.listProspectCallMemos(this.prospectId).subscribe(res => {
            this.callMemos = res;
          });
        },
        () => {
          this.notify.showNotification(
            'error',
            'Sorry. creating call memo failed'
          );
        }
      );
  }

  handleInterestChange($event, interestId) {
    const value = this.interests;
    if ($event.target.checked) {
      this.interests = [...value, interestId];
    } else {
      this.interests = value.filter(item => item != interestId);
    }
  }
}

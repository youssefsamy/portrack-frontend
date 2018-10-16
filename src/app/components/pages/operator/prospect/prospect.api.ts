import { Injectable } from '@angular/core';
import { Api } from 'services/api.service';

@Injectable()
export class ProspectApi extends Api {
  public listInformation() {
    return this.get('/prm/prospects/information/');
  }

  public listCompany() {
    return this.get('/prm/companies/');
  }

  public createCompany(data) {
    return this.post('/prm/companies/', data);
  }

  public searchProspect(query?) {
    return this.get(`/prm/prospects/${query ? `?q=${query}` : ''}`);
  }

  public createPropspect(data) {
    return this.post('/prm/prospects/', data);
  }

  public updatePropspect(id, data) {
    return this.put(`/prm/prospects/${id}/`, data);
  }

  public getProspect(id) {
    return this.get(`/prm/prospects/${id}/`);
  }

  public getCompany(id) {
    return this.get(`/prm/companies/${id}/`);
  }

  public updateCompany(id, data) {
    return this.put(`/prm/companies/${id}/`, data);
  }

  public listProspectCallMemos(prospectId) {
    return this.get(`/prm/prospects/${prospectId}/call_memos/`);
  }

  public createCallMemo(data) {
    return this.post('/prm/call_memos/', data);
  }

  public listTrackingFiles() {
    return this.get('/prm/tracking_files/');
  }

  public listProspectTrackingFiles(prospectId) {
    return this.get(`/prm/prospects/${prospectId}/tracking_files/`);
  }

  public createTrackingFile(data) {
    return this.post('/prm/tracking_files/', data);
  }
}

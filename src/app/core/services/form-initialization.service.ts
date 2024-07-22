import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormInitializationModel } from 'src/app/shared/models/form-initialization.model';
import { Part } from 'src/app/shared/models/part.model';
import { GroupId } from 'src/app/shared/models/group.model';
import { Lov } from 'src/app/shared/models/lov.model';

@Injectable({
  providedIn: 'root'
})
export class FormInitializationService {
  private globalParameter: number = 0;
  private formMode: string = 'Create Mode';

  constructor(private http: HttpClient) {}

  initializeForm(): Observable<FormInitializationModel> {
    const formData: FormInitializationModel = {
      SCREENNAME: 'Form Initialization',
      SYSDATE: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      GROUP_ID: '',
      PARTNO: '',
      PART_STATUS: '',
      PART_DESC: '',
      LINE_ID: '',
      UNIT_ID: '',
      UNIT_NAME: '',
      GROUP_NAME: '',
      LINE_DESC: '',
      PART_ID: ''
    };
    return of(formData);
  }

  resetFormFields(): void {
    // Logic to clear all form fields without validation
  }

  enableField(fieldName: string): void {
    // Logic to enable the specified field
  }

  setFieldValue(fieldName: string, value: any): void {
    // Logic to set the specified field to the given value
  }

  executeTrigger(triggerName: string): void {
    // Logic to execute the specified trigger
  }

  clearForm(): void {
    this.resetFormFields();
    this.enableField('UNIT_ID');
    this.setFieldValue('PART_STATUS', 'A');
    this.executeTrigger('WHEN-NEW-FORM-INSTANCE');
  }

  reinitializeForm(): void {
    this.clearForm();
    this.setPartStatus('A');
    this.setGlobalParameter(1);
    this.setMode('Edit Mode');
  }

  setPartStatus(status: string): void {
    this.setFieldValue('PART_STATUS', status);
  }

  setGlobalParameter(parameter: number): void {
    this.globalParameter = parameter;
  }

  setMode(mode: string): void {
    this.formMode = mode;
  }

  savePart(part: Part): Observable<any> {
    const url = '/api/parts';
    return this.http.post(url, part);
  }

  updatePart(part: Part): Observable<any> {
    const url = `/api/parts/${part.PART_ID}`;
    return this.http.put(url, part);
  }

  getFormData(): Observable<FormInitializationModel> {
    return this.initializeForm();
  }

  getGlobalParameter(): number {
    return this.globalParameter;
  }

  getLineLov(): Observable<any[]> {
    const url = '/api/line-lov';
    return this.http.get<any[]>(url);
  }

  getEditLineLov(): Observable<any[]> {
    const url = '/api/edit-line-lov';
    return this.http.get<any[]>(url);
  }

  validateLineId(lineId: string, lineDesc: string): Observable<boolean> {
    const url = '/api/validate-line';
    return this.http.post<boolean>(url, { lineId, lineDesc, globalParameter: this.globalParameter });
  }

  getGroupIds(globalParameter: number): Observable<GroupId[]> {
    const url = `/api/groups?globalParameter=${globalParameter}`;
    return this.http.get<GroupId[]>(url);
  }

  validateGroupId(globalParameter: number, groupId: string, groupName: string): Observable<boolean> {
    const url = '/api/groups/validate';
    return this.http.post<boolean>(url, { globalParameter, groupId, groupName });
  }

  getLovForUnitId(globalParameter: number): Observable<Lov[]> {
    const url = `/api/unit-lov?globalParameter=${globalParameter}`;
    return this.http.get<Lov[]>(url);
  }

  validateUnitId(globalParameter: number, unitId: string, unitName: string): Observable<boolean> {
    const url = '/api/validate-unit';
    return this.http.post<boolean>(url, { globalParameter, unitId, unitName });
  }
}

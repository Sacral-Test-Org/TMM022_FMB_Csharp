import { Component, OnInit } from '@angular/core';
import { FormInitializationService } from 'src/app/core/services/form-initialization.service';
import { FormInitializationModel } from 'src/app/shared/models/form-initialization.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-initialization',
  templateUrl: './form-initialization.component.html',
  styleUrls: ['./form-initialization.component.scss']
})
export class FormInitializationComponent implements OnInit {
  formValues: FormInitializationModel;
  globalParameter: number = 0;
  mode: string;
  screenName: string;
  sysDate: string;

  constructor(private formInitializationService: FormInitializationService) {}

  ngOnInit(): void {
    this.formInitializationService.initializeForm().subscribe((data: FormInitializationModel) => {
      this.setFormValues(data);
    });
  }

  setFormValues(formValues: FormInitializationModel): void {
    this.formValues = formValues;
    this.screenName = 'T K A P - [IS]';
    this.sysDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).replace(/ /g, '-');
    this.globalParameter = 0;
    this.mode = this.globalParameter === 0 ? 'Create Mode' : 'Edit Mode';
    document.body.style.cursor = 'default';
    this.formValues.saveButtonDisabled = true;
    this.formValues.groupIdEnabled = true;
    this.formValues.partNoEnabled = true;
    this.formValues.partStatusEnabled = true;
    this.formValues.partDescEnabled = true;
    this.formValues.lineIdEnabled = true;
    if (!this.formValues.unitIdEnabled) {
      this.formValues.unitIdEnabled = true;
    }
    setTimeout(() => {
      document.getElementById('unitId').focus();
    }, 0);
  }

  saveData(): void {
    this.formInitializationService.saveFormData(this.formValues).subscribe();
  }

  clearData(): void {
    this.formInitializationService.resetFormFields();
    this.formInitializationService.enableField('UNIT_ID');
    this.formInitializationService.setFieldValue('PART_STATUS', 'A');
    this.formInitializationService.executeTrigger('WHEN-NEW-FORM-INSTANCE');
  }

  editData(): void {
    this.clearData();
    this.formInitializationService.reinitializeForm();
    this.formInitializationService.setPartStatus('A');
    this.formInitializationService.setGlobalParameter(1);
    this.formInitializationService.setMode('Edit Mode');
    this.formValues.editButtonDisabled = true;
  }

  exitForm(): void {
    if (confirm('Do you want to exit?')) {
      window.close();
    }
  }

  validateFields(): boolean {
    if (!this.formValues.partId) {
      alert('Kindly Choose data from LOV before changing Description....');
      return false;
    }
    if (!this.formValues.unitName) {
      alert('UNIT_ID and UNIT_NAME should not be null');
      return false;
    }
    if (!this.formValues.groupName) {
      alert('GROUP_ID and GROUP_NAME should not be null');
      return false;
    }
    if (!this.formValues.lineDesc) {
      alert('LINE_ID and LINE_DESC should not be null');
      return false;
    }
    if (!this.formValues.partNo) {
      alert('PARTNO and PART_DESC should not be null');
      return false;
    }
    if (!this.formValues.partDesc) {
      alert('PART_DESC should not be null');
      return false;
    }
    if (!this.formValues.partStatus) {
      alert('PART_STATUS should not be null');
      return false;
    }
    return true;
  }

  savePart(): void {
    if (this.validateFields()) {
      this.formInitializationService.savePart(this.formValues).subscribe();
    }
  }

  updatePart(): void {
    if (this.validateFields()) {
      this.formInitializationService.updatePart(this.formValues).subscribe();
    }
  }

  displaySystemDate(): string {
    return new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).replace(/ /g, '-');
  }

  displayScreenName(): string {
    return 'T K A P - [IS]';
  }

  displayModeOfOperation(): string {
    return this.globalParameter === 0 ? 'Create Mode' : 'Edit Mode';
  }

  validatePartStatus(partStatus: string): void {
    if (!partStatus) {
      alert('PART_STATUS CANNOT BE NULL');
      document.getElementById('partStatus').focus();
    }
  }

  validateRelatedFields(unitId: string, unitName: string, groupId: string, groupName: string, lineId: string, lineDesc: string, partNo: string, partStatus: string, globalParam: number): void {
    if (!unitId || !unitName) {
      alert('Unit ID and Unit Name should not be null');
      document.getElementById('unitId').focus();
      return;
    }
    if (!groupId || !groupName) {
      alert('Group ID and Group Name should not be null');
      document.getElementById('groupId').focus();
      return;
    }
    if (!lineId || !lineDesc) {
      alert('Line ID and Line Name should not be null');
      document.getElementById('lineId').focus();
      return;
    }
    if (globalParam === 0) {
      if (!partNo) {
        alert('Part No and Part Description should not be null');
        document.getElementById('partNo').focus();
        return;
      }
      if (unitId && unitName && groupId && groupName && lineId && lineDesc && partNo && partStatus) {
        this.formValues.saveButtonDisabled = false;
        document.getElementById('saveButton').focus();
      }
    } else if (globalParam === 1) {
      if (!this.formValues.partId) {
        alert('Kindly Choose data from LOV before changing Description....');
        document.getElementById('partNo').focus();
        return;
      }
      if (!partNo || !this.formValues.partDesc) {
        alert('Part No and Part Description should not be null');
        document.getElementById('partNo').focus();
        return;
      }
      if (unitId && unitName && groupId && groupName && lineId && lineDesc && this.formValues.partId && partNo && partStatus) {
        this.formValues.saveButtonDisabled = false;
        document.getElementById('saveButton').focus();
      }
    }
  }

  onLineIdDoubleClick(): void {
    const globalParam = this.formInitializationService.getGlobalParameter();
    if (globalParam === 0) {
      this.formInitializationService.getLineLov().subscribe((data: any[]) => {
        // Display LINE_LOV
      });
    } else if (globalParam === 1) {
      this.formInitializationService.getEditLineLov().subscribe((data: any[]) => {
        // Display EDIT_LINE_LOV
      });
    }
    document.getElementById('partNo').focus();
  }

  onLineIdClick(): void {
    this.formValues.saveButtonDisabled = true;
    this.formValues.lineId = '';
    this.formValues.lineDesc = '';
    this.formValues.partId = '';
    this.formValues.partNo = '';
    this.formValues.partDesc = '';
    document.getElementById('lineId').focus();
  }

  onNextItem(): void {
    if (!this.formValues.unitId || !this.formValues.unitName) {
      alert('Unit ID and Unit Name should not be null');
      document.getElementById('unitId').focus();
      return;
    }
    if (!this.formValues.groupId || !this.formValues.groupName) {
      alert('Group ID and Group Name should not be null');
      document.getElementById('groupId').focus();
      return;
    }
    if (!this.formValues.lineId || !this.formValues.lineDesc) {
      alert('Line ID and Line Name should not be null');
      document.getElementById('lineId').focus();
      return;
    }
    document.getElementById('partNo').focus();
  }

  onLineIdValidate(): boolean {
    const lineId = this.formValues.lineId;
    const lineDesc = this.formValues.lineDesc;
    const globalParam = this.formInitializationService.getGlobalParameter();
    if (globalParam === 0) {
      return this.formInitializationService.validateLineId({ lineId, lineDesc });
    } else if (globalParam === 1) {
      return this.formInitializationService.validateLineId({ lineId, lineDesc });
    }
    return false;
  }

  handlePartDescriptionClick(): void {
    this.formValues.saveButtonDisabled = true;
    this.formValues.partDesc = '';
    document.getElementById('partDesc').focus();
  }

  handlePartDescriptionDoubleClick(): void {
    this.handlePartDescriptionClick();
  }

  navigateToNextItem(): void {
    if (!this.validateFields()) {
      return;
    }
    document.getElementById('partStatus').focus();
  }

  onGroupIdDoubleClick(event: MouseEvent): void {
    const globalParam = this.formInitializationService.getGlobalParameter();
    this.formInitializationService.getGroupIds(globalParam).subscribe((data: any[]) => {
      // Display Group ID LOV
    });
    document.getElementById('lineId').focus();
  }

  onGroupIdClick(event: MouseEvent): void {
    this.formValues.saveButtonDisabled = true;
    this.formValues.groupId = '';
    this.formValues.groupName = '';
    this.formValues.lineId = '';
    this.formValues.lineDesc = '';
    this.formValues.partId = '';
    this.formValues.partNo = '';
    this.formValues.partDesc = '';
    document.getElementById('groupId').focus();
  }

  onNavigateNextItem(event: KeyboardEvent): void {
    if (!this.formValues.unitId || !this.formValues.unitName) {
      alert('Unit ID and Unit Name should not be null');
      document.getElementById('unitId').focus();
      return;
    }
    if (!this.formValues.groupId || !this.formValues.groupName) {
      alert('Group ID and Group Name should not be null');
      document.getElementById('groupId').focus();
      return;
    }
    document.getElementById('lineId').focus();
  }

  validateGroupIdField(): void {
    const globalParam = this.formInitializationService.getGlobalParameter();
    const groupId = this.formValues.groupId;
    const groupName = this.formValues.groupName;
    this.formInitializationService.validateGroupId(globalParam, groupId, groupName).subscribe((isValid: boolean) => {
      if (!isValid) {
        alert('Invalid Group ID or Group Name');
      }
    });
  }

  onPartNumberDoubleClick(): void {
    const globalParam = this.formInitializationService.getGlobalParameter();
    if (globalParam === 0) {
      this.formInitializationService.showPartNumberLOV().subscribe((data: any[]) => {
        // Display Part Number LOV
      });
    } else if (globalParam === 1) {
      this.formInitializationService.showPartNumberLOV().subscribe((data: any[]) => {
        // Display Part Number LOV for editing
      });
    }
    document.getElementById('partDesc').focus();
  }

  onPartNumberClick(): void {
    this.formValues.saveButtonDisabled = true;
    this.formValues.partId = '';
    this.formValues.partNo = '';
    this.formValues.partDesc = '';
    document.getElementById('partNo').focus();
  }

  onNextItem(): void {
    if (!this.formValues.unitId || !this.formValues.unitName) {
      alert('Unit ID and Unit Name should not be null');
      document.getElementById('unitId').focus();
      return;
    }
    if (!this.formValues.groupId || !this.formValues.groupName) {
      alert('Group ID and Group Name should not be null');
      document.getElementById('groupId').focus();
      return;
    }
    if (!this.formValues.lineId || !this.formValues.lineDesc) {
      alert('Line ID and Line Name should not be null');
      document.getElementById('lineId').focus();
      return;
    }
    if (this.formInitializationService.getGlobalParameter() === 0) {
      if (!this.formValues.partNo) {
        alert('Part No and Part Description should not be null');
        document.getElementById('partNo').focus();
        return;
      }
    } else if (this.formInitializationService.getGlobalParameter() === 1) {
      if (!this.formValues.partId) {
        alert('Kindly Choose data from LOV before changing Description....');
        document.getElementById('partNo').focus();
        return;
      }
      if (!this.formValues.partNo || !this.formValues.partDesc) {
        alert('Part No and Part Description should not be null');
        document.getElementById('partNo').focus();
        return;
      }
    }
    document.getElementById('partStatus').focus();
  }

  onPartNumberValidation(): void {
    const partNo = this.formValues.partNo;
    const globalParam = this.formInitializationService.getGlobalParameter();
    if (globalParam === 0) {
      this.formInitializationService.checkPartNumberExistence(partNo).subscribe((exists: boolean) => {
        if (!exists) {
          alert('Part number does not exist');
        }
      });
    } else if (globalParam === 1) {
      this.formInitializationService.checkPartNumberExistence(partNo).subscribe((exists: boolean) => {
        if (!exists) {
          alert('Part number does not exist');
        }
      });
    }
  }

  onUnitIdDoubleClick(event: MouseEvent): void {
    const globalParam = this.formInitializationService.getGlobalParameter();
    this.formInitializationService.getLovForUnitId(globalParam).subscribe((data: any[]) => {
      // Display Unit ID LOV
    });
  }

  onUnitIdClick(event: MouseEvent): void {
    this.formValues.saveButtonDisabled = true;
    this.formValues.unitName = '';
    this.formValues.groupId = '';
    this.formValues.groupName = '';
    this.formValues.lineId = '';
    this.formValues.lineDesc = '';
    this.formValues.partId = '';
    this.formValues.partNo = '';
    this.formValues.partDesc = '';
    document.getElementById('unitId').focus();
  }

  onUnitIdFieldExit(event: FocusEvent): void {
    if (!this.formValues.unitId || !this.formValues.unitName) {
      alert('Unit ID and Unit Name should not be null');
      document.getElementById('unitId').focus();
      return;
    }
    document.getElementById('groupId').focus();
  }

  validateUnitId(unitId: string, unitName: string): void {
    const globalParam = this.formInitializationService.getGlobalParameter();
    this.formInitializationService.validateUnitId(globalParam, unitId, unitName).subscribe((isValid: boolean) => {
      if (!isValid) {
        alert('Invalid Unit ID or Unit Name');
      }
    });
  }
}

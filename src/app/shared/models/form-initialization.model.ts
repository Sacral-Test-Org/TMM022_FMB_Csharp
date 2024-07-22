export class FormInitializationModel {
  screenName: string;
  sysDate: Date;
  mode: string;
  unitId: string;
  groupId: string;
  partNo: string;
  partStatus: string;
  partDesc: string;
  lineId: string;
  saveDisabled: boolean;
  groupIdEnabled: boolean;
  partNoEnabled: boolean;
  partStatusEnabled: boolean;
  partDescEnabled: boolean;
  lineIdEnabled: boolean;
  unitIdEnabled: boolean;
  cursorPosition: string;

  constructor() {
    this.screenName = 'T K A P - [IS]';
    this.sysDate = new Date();
    this.mode = 'Create Mode';
    this.unitId = '';
    this.groupId = '';
    this.partNo = '';
    this.partStatus = '';
    this.partDesc = '';
    this.lineId = '';
    this.saveDisabled = true;
    this.groupIdEnabled = true;
    this.partNoEnabled = true;
    this.partStatusEnabled = true;
    this.partDescEnabled = true;
    this.lineIdEnabled = true;
    this.unitIdEnabled = true;
    this.cursorPosition = 'UNIT_ID';
  }
}
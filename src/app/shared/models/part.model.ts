export class Part {
  unitId: string;
  unitName: string;
  groupId: string;
  groupName: string;
  lineId: string;
  lineDescription: string;
  partId: string;
  partNo: string;
  partDescription: string;
  partStatus: string;
  globalParam: number;

  constructor(
    unitId: string = '',
    unitName: string = '',
    groupId: string = '',
    groupName: string = '',
    lineId: string = '',
    lineDescription: string = '',
    partId: string = '',
    partNo: string = '',
    partDescription: string = '',
    partStatus: string = '',
    globalParam: number = 0
  ) {
    this.unitId = unitId;
    this.unitName = unitName;
    this.groupId = groupId;
    this.groupName = groupName;
    this.lineId = lineId;
    this.lineDescription = lineDescription;
    this.partId = partId;
    this.partNo = partNo;
    this.partDescription = partDescription;
    this.partStatus = partStatus;
    this.globalParam = globalParam;
  }
}
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  message: string;
  options: string[];

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data.message;
    this.options = data.options;
  }

  onOptionClick(option: string): void {
    this.dialogRef.close(option === 'Yes');
  }

  static show(dialog: MatDialog, message: string, options: string[]): Promise<boolean> {
    const dialogRef = dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message, options }
    });

    return dialogRef.afterClosed().toPromise();
  }
}

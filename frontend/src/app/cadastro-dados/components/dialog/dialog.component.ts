import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  public title!: string;
  public text!: string;
  public button1!: string;
  public button2!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string, button1: string, button2: string }) {
    this.text = data.text;
    this.button1 = data.button1;
    this.button2 = data.button2;
  }

  onDelete() {
    this.dialogRef.close('delete');
  }

}

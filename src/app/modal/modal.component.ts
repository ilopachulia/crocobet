import {Component, Inject, inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from "@angular/material/dialog";
import {Post} from "../posts/types";
import {MatIcon} from "@angular/material/icon";

export interface DialogData {
  post: Post;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose, MatIcon],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {

  constructor(private dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data?: any) {}
}

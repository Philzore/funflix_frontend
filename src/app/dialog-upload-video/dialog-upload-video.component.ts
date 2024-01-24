import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-upload-video',
  standalone: true,
  imports: [],
  templateUrl: './dialog-upload-video.component.html',
  styleUrl: './dialog-upload-video.component.scss'
})
export class DialogUploadVideoComponent {

  constructor(
    public dialogRef:MatDialogRef<DialogUploadVideoComponent>,
  ) {

  }

}

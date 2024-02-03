import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-upload-video',
  standalone: true,
  imports: [],
  templateUrl: './dialog-upload-video.component.html',
  styleUrl: './dialog-upload-video.component.scss'
})
export class DialogUploadVideoComponent implements AfterViewInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInfo') fileInfo: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DialogUploadVideoComponent>,
  ) { }

  ngAfterViewInit(): void {
    this.fileInput.nativeElement.addEventListener('change', (event) => {
      const file = event.target.files[0] ;

      if (file) {
        const fileName = file.name ;
        const fileSize = this.formatBytes(file.size) ;
        this.fileInfo.nativeElement.innerHTML = `<b>Selected file:</b> ${fileName} (${fileSize})` ;
      } else {
        this.fileInfo.nativeElement.innerHTML = '' ;
      }
    });
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

}

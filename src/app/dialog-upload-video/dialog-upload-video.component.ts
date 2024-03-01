import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Video } from '../models/video.class';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../service/backend.service';

@Component({
  selector: 'app-dialog-upload-video',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dialog-upload-video.component.html',
  styleUrl: './dialog-upload-video.component.scss'
})
export class DialogUploadVideoComponent implements AfterViewInit {
  @ViewChild('uploadForm') uploadForm: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInfo') fileInfo: ElementRef;
 

  fileToUpload: Video = new Video() ;

  uploadInProgress = false ;

  constructor(
    public dialogRef: MatDialogRef<DialogUploadVideoComponent>,
    private backendService: BackendService,
  ) { }

  ngAfterViewInit(): void {
    this.uploadForm.nativeElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.postFile();
    });

    this.fileInput.nativeElement.addEventListener('change', (event) => {
      const file = event.target.files[0];

      if (file) {
        const fileName = file.name;
        const fileSize = this.formatBytes(file.size);
        this.fileInfo.nativeElement.innerHTML = `<b>Selected file:</b> ${fileName} (${fileSize})`;
      } else {
        this.fileInfo.nativeElement.innerHTML = '';
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

  postFile() {
    const fileInputElement = this.fileInput.nativeElement;
    const selectedFile = fileInputElement.files[0];
    this.fileToUpload.file = selectedFile ;
    if (selectedFile) {
      
      this.uploadInProgress = true ;
      console.log('Upload :', this.fileToUpload) ;
      this.backendService.addVideo(this.fileToUpload);
      this.uploadInProgress = false ;
    }
    
  }

}

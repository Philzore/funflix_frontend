import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Video } from '../models/video.class';
import { BackendService } from '../service/backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { ImageObject } from '../models/imageObject.class';


@Component({
  selector: 'app-dialog-upload-video',
  templateUrl: './dialog-upload-video.component.html',
  styleUrl: './dialog-upload-video.component.scss'
})
export class DialogUploadVideoComponent implements AfterViewInit, OnInit {
  @ViewChild('uploadForm') uploadForm: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInfo') fileInfo: ElementRef;
  @ViewChild('spinner') spinner: ElementRef;
  @ViewChild('uploadBtn') uploadBtn: ElementRef;


  fileToUpload: Video = new Video();

  uploadInProgress = false;

  durationInSeconds = 5;

  constructor(
    public router: Router,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogUploadVideoComponent>,
    private backendService: BackendService,
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    
  }

  /**
   * open the snackbar with message
   * 
   * @param message which shown in snackbar
   */
  openSnackBar(message: string) {
    this._snackBar.openFromComponent(MessageSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { 'message': message },
    });
  }

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

  /**
   * close current upload dialog
   * 
   */
  closeDialog() {
    this.dialogRef.close();
    this.router.navigateByUrl('start-screen');
  }

  /**
   * format bytes to readable format string
   * 
   * @param bytes to converted
   * @param decimals how much decimal places
   * @returns formated string of the data size
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  /**
   * create form data from the given video file
   * 
   */
  postFile() {
    const fileInputElement = this.fileInput.nativeElement;
    const selectedFile = fileInputElement.files[0];
    this.fileToUpload.file = selectedFile;

    const formData = new FormData();
    formData.append('file', this.fileToUpload.file);
    formData.append('title', this.fileToUpload.title);
    formData.append('description', this.fileToUpload.description);

    if (this.uploadValidation(selectedFile)) {
      this.uploadVideo(formData);
    }
  }

  /**
   * upload video to backend
   * 
   * @param formData of the video file
   */
  async uploadVideo(formData) {
    this.uploadInProgress = true;
    try {
      let resp = await this.backendService.addVideo(formData);
      if (resp['success'] == false) {
        this.openSnackBar(resp['message']);
      } else {
        this.openSnackBar('Video uploaded, it take some time to convert ;)');
        this.addVideoSyncSymbol();
        this.sharedService.saveContentInLocalStorage();
      }
    } catch (err) {
      this.openSnackBar(err);
    }
    this.uploadInProgress = false;

  }

  /**
   * add a video element to the current user with a sync symbol
   * to show that the video is not complete converted in the backend
   *  
   */
  addVideoSyncSymbol() {
    let foundUser = this.sharedService.userContent.find(user => user.username === this.sharedService.currentUser);
    let syncPlaceholder = new ImageObject({ title: this.fileToUpload.title, posterImage: '/assets/img/sync.png' });
    foundUser.imageObject.push(syncPlaceholder);
  }

  /**
  * validate the input fields for upload form 
  * 
  * @returns if there is a validation error or not
  */
  uploadValidation(selectedFile) {
    //check special chars
    if (this.containsSpecialCharacters(this.fileToUpload.title)) {
      this.openSnackBar('Don´t use special chars');
      return false;
    }
    // check video title
    if (this.fileToUpload.title.length < 3 || this.fileToUpload.title.length > 10) {
      this.openSnackBar('Wrong title length');
      return false;
    }

    // check video file exist
    if (!selectedFile) {
      this.openSnackBar('No file detected');
      return false;
    }
    return true;
  }

  /**
   * check if there are some special chars
   * 
   * @param input inputfield
   * @returns true if there are special chars ; false if not
   */
  containsSpecialCharacters(input: string): boolean {
    const specialCharacters = /`ß[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    return specialCharacters.test(input);
  }

}

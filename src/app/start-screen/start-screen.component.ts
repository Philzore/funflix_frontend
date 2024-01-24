import { Component, EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogUploadVideoComponent } from '../dialog-upload-video/dialog-upload-video.component';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  headerLinks = ['Upload', 'Video List', 'Logout'];
  activeLink = this.headerLinks[0];
  background: ThemePalette = undefined;

  videoListActive = true;

  users = ['Socke', 'Snow', 'Krümel', 'Schlapp'];


  imageObject = [{
    video: 'https://youtu.be/tYa6OLQHrEc',
    title: 'Youtube example one with title.',
    alt: 'youtube video'
  }, {
    video: 'https://youtu.be/6pxRHBw-k8M',
    alt: 'youtube video'
  }, {
    video: 'https://sanjayv.github.io/ng-image-slider/contents/assets/video/movie2.mp4',
    posterImage: "https://slotuniverses.co.uk/wp-content/uploads/sites/12030/upload_fed1091b34dcf8203c0729c4faa62315.png",
    title: 'Youtube example one with title.'
  }];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private sharedService: SharedService,
  ) { }

  openLink() {
    switch (this.activeLink) {
      case 'Upload':
        this.openUploadDialog();

        break;

      case 'Logout':
        this.router.navigate(['']);

        break;

      default:
        break;
    }
  }

  openUploadDialog() {
    this.router.navigate(['start-screen/add_video']);
    this.dialog.open(DialogUploadVideoComponent);
  }

  clearLocalStorage() {
    if (!this.sharedService.rememberMeActiv) {
      localStorage.clear();
    }
  }
}

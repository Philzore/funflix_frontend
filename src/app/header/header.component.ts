import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogUploadVideoComponent } from '../dialog-upload-video/dialog-upload-video.component';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  headerLinks = ['Upload', 'Video List', 'Logout'];
  activeLink = this.headerLinks[0];
  background: ThemePalette = undefined;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public sharedService: SharedService,
  ) {
  }

  openLink() {
    switch (this.activeLink) {
      case 'Upload':
        this.openUploadDialog();

        break;

      case 'Video List':
        this.router.navigate(['start-screen']);;

        break;

      case 'Logout':
        this.router.navigate(['']);
        this.deleteLocalStorage();
        break;

      default:
        break;
    }
  }

  openUploadDialog() {
    this.router.navigate(['start-screen/add_video']);
    this.dialog.open(DialogUploadVideoComponent);
  }

  deleteLocalStorage() {
    if (!this.sharedService.rememberMeActiv) {
      localStorage.clear();
    }
  }
}

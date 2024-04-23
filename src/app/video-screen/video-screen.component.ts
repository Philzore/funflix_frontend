import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../service/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogVideoDescriptionComponent } from '../dialog-video-description/dialog-video-description.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-video-screen',
  templateUrl: './video-screen.component.html',
  styleUrl: './video-screen.component.scss'
})
export class VideoScreenComponent implements OnInit {
  singleVideoSource = '';
  currentVideoTitle = '';
  currentVideoResolution = '';
  showTooltip = false ;
  deleteInProgress = false ;
  loadVideoInProgress = false ;
  durationInSeconds = 5;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private backendService: BackendService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentVideoTitle = params.get('title');
      this.currentVideoResolution = params.get('resolution');
      this.loadVideo(this.currentVideoTitle, this.currentVideoResolution);
    });
    if (this.sharedService.currentUser === this.sharedService.currentVideoAuthor) {
      this.showTooltip = false ;
    } else {
      this.showTooltip = true ;
    }
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

  /**
   * load video with given title and resolution
   * 
   * @param title of video
   * @param resolution of video 480p/720p/1080p
   */
  async loadVideo(title:string, resolution:string, attempt:number = 0) {
    if (attempt >= 3) {
      this.openSnackBar('Maximum attempts reached. Video could not be loaded.');
      this.loadVideoInProgress = false;
      return;
    }

    this.singleVideoSource = '';
    this.loadVideoInProgress = true ;

    try {
      let resp: Blob = await this.backendService.getVideo(title, resolution);
      const videoBlob = new Blob([resp], { type: 'video/mp4' });
      this.singleVideoSource = URL.createObjectURL(videoBlob);
      let blobSize = resp.size;
      console.log('blob size:', blobSize/(1024*1024));
    } catch (error) {
      this.openSnackBar('Error loading video')
    }
    this.loadVideoInProgress = false ;
  }

  /**
   * change resolution in url
   * 
   * @param resolution of video 480p/720p/1080p
   */
  switchVideoResolution(resolution: string) {
    this.router.navigateByUrl(`/show_video/${this.currentVideoTitle}/${resolution}`);
  }

  /**
   * open dialog to see the video description
   * 
   */
  openVideoDescription() {
    let descEditable = !this.showTooltip ;
    this.router.navigateByUrl(`/show_video/${this.currentVideoTitle}/${this.currentVideoResolution}/description`);
    this.dialog.open(DialogVideoDescriptionComponent, {data: {title : this.currentVideoTitle, resolution: this.currentVideoResolution, editable: descEditable} });
  }

  /**
   * delete current active video
   * 
   */
  async deletVideo() {
    this.deleteInProgress = true ;
    try {
      let resp = await this.backendService.deleteVideo(this.currentVideoTitle, this.currentVideoResolution);
      if (resp['success'] = true) {
        this.openSnackBar('Delete complete :)');
        this.router.navigateByUrl(`/start-screen`);
      }
    } catch (error) {
      this.openSnackBar('Error delete Video');
    }
    this.deleteInProgress = false ;
  }
}

import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ImageObject } from '../models/imageObject.class';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../service/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogVideoDescriptionComponent } from '../dialog-video-description/dialog-video-description.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';

@Component({
  selector: 'app-video-screen',
  templateUrl: './video-screen.component.html',
  styleUrl: './video-screen.component.scss'
})
export class VideoScreenComponent implements OnInit {
  singleVideoSource = '';
  currentVideoTitle = '';
  currentVideoResolution = '';

  durationInSeconds = 5;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private backendService: BackendService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentVideoTitle = params.get('title');
      this.currentVideoResolution = params.get('resolution');
      console.log('Title:', this.currentVideoTitle);
      console.log('Auflösung:', this.currentVideoResolution);
      this.loadVideo(this.currentVideoTitle, this.currentVideoResolution);
    });

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
  async loadVideo(title:string, resolution:string) {
    this.singleVideoSource = '';
    try {
      let resp: Blob = await this.backendService.getVideo(title, resolution);
      const videoBlob = new Blob([resp], { type: 'video/mp4' });
      this.singleVideoSource = URL.createObjectURL(videoBlob);
      console.log('Blob URL:', this.singleVideoSource);
    } catch (error) {
      console.error('Error loading video:', error);
    }
  }

  onVideoLoaded() {
    
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
    this.router.navigateByUrl(`/show_video/${this.currentVideoTitle}/${this.currentVideoResolution}/description`);
    this.dialog.open(DialogVideoDescriptionComponent, {data: {title : this.currentVideoTitle, resolution: this.currentVideoResolution} });
  }

  /**
   * delete current active video
   * 
   */
  async deletVideo() {
    console.log(this.currentVideoResolution);
    try {
      let resp = await this.backendService.deleteVideo(this.currentVideoTitle, this.currentVideoResolution);
      console.log(resp);
      if (resp['success'] = true) {
        this.openSnackBar('Delete complete :)');
        this.router.navigateByUrl(`/start-screen`);
      }
    } catch (error) {
      this.openSnackBar('Error delete Video');
      console.error('Error delete video:', error);
    }
  }
}

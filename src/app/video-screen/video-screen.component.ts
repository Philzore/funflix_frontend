import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../service/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogVideoDescriptionComponent } from '../dialog-video-description/dialog-video-description.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';
import { SharedService } from '../service/shared.service';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
@Component({
  selector: 'app-video-screen',
  templateUrl: './video-screen.component.html',
  styleUrl: './video-screen.component.scss'
})
export class VideoScreenComponent implements OnInit, AfterViewInit {
  @ViewChild('media') media: ElementRef;
  options: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    sources: {
      src: string,
      type: string,
    }[],
  } = {
      fluid: true,
      aspectRatio: '16:9',
      autoplay: false,
      sources: [],
    };

  singleVideoSource = '';
  currentVideoTitle = '';
  currentVideoResolution = '';
  showTooltip = false;
  deleteInProgress = false;
  loadVideoInProgress = false;
  durationInSeconds = 5;

  player: Player;
  playerReady = false;

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
      this.showTooltip = false;
    } else {
      this.showTooltip = true;
    }
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
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
  async loadVideo(title: string, resolution: string, attempt: number = 0) {
    if (attempt >= 5) {
      this.openSnackBar('Maximum attempts reached. Video could not be loaded.');
      this.loadVideoInProgress = false;
      return;
    }
    this.singleVideoSource = '';
    this.loadVideoInProgress = true;
    try {
      let resp = await this.backendService.getVideo(title, resolution);
      this.singleVideoSource = `https://funflix.philippmoessl.de/media/videos/${resp['path']}`;
      this.loadVideoInProgress = false;
    } catch (error) {
      this.loadVideoInProgress = true;
      if (attempt <= 5) {
        setTimeout(() => {
          this.loadVideo(title, resolution, attempt + 1);
        }, 5000);
      }
    }
    setTimeout(() => {
      this.instanceVideoPlayer();
    }, 2000);

  }

  /**
   * create a instance of video player with video js
   * 
   */
  instanceVideoPlayer() {
    this.player = videojs(this.media.nativeElement, this.options, () => { 
      this.playerReady = true;
    });
    this.player.src({ src: this.singleVideoSource, type: "application/x-mpegURL" });
    this.player.load();

  }


  /**
   * change resolution in url
   * 
   * @param resolution of video 480p/720p/1080p
   */
  switchVideoResolution(resolution: string) {
    this.loadVideoInProgress = true ;
    this.router.navigateByUrl(`/show_video/${this.currentVideoTitle}/${resolution}`);
    setTimeout(() => {
      this.loadVideoInProgress = false ;
    }, 1000);
  }

  /**
   * open dialog to see the video description
   * 
   */
  openVideoDescription() {
    let descEditable = !this.showTooltip;
    this.router.navigateByUrl(`/show_video/${this.currentVideoTitle}/${this.currentVideoResolution}/description`);
    this.dialog.open(DialogVideoDescriptionComponent, { data: { title: this.currentVideoTitle, resolution: this.currentVideoResolution, editable: descEditable } });
  }

  /**
   * delete current active video
   * 
   */
  async deletVideo() {
    this.deleteInProgress = true;
    try {
      let resp = await this.backendService.deleteVideo(this.currentVideoTitle, this.currentVideoResolution);
      if (resp['success'] = true) {
        this.openSnackBar('Delete complete :)');
        this.router.navigateByUrl(`/start-screen`);
      }
    } catch (error) {
      this.openSnackBar('Error delete Video');
    }
    this.deleteInProgress = false;
  }
}

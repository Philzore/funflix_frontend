import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogUploadVideoComponent } from '../dialog-upload-video/dialog-upload-video.component';
import { SharedService } from '../service/shared.service';
import { BackendService } from '../service/backend.service';
import { User } from '../models/user.class';
import { Video } from '../models/video.class';
import { Thumbnail } from '../models/thumbnail.class';
import { ImageObject } from '../models/imageObject.class';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit, AfterViewInit {

  videoListActive = true;

  users = [];
  
  sliderReady = false;

  isDragging: boolean;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false
  }


  constructor(
    private router: Router,
    private dialog: MatDialog,
    public sharedService: SharedService,
    private backendService: BackendService,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.sharedService.currentUser = localStorage.getItem('user');
    }

  }

  ngAfterViewInit(): void {
    this.getUsersFromBackend();
    this.getThumbnailsAndVideosFromBackend();
    this.sliderReady = true;
  }

  /**
   * load users from backend
   * 
   */
  async getUsersFromBackend() {
    try {
      let resp: any = await this.backendService.getUsers();
      for (let index = 0; index < resp.length; index++) {
        const userName = resp[index].username;
        let newUser = new User();
        newUser.username = userName;
        this.users.push(newUser);
      }
      console.log(this.users);
    } catch (error) {

    }
  }

  /**
   * get thumbnails and videos from backend and add to right user
   * 
   */
  async getThumbnailsAndVideosFromBackend() {
    try {
      let resp: any = await this.backendService.getThumbnailsAndVideos();
      for (const videoInfo of resp) {
        for (const user of this.users) {
          if (user.username === videoInfo.author) {
            const video = new Video({
              id: videoInfo.video_id,
              title: videoInfo.video_title,
              description: videoInfo.video_description,
              url: videoInfo.video_filename,
              thumbnail: new Thumbnail({ videoId: videoInfo.video_id, url: videoInfo.thumbnail_filename }),
            });
            user.addVideo(video);
          }
        }
      }
    } catch (error) {

    }
  }

  /**
   * open dialog to upload new video
   * 
   */
  openUploadDialog() {
    this.router.navigate(['start-screen/add_video']);
    this.dialog.open(DialogUploadVideoComponent);
  }

}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogUploadVideoComponent } from '../dialog-upload-video/dialog-upload-video.component';
import { SharedService } from '../service/shared.service';
import { BackendService } from '../service/backend.service';
import { User } from '../models/user.class';
import { Video } from '../models/video.class';
import { Thumbnail } from '../models/thumbnail.class';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit, AfterViewInit {

  loadData = false;
  usersContentCache = [];

  sliderReady = false;

  isDragging: boolean;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: false,
    responsive: {
      0: {
        items: Math.max(1)
      },
      400: {
        items: Math.max(2)
      },
      740: {
        items: Math.max(3)
      },
      940: {
        items: Math.max(3)
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

  async ngOnInit() {
    console.log('Init start screen');
    // this.sharedService.userContent = [];
    this.usersContentCache = [];
    if (localStorage.getItem('user')) {
      this.sharedService.currentUser = localStorage.getItem('user');
    }
    this.sharedService.loadContentFromLocalStorage();
    await this.getUsersFromBackend();
    await this.getThumbnailsAndVideosFromBackend();
    this.checkCache();
    this.loadData = true;
  }

  ngAfterViewInit(): void {
    console.log('sharedService content:', this.sharedService.userContent);
    console.log('cache content:', this.usersContentCache);
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
        //this.sharedService.userContent.push(newUser);
        this.usersContentCache.push(newUser);
      }
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
        for (const user of this.usersContentCache) {
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

  /**
   * save the author of the clicked video
   * 
   * @param author of the current video
   */
  saveVideoAuthor(author) {
    this.sharedService.currentVideoAuthor = author;
  }

  checkCache() {
    if (this.sharedService.userContent.length === 0) {
      this.sharedService.userContent = this.usersContentCache;
      this.sharedService.saveContentInLocalStorage();
    }

    for (let i = 0; i < this.sharedService.userContent.length; i++) {
      let user = this.sharedService.userContent[i];
      let refUser = this.usersContentCache[i];

      if ((user.imageObject.length < refUser.imageObject.length) || (user.imageObject.length == refUser.imageObject.length) || (refUser.imageObject.length < user.imageObject.length)) {
        this.sharedService.userContent = this.usersContentCache;
        this.sharedService.saveContentInLocalStorage();
      } else {
        
      }
    }

  }


}

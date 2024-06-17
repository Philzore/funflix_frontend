import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
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
  syncExist = false;
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
      this.usersContentCache = this.sharedService.sortUser(this.usersContentCache);
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

  /**
   * check if there is a different between data from backend and data in local storage
   * if there are different and the local stored content don´t include a sync img then 
   * the local data get an update from backend
   * 
   */
  checkCache() {
    //shared service == current content in local storage
    //cache content == current content from backend
    if (this.sharedService.userContent.length === 0) {
      this.sharedService.userContent = this.usersContentCache;
      this.sharedService.saveContentInLocalStorage();
    }
    
    for (let i = 0; i < this.sharedService.userContent.length; i++) {
      let user = this.sharedService.userContent[i]; //content in local storage
      let refUser = this.usersContentCache[i]; //content from backend

      if (this.checkForSyncImg(user)) {
        if (!(user.imageObject.length === refUser.imageObject.length)) {
          this.syncExist = true;
          break;
        }
      }

    }

    if (!this.syncExist) {
      this.sharedService.userContent = this.usersContentCache;
      let sortedUser = this.sharedService.sortUser(this.sharedService.userContent);
      this.sharedService.saveContentInLocalStorage();
    }
  }

  /**
   * check if there is an sync img 
   * 
   * @param user to check the imageObject for sync img
   * @returns true or false if a sync img exist
   */
  checkForSyncImg(user) {
    for (let index = 0; index < user.imageObject.length; index++) {
      const imageObj = user.imageObject[index];
      if (imageObj.posterImage === '/assets/img/sync.png') {
        return true;
      }

    }
    return false;
  }

}

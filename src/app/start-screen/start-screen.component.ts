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
import { CommonModule } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit, AfterViewInit {

  headerLinks = ['Upload', 'Video List', 'Logout'];
  activeLink = this.headerLinks[0];
  background: ThemePalette = undefined;

  videoListActive = true;

  users = [];
  singleVideoSource = '';

  sliderReady = false;

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
    nav: true
  }
  //   {
  //   video: 'https://youtu.be/tYa6OLQHrEc',
  //   title: 'Youtube example one with title.',
  //   alt: 'youtube video'
  // }, {
  //   video: 'https://youtu.be/6pxRHBw-k8M',
  //   alt: 'youtube video'
  // }, {
  //   video: 'https://sanjayv.github.io/ng-image-slider/contents/assets/video/movie2.mp4',
  //   posterImage: "https://slotuniverses.co.uk/wp-content/uploads/sites/12030/upload_fed1091b34dcf8203c0729c4faa62315.png",
  //   title: 'Youtube example one with title.'
  // }];

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

  async getThumbnailsAndVideosFromBackend() {
    try {
      let resp: any = await this.backendService.getThumbnailsAndVideos();
      for (const videoInfo of resp) {
        for (const user of this.users) {
          if (user.username === videoInfo.author) {
            console.log('Drin');
            const video = new Video({
              id: videoInfo.video_id,
              title: videoInfo.video_title,
              description: videoInfo.video_description,
              url: videoInfo.video_filename,
              thumbnail: new Thumbnail({ videoId: videoInfo.video_id, url: videoInfo.thumbnail_filename }),
            });
            user.addVideo(video);
            console.log('nachher', user);
            // this.fillImageSlider(user);
          }
        }
      }
    } catch (error) {

    }
  }

  // fillImageSlider(user:User){
  //   for (let videoDetail of user.videos) {
  //     const videoURL = `http://127.0.0.1:8000/media/`+ videoDetail.url ;
  //     const thumbnailURL = `http://127.0.0.1:8000/media/`+ videoDetail.thumbnail.url ;
  //     const videoTitle = videoDetail.title ;
  //     let newImageObject = new ImageObject();
  //     newImageObject.video = videoURL;
  //     newImageObject.posterImage = thumbnailURL;
  //     newImageObject.title = videoTitle;
  //     user.
  //     // this.imageObject.push({video: videoURL, posterImage: thumbnailURL, title: videoTitle});
  //     console.log(this.imageObject);
  //   }
  // }

  showSingleVideo(imageObject: ImageObject) {
    this.router.navigateByUrl('/start-screen/show_video/tiger/720');
    this.videoListActive = false;
    console.log('heyho');
    console.log(imageObject);
    this.singleVideoSource = imageObject.video;
  }

  openLink() {
    switch (this.activeLink) {
      case 'Upload':
        this.openUploadDialog();

        break;

      case 'Video List':
        this.videoListActive = true;

        break;

      case 'Logout':
        this.router.navigate(['']);
        this.deleteLocalStorage();
        break;

      default:
        break;
    }
  }

  deleteLocalStorage() {
    if (!this.sharedService.rememberMeActiv) {
      localStorage.clear();
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

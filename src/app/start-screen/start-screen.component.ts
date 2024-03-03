import { Component, EventEmitter, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogUploadVideoComponent } from '../dialog-upload-video/dialog-upload-video.component';
import { SharedService } from '../service/shared.service';
import { BackendService } from '../service/backend.service';
import { User } from '../models/user.class';
import { Video } from '../models/video.class';
import { Thumbnail } from '../models/thumbnail.class';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  headerLinks = ['Upload', 'Video List', 'Logout'];
  activeLink = this.headerLinks[0];
  background: ThemePalette = undefined;

  videoListActive = true;

  users = [];


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
    private backendService: BackendService,
  ) { }

  ngOnInit() {
    this.getUsersFromBackend();
    this.getThumbnailsAndVideosFromBackend();
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
              thumbnail : new Thumbnail({videoId :videoInfo.video_id, url : videoInfo.thumbnail_filename}),
            });
            user.addVideo(video);
            console.log('nachher' ,user);
          }
        }
      }
    } catch (error) {

    }
  }

  openLink() {
    switch (this.activeLink) {
      case 'Upload':
        this.openUploadDialog();

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

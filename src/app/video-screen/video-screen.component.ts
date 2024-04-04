import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ImageObject } from '../models/imageObject.class';

@Component({
  selector: 'app-video-screen',
  templateUrl: './video-screen.component.html',
  styleUrl: './video-screen.component.scss'
})
export class VideoScreenComponent {
  singleVideoSource = '';


  constructor(){}


  showSingleVideo(imageObject: ImageObject) {
    // if (!this.isDragging) {
    //   this.router.navigateByUrl('/start-screen/show_video/tiger/720');
    //   this.videoListActive = false;

    //   console.log(imageObject);
    //   this.singleVideoSource = imageObject.video;
    // }

  }

  switchVideoResolution(){}
}

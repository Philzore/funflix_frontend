import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ImageObject } from '../models/imageObject.class';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../service/backend.service';

@Component({
  selector: 'app-video-screen',
  templateUrl: './video-screen.component.html',
  styleUrl: './video-screen.component.scss'
})
export class VideoScreenComponent implements OnInit {
  singleVideoSource = '';


  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');
      const resolution = params.get('resolution');
      console.log('Title:', title);
      console.log('Auflösung:', resolution);
      this.loadVideo(title, resolution);
    });

  }


  async loadVideo(title, resolution) {
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
    console.log('loaded');
  }

  switchVideoResolution() { }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../service/backend.service';

@Component({
  selector: 'app-dialog-video-description',
  templateUrl: './dialog-video-description.component.html',
  styleUrl: './dialog-video-description.component.scss'
})
export class DialogVideoDescriptionComponent implements OnInit {

  editMode = false ;
  descriptionText = '' ;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogVideoDescriptionComponent>,
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
      this.loadDescription();
  }


  async loadDescription() {
    console.log(this.data.title);
    let resp = await this.backendService.getVideoDescription(this.data.title, this.data.resolution);

    if (resp['success'] == true) {
      this.descriptionText = resp['description'];
    } else if(resp['success'] == false) {
      this.descriptionText = 'Something went wrong :('
    }
  }

  async updateDescription() {
    let resp = await this.backendService.updateVideoDescription(this.data.title, this.data.resolution, this.descriptionText);

    console.log(resp);
    if (resp['success'] == true) {
      this.editMode = false ;
      resp['description'] = this.descriptionText ;
    }
  }
}

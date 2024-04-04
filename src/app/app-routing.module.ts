import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { ImprintComponent } from './imprint/imprint.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { DialogUploadVideoComponent } from './dialog-upload-video/dialog-upload-video.component';
import { ActivateScreenComponent } from './activate-screen/activate-screen.component';
import { VideoScreenComponent } from './video-screen/video-screen.component';




const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'start-screen', component: StartScreenComponent, children:[
      { path: 'add_video', component: DialogUploadVideoComponent },
    ]
  },
  { path: 'show_video/:title/:resolution', component: VideoScreenComponent},
  { path: 'imprint', component: ImprintComponent },
  { path: 'data-protection', component: DataProtectionComponent },
  { path: 'activate/:uidb64/:token', component: ActivateScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

//angular material imports
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from './message-snackbar/message-snackbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import { NgImageSliderModule } from 'ng-image-slider';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpInterceptorService } from './service/http-interceptor.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogUploadVideoComponent } from './dialog-upload-video/dialog-upload-video.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessageSnackbarComponent,
    StartScreenComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTabsModule,
    NgImageSliderModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

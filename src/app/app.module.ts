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

import {MatDialogModule} from '@angular/material/dialog';
import { HttpInterceptorService } from './service/http-interceptor.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { VideoScreenComponent } from './video-screen/video-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessageSnackbarComponent,
    StartScreenComponent,
    FooterComponent,
    HeaderComponent,
    VideoScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatProgressSpinnerModule,
    
    CarouselModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

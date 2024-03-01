import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/user.class';
import { Video } from '../models/video.class';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseUrl + "/login/";
    const body = {
      "username": username,
      "password": password
    };

    return lastValueFrom(this.http.post(url, body));
  }

  loginAsGuest() {
    const url = environment.baseUrl + "/guest/";
    const body = {
      
    };

    return lastValueFrom(this.http.post(url, body));
  }


  registerNewUser(user:User) {
    const url = environment.baseUrl + "/register/";
    const body = user;
    return lastValueFrom(this.http.post(url, body));
  }

  activateAccount(uid:string, token:string) {
    const url = environment.baseUrl + `/activate/${uid}/${token}/`;
  
    return lastValueFrom(this.http.get(url));
  }

  addVideo(video:Video){
    const url = environment.baseUrl + `/start-screen/add_video/`;
    const body = video;
    return lastValueFrom(this.http.post(url,body));
  }
}
